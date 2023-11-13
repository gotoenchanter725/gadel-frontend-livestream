import {
    LiveTvRounded as LiveTvRoundedIcon,
    FavoriteRounded as FavoriteRoundedIcon,
    FavoriteBorder as FavoriteBorderIcon,
    CommentRounded as CommentRoundedIcon,
    PeopleRounded as PeopleRoundedIcon,
} from '@mui/icons-material';
import shareImage from "src/assets/images/icon/share.png"
import "./index.scss";
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Comment, CommentPreview } from "./../Comment";
import GiftSendIcon from "./../../assets/images/gift-send.png";
import GiftSend from '../GiftSend/GiftSend';
import audioImage from "src/assets/images/icon/audio.png"

// const style = {
//     position: 'absolute',
//     top: '10%',
//     left: '10%',
//     // transform: 'translate(-20%, -20%)',
//     width: "80%",
//     height:"80%",
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

export default function PostComponent(props = { comments: []}) {
    const [isModalOpen, setModalOpen] = useState( {open: false, zoom: false, comment: false, giftsend: false} )
    const [modalImage, setModalImage] = useState("");
    const [imageMetaData, setImageMetaData] = useState({width: 0, height: 0});
    const [gifts, setGifts] = useState({
        user: [],
        post: []
    });
    let selectedPost = -1;

    const handleModalClose = () => setModalOpen( {open: false} )
    const handleImageClick = (src) => {
        setModalImage(src)
        setModalOpen( { open: true, zoom: true} )
    }
    const handleGiftSendIconClicked = async () => {
        selectedPost = 
        props.getGifts(props.postId).then((res) => {
            setGifts( { ...res } );
            setModalOpen({
                open: true,
                giftsend: true
            });
        })
    }

    const handleSendGift = ( giftID ) => {
        props.sendGift( giftID ).then(response => {
            handleGiftSendIconClicked();
        }).catch(err => {
            alert( err.response.data.message );
        });
    }

    const navigate = useNavigate()

    useEffect(() => {
      const image = new Image()
      image.onload = () => {
        setImageMetaData({width: image.naturalWidth, height: image.naturalHeight});
      }
      image.src = props.img;
    }, [props.img]);
    
    return (
        <>
            <div key={props.postId} className='post-wrap shadow-lg w-full xl:w-[49%] mb-4'>
                <div className='post-row w-full'>
                    <div className='post-info flex w-full'>
                        <div className='header-icon-container !ml-0 !p-0'>
                            <img src={props.posterImg} className="user-image" onClick={() =>{return navigate(`/profile/${props.userId}`)}} />
                        </div>
                        <div className='grow'>
                            <div className='posted-by' >
                                <span onClick={() =>{return navigate(`/profile/${props.userId}`)}}>{props.postedBy}</span> 
                            </div>
                            <div className='posted-location-text'>
                                {props.location}
                            </div>
                            <div  className='posted-by mt-2'>{props.title}</div>
                        </div>
                        <div className='relative'>
                            <img src={GiftSendIcon} className={"w-[35px] cursor-pointer"} onClick={handleGiftSendIconClicked} />
                            {props.gifts.length ? (<div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full -top-2 -left-2 dark:border-gray-900">
                                {props.gifts.length}
                            </div>):<></>}
                        </div>
                    </div>
                    {props.isLive && (
                        <div className='live-container'>
                            <LiveTvRoundedIcon className='live-icon' />
                            <div className='live-text'>
                                Live
                            </div>
                        </div>
                    )}
                </div>
                {(props.type == 'PHOTO')?(
                    <img src={props.img} className='post-img aspect-[5/5] sm:aspect-[5/5]' onClick={() => handleImageClick(props.img)} />
                ):props.type == 'AUDIO' ? (
                    <div className='grow relative p-3'>
                        <div className='flex items-center justify-around w-full h-full absolute left-0 top-0 bg-[#dddada] rounded-md'>
                            <img className='w-[100px]' src={audioImage} alt='post image' />
                        </div>
                        <video width="100%" height="100%" controls className="aspect-[5/5] sm:aspect-[5/5] object-fill post-img">
                            <source src={props.img} type="video/ogg"/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ) : (
                    <video width="100%" height="100%" controls className="aspect-[5/5] sm:aspect-[5/5] object-fill post-img">
                        <source src={props.img} type="video/mp4"/>
                        <source src={props.img} type="video/ogg"/>
                        Your browser does not support the video tag.
                    </video>
                )}
                {!!!props.comments.length && (
                    <div className={`post-row p-2 ${0&&'border-[#ffd7d7] border-[1px]'} rounded-lg mt-1 min-h-[30px] `}>
                        <span className='word-wrap max-h-[50px] overflow-x-hidden overflow-y-auto scrollbar-w-[5px] scrollbar-thin scroll-smooth scrollbar-thumb-slate-700 pr-2'>{props.description}</span>
                    </div>
                )}
                <div className='post-footer'>
                    <div className='post-bottom-info'>
                        {props.isFavorite ? (
                            <FavoriteRoundedIcon
                                className='post-footer-icon'
                                onClick={() => props.handleLikePost()}
                            />
                        ) : (
                            <FavoriteBorderIcon
                                className='post-footer-icon'
                                onClick={() => props.handleLikePost()}
                            />
                        )}
                        <div className='post-footer-text !ml-2'>{props.numberOfLikes}</div>
                    </div>
                    <div className='post-bottom-info ml-6'>
                        <CommentRoundedIcon className='post-footer-icon' onClick={() => setModalOpen({open: true, comment: true})} />
                        <div className='post-footer-text !ml-2'>{props.numberOfComments}</div>
                    </div>
                    <div className='post-bottom-info ml-6'>
                        <PeopleRoundedIcon className='post-footer-icon' />
                        <div className='post-footer-text !ml-2'>{props.numberOfViews}</div>
                    </div>
                    <div className='post-bottom-info ml-6'>
                        <img src={shareImage} className='post-footer-icon' />
                        <div className='post-footer-text !ml-2'>{props.numberOfViews}</div>
                    </div>
                </div>
                {props.comments.length > 0 ? (
                    <CommentPreview comment={props.comments[props.comments.length - 1]}/>
                ) : ''}
                
            </div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={isModalOpen.open}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropProps={{
                    timeout: 500,
                }}
                className={"flex flex-wrap justify-between content-around"}
            >
                <div className={`${isModalOpen.comment?"w-[90%] h-[70%] lg:w-[50%] lg:aspect-[5/3]":isModalOpen.giftsend?"w-[400px] h-[200px]":((imageMetaData.width > imageMetaData.height)?"w-[80%]":"h-[80%]")} bg-white shadow-lg rounded-md outline-none border-none`}>
                    { isModalOpen.zoom && <img src={modalImage} alt="" className={'w-full h-full max-h-[90vh]'} />}
                    { isModalOpen.comment && <Comment className="w-full h-full" onRemove={(id) => {props.handleRemoveComment(id)}} onSave={(comment) => {
                        props.handleSaveComment(comment)
                    }} comments={props.comments} /> }
                    { isModalOpen.giftsend && <GiftSend className="w-full h-full"
                        senderGifts={gifts.user}
                        postGifts={gifts.post}
                        title
                        onSend={handleSendGift}
                    />}
                </div>
            </Modal>
        </>
    )
}