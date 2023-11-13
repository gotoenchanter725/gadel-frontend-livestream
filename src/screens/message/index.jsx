import User, { STATUS_ACTIVE, STATUS_DEACTIVE } from 'src/components/Message/User';
import Message, { MESSAGE_IN, MESSAGE_OUT, MESSAGE_READED, MESSAGE_UNREAD } from 'src/components/Message/Message';
import React, { useEffect, useState, useRef, useContext } from 'react';
import {
  Header, Footer, Sidebar
} from 'src/components';
import { Snackbar } from '@mui/material';
import {
    FileCopy as FileCopyIcon,
    CloseRounded as CloseIcon
} from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import { useStateValue } from 'src/services/state/State';
import { useNavigate, useParams } from 'react-router-dom';
import { getContact, getMessage, GET_CONTACT_SUCCESS, sendMessage } from 'src/actions/messageActions';
import { settings } from 'src/services/Settings';
import moment from 'moment';
import { StateContext } from 'src/App';
import axios from './../../utils/axios';

const MessageScreen = ( {   } ) => {
    const navigate = useNavigate();
    const [openError, setOpenError] = useState(false);
    const [errorText, setErrorString] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [state, dispatch] = useStateValue();
    const [loadingText, setLoadingText] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [message, setMessage] = useState('');
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const cstate = useContext(StateContext);
    const [isSending, setSending] = useState( false );
    const [sendPercent, setSendingPercent] = useState( 0 );

    const scrollToBottom = () => {
        const element = document.getElementById("message-container")
        element.scrollTo({
            top: 99999999999,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        if( selectedUser && selectedUser.length == 24 ) {
            window.location.hash = selectedUser;
            setLoading( true );
            const seid = selectedUser;
            getMessage({
                userid: selectedUser
            }).then((response) => {
                const messageIndex = cstate.messages.findIndex((item) => item.userid == seid);
                if( messageIndex < 0 ) {
                    cstate.messages.push({
                        _id: seid,
                        messages: response.payload.messages
                    });
                    cstate.setMessages([...cstate.messages]);
                }
                else {
                    let n = response.payload.messages.length;
                    for (let i = 0; i < n; i++) {
                        const element = response.payload.messages[i];
                        cstate.messages[messageIndex].messages.push(element);
                    }
                    cstate.setMessages([...cstate.messages]);
                }
                setLoading( false );
                setTimeout(() => {
                    scrollToBottom();
                }, 30) 
            }).catch(err => {
                setLoading( false );
            });
        }
    }, [selectedUser]);

    useEffect(() => {
        const messageIndex = cstate.messages.findIndex((item) => item._id == selectedUser);
        if( messageIndex >= 0 ) {
            setMessages( [...cstate.messages[messageIndex].messages] );
        }
        setTimeout(() => {
            scrollToBottom();
        }, 30) 
        
    }, [cstate.messages])

    useEffect(() => {
        const userid = window.location.hash.replace("#", '');
        if( userid && userid.length == 24) setSelectedUser(userid);
        setLoading( true );
        getContact().then((response) => {
            setLoading( false );
            if( response.type == GET_CONTACT_SUCCESS ) {
                cstate.contacts.splice(0, cstate.contacts.length);
                let n = response.payload.contacts.length;
                for (let i = 0; i < n; i++) {
                    const element = response.payload.contacts[i];
                    cstate.contacts.push(element);
                }
                cstate.setContacts( [...cstate.contacts] );
            }
        }).catch((err) => {
            setLoading( false );
        });
    }, []);

    const onClickSend = () => {
        if( selectedUser == null || selectedUser == '' || selectedUser.length != 24){
            alert("Please select user");
            return;
        } 
        
        setLoading( true );
        const socketIndex = cstate.online.findIndex(item => item.userid == selectedUser);
        let socketid = "";
        const selected = selectedUser;
        if( socketIndex >= 0 ) socketid = cstate.online[socketIndex].socketid;
        setSending( true );
        sendMessage(selectedUser, message, file, socketid, onMessageSendProgress).then((response) => {
            setSending( false );
            let messageIndex = cstate.messages.findIndex((item) => item._id == selected);
            if( messageIndex >= 0 ) {
                cstate.messages[messageIndex].messages.push(response.payload.message);
                cstate.setMessages( [...cstate.messages] );
            }
            else {
                cstate.messages[messageIndex].push(
                    {_id:selected, messages: [response.payload.message]}
                )
                cstate.setMessages( [...cstate.messages] );
            }
            setMessage("");
            setFile( null );
            setFileUrl( null );
            setLoading( false );
            setTimeout(() => {
                scrollToBottom();
            }, 30) 
        }).catch((err) => {
            setSending( false );
            setLoading(false);
        })
    }

    const onPaste = ( e ) => {
        const items = e.clipboardData.items;
        if( items.length == 0 ) return;
        const item = items[0];
        if( item.kind == 'file' ) {
            const blob = item.getAsFile();
            setFile(blob);
            const url = URL.createObjectURL(blob);
            setFileUrl( url );
        }
    }

    const onMessageSendProgress = ( e ) => {
        const percent = Math.round(e.loaded / e.total * 1E4) / 100;
        setSendingPercent( percent );
    }

    const downloadFile = ( path, nameAs ) => {
        axios.get(path, {
            responseType: 'blob'
        }).then((response) => {
            return response.data;
        }).then( ( response ) => {
            const element = document.createElement("a");
            const url = URL.createObjectURL( response );
            element.href = url;
            element.download = nameAs;
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }).catch( (err) => {
            console.log( err );
        })

        
    }

    const onMessageFileDownload = (id, name) => {
        downloadFile(`${settings.sourceUrl}/message/${id}`, name);
    }

    return (
        <div className="app-background" style={{ position: 'relative' }}>
            <Header type="home" />
            <div className='message main relative flex justify-around md:justify-start'>
                <Sidebar active="message" />
                <div className='w-[100%] sm:w-[90%] py-4 px-2 flex flex-wrap main-container'>
                    <div className='flex w-full space-x-2'>
                        <div className='flex flex-col min-w-[68px] pb-[1px] lg:min-w-[280px] space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-w-[2px]] scrollbar-thin scroll-smooth scrollbar-w-[3px] scrollbar-thumb-slate-400 scrollbar-thumb-rounded-lg'>
                            {cstate.contacts.map((item, index) => (
                                <User 
                                    img={`${settings.sourceUrl}/avatar/${item._id}`} 
                                    username={item.username} 
                                    className="w-[68px] lg:w-[280px] rounded-2xl bg-white shadow-lg hover:bg-[#efe8e8]"
                                    status={cstate.online.findIndex((u) => u.userid == item._id)>=0?STATUS_ACTIVE:STATUS_DEACTIVE}
                                    key={index}
                                    selected={selectedUser == item._id}
                                    onClick={() => {
                                        setSelectedUser(item._id);
                                    }}
                                    unread={item.unread}
                                ></User>
                            ))}
                        </div>
                        <div className='border-red-200 border-[0.5px] grow rounded-lg p-4 space-y-[20px]'>
                            <div className='max-h-[calc(100vh-238px)] space-y-3 overflow-y-auto scrollbar-thin scroll-smooth scrollbar-w-[3px] scrollbar-thumb-slate-400 scrollbar-thumb-rounded-lg pr-2' id='message-container'>
                                {messages.map((item, index) => {
                                    return (
                                        <Message
                                            img={`${settings.sourceUrl}/avatar/${item.from}`}
                                            type={item.from == state.user._id?MESSAGE_OUT:MESSAGE_IN} 
                                            date={moment(item.date).format(settings.time.format.full)}
                                            text={item.content}
                                            status={item.readed ? MESSAGE_READED : MESSAGE_UNREAD}
                                            key={index}
                                            file={`${settings.sourceUrl}/message/${item._id}`}
                                            fileName={item.oldName}
                                            fileType={item.fileType}
                                            onDownload={() => {onMessageFileDownload(item._id, item.oldName)}}
                                        />
                                    )
                                })}
                            </div>
                            <div className='flex w-full space-x-2'>
                                
                                {fileUrl && (
                                    <div className='justify-end text-blue-500 cursor-pointer border-[1px] max-h-[72px] max-w-[72px] border-red-200 rounded-lg relative' onClick={() => {setFile(null); setFileUrl(null)}}>
                                        {file.type.indexOf("image") > -1 ? (
                                            <img src={fileUrl} className={`rounded-lg h-[72px] w-[72px]`} alt="" />
                                        ): (
                                            <div className='flex flex-col h-full justify-center'>
                                                <FileCopyIcon />
                                            </div>
                                        )}
                                    </div>
                                )}
                                <textarea 
                                    className="border-blue-200 border-[0.5px] p-2 px-4 grow text-[18px] rounded-lg outline-none max-h-[72px] resize-none  overflow-y-auto scrollbar-w-[2px]] scrollbar-thin scroll-smooth scrollbar-w-[3px] scrollbar-thumb-slate-400 scrollbar-thumb-rounded-lg" 
                                    value={message}
                                    onChange={(e) => {
                                        setMessage(e.target.value);
                                    }}
                                    onKeyPress={(e) => {
                                        if( e.charCode == 13 ) {
                                            if( e.shiftKey == false ){
                                                e.preventDefault();
                                                onClickSend();
                                            } 
                                        }
                                    }}
                                    onPaste={onPaste}
                                />
                                <div className={`flex flex-col justify-center`} onClick={onClickSend}>
                                    <button className="bg-red-600 rounded-md h-[40px] py-[2px] px-5 text-white ml-2 hover:bg-red-400 active:bg-red-700" >
                                        {isSending?<span>{sendPercent}</span>:<SendIcon/>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <Snackbar
                open={openError}
                autoHideDuration={6000}
                onClose={() => setOpenError(false)}
                message={errorText}
            />
            <div className={'loading-spin '+(isLoading?'active':'')}>{loadingText}</div>
        </div>
    )
}

export default MessageScreen