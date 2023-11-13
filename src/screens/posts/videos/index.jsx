import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    Header, Footer, Sidebar
} from 'src/components';
import liveImage from "src/assets/images/icon/live.png"
import commentImage from "src/assets/images/icon/comment.png"
import viewersImage from "src/assets/images/icon/viewers.png"
import shareImage from "src/assets/images/icon/share.png"
import bgLivestream from "src/assets/images/bg-livestream.png"
import user from 'src/assets/images/image.png';
import { SubHeader } from 'src/components/SubHeader';
import { getAllPosts, likePost, POST_GET_SUCCESS, removeComment, saveComment } from 'src/actions/postActions';
import { settings } from 'src/services/Settings';
import moment from 'moment/moment';
import { useStateValue } from '../../../services/state/State';
import {
    LiveTvRounded as LiveTvRoundedIcon,
    FavoriteRounded as FavoriteRoundedIcon,
    FavoriteBorder as FavoriteBorderIcon,
    CommentRounded as CommentRoundedIcon,
    PeopleRounded as PeopleRoundedIcon,
} from '@mui/icons-material';
import GiftSend from 'src/components/GiftSend/GiftSend';
import { Comment } from 'src/components';
import { Modal } from '@mui/material';

function VideosScreen() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const { userid } = useParams();
    const [selected, setSelected] = useState(-1);
    const [state,] = useStateValue();
    const [isModalOpen, setModalOpen] = useState({ open: false, zoom: false, comment: false, giftsend: false })

    useEffect(() => {
        const loadAllPosts = async () => {
            setLoading(true)
            let response = await getAllPosts(userid, null, null, 'VIDEO')
            setLoading(false)
            if (response.type == POST_GET_SUCCESS) {
                const ndata = response.payload.data.map((item) => {
                    item.isFavorite = item.like.indexOf(state.user._id) < 0 ? false : true;
                    return item;
                })
                const posts = ndata;
                setPosts([...ndata]);
                if (posts.length) {
                    setSelected(0);
                }
                else {
                    setSelected(-1);
                }
            }
        }
        try {
            loadAllPosts()
        } catch (error) {
            setLoading(false)
        }

    }, []);

    const handleLikePost = async (index) => {
        const item = posts[index];
        item.isFavorite = !item.isFavorite;
        setLoading(true)
        likePost(item._id, item.isFavorite).then((response) => {
            item.like = response.likes
            posts[index] = item;
            setPosts([...posts]);
            setLoading(false)
        })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }

    const handleSaveComment = (idx, comment) => {
        setLoading(true)
        saveComment(posts[idx]._id, comment).then((response) => {
            posts[idx].comments = response.comments;
            setPosts([...posts]);
            setLoading(false)
        }).catch((err) => {
            setLoading(false);
        })
    }

    const handleRemoveComment = (idx, commentId) => {
        setLoading(true)
        removeComment(posts[idx]._id, commentId).then((response) => {
            posts[idx].comments = response.comments;
            setPosts([...posts]);
            setLoading(false)
        }).catch((err) => {
            setLoading(false);
        })
    }

    return (
        <div className="" style={{ position: 'relative' }}>
            <Header />
            <div className='home main relative flex flex-col py-4 px-2 md:px-6'>
                <SubHeader active='video' userid={userid} />
                <div className='flex flex-col md:flex-row justify-between px-3 md:px-0 w-full'>
                    <div className='w-full md:w-[75%] bg-white'>
                        {(posts.length > 0 && selected > -1) ? (
                            <div className="rounded-xl shadow-button py-6">
                                <div className='px-6 pb-3'>
                                    <div className="flex justify-between items-center pb-2">
                                        <div className="flex items-center">
                                            <div className="flex w-[50px] h-[50px] aspect-[1/1] rounded-full overflow-hidden border-2 border-solid border-secondary">
                                                <img src={`${settings.sourceUrl}/avatar/${userid}`} className='w-[50px] h-[50px]' alt='user' />
                                            </div>
                                            <div className='ml-2'>
                                                <h1 className="text-lg text-secondary-font ">{posts[selected].userId.username}</h1>
                                                <p className="text-secondary-font text-sm">{posts[selected].userId.country}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <img className="h-[24px] overflow-hidden rounded-2xl" src={liveImage} alt='live' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <video src={`${settings.baseUrl}/${posts[selected].file_path}`} controls className='rounded-md border-[1px] border-gray-300' />
                                        <div className='flex justify-between items-center mt-4'>
                                            <div className='flex flex-col'>
                                                <h1 className="text-md font-semibold text-[#383333] ">{posts[selected].title}</h1>
                                                <p className="text-[#727272] text-xs">{posts[selected].description}</p>
                                            </div>
                                        </div>
                                        <div className='flex justify-between flex-wrap mt-4'>
                                            <div className='flex'>
                                                <div className='flex flex-col items-center mr-5'>
                                                    <div className='flex items-center text-[red] cursor-pointer'>
                                                        {posts[selected].isFavorite ? (
                                                            <FavoriteRoundedIcon
                                                                className='post-footer-icon'
                                                                onClick={() => { handleLikePost(selected) }}
                                                            />
                                                        ) : (
                                                            <FavoriteBorderIcon
                                                                className='post-footer-icon'
                                                                onClick={() => { handleLikePost(selected) }}
                                                            />
                                                        )}
                                                        <span className='font-semibold text-sm md:text-md text-black ml-1 w-[25px]'>{posts[selected].like.length}</span>
                                                    </div>
                                                    <span className='font-semibold text-sm md:text-md text-[#383333]'>Like</span>
                                                </div>
                                                <div className='flex flex-col items-center mr-5'>
                                                    <div className='flex items-center text-[red]'>
                                                        <CommentRoundedIcon className='post-footer-icon cursor-pointer' onClick={() => setModalOpen({ open: true, comment: true })} />
                                                        <span className='font-semibold text-sm md:text-md text-black ml-1 w-[25px]'>{posts[selected].comments.length}</span>
                                                    </div>
                                                    <span className='font-semibold text-sm md:text-md text-[#383333]'>Comment</span>
                                                </div>
                                                <div className='flex flex-col items-center mr-5'>
                                                    <div className='flex items-center'>
                                                        <img className='w-[18px] md:w-[24px] mr-1.5' src={viewersImage} alt='viewers' />
                                                        <span className='font-semibold text-sm md:text-md text-black ml-1 w-[25px]'>0</span>
                                                    </div>
                                                    <span className='font-semibold text-sm md:text-md text-[#383333]'>Viewers</span>
                                                </div>
                                                {/* <div className='flex flex-col items-center mr-5'>
                                                    <div className='flex items-center'>
                                                        <img className='w-[18px] md:w-[24px] mr-1.5' src={shareImage} alt='share' />
                                                    </div>
                                                    <span className='font-semibold text-sm md:text-md text-[#383333]'>Share</span>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col px-6'>
                                    <div className=''>
                                        <h5 className='font-semibold text-sm text-[#383333]'>Commnet here</h5>
                                        <div className='max-h-[100px] overflow-y-auto scroll-sm'>
                                            { posts[selected].comments.map((comment, idx) => {
                                                return (
                                                    <div className='flex items-start mb-2' key={idx}>
                                                        <div className='bg-[#D108BD] mt-2 min-w-[24px] leading-[24px] min-h-[24px] text-center mr-2 rounded-full text-white text-sm'>A</div>
                                                        <div className='text-[#505050]'>
                                                            <span className='font-semibold text-xs'>{comment.sender}</span>
                                                            <p className='text-xs'>{comment.content}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ) : (
                            <div>No Video</div>
                        )}

                    </div>
                    <div className='flex flex-col min-w-[290px] w-full md:w-[25%] lg:min-w-[320px] md:ml-4 mt-2 md:mt-0'>
                        <div className='flex flex-col'>
                            {posts.map((post, index) => (
                                <div
                                    className={`flex justify-between mb-4 max-h-[120px] shadow-lg p-[10px] rounded-lg cursor-pointer hover:bg-red-100 ${index == selected && 'bg-red-100'}`}
                                    key={index}
                                    onClick={(e) => setSelected(index)}
                                >
                                    <div className='max-w-[200px] max-h-[100px]'>
                                        <video className='rounded-lg max-w-[100px] md:max-w-[150px] lg:max-w-[200px] max-h-[100px]' src={`${settings.baseUrl}/${post.file_path}`}></video>
                                    </div>
                                    <div className='flex flex-col justify-between ml-2 grow overflow-y-auto scroll-sm max-h-[100%]'>
                                        <h6 className='text-sm font-semibold text-[#444040]'>{post.title}</h6>
                                        <div className='flex flex-col'>
                                            <span className='text-[#A08E8E] text-xs'>{post.description}</span>
                                            <span className='text-[#A08E8E] text-xs'>{moment(post.date).format(settings.time.format.full)}</span>
                                        </div>
                                    </div>
                                </div>)
                            )}
                        </div>
                        <img className='w-full' src={bgLivestream} alt='bgLivestream' />
                    </div>
                </div>
            </div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={isModalOpen.open}
                onClose={() => setModalOpen( {open: false} )}
                closeAfterTransition
                BackdropProps={{
                    timeout: 500,
                }}
                className={"flex flex-wrap justify-between content-around"}
            >
                <div className={`${isModalOpen.comment ? "w-[90%] h-[70%] lg:w-[50%] lg:aspect-[5/3]" : isModalOpen.giftsend ? "w-[400px] h-[200px]" : ("h-[80%]")} bg-white shadow-lg rounded-md outline-none border-none`}>
                    {isModalOpen.comment && (
                        <Comment 
                            className="w-full h-full" 
                            onRemove={(id) => { handleRemoveComment(selected, id) }} 
                            onSave={(comment) => {
                                handleSaveComment(selected, comment)
                            }}
                            comments={posts[selected].comments}
                        />
                    )}
                    {/* {isModalOpen.giftsend && <GiftSend className="w-full h-full"
                        senderGifts={gifts.user}
                        postGifts={gifts.post}
                        title
                        onSend={handleSendGift}
                    />} */}
                </div>
            </Modal>
            <Footer />
        </div>
    );
}

export default VideosScreen;
