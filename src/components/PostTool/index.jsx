import { useState, useEffect } from "react";
import {
    FavoriteRounded as FavoriteRoundedIcon,
    FavoriteBorder as FavoriteBorderIcon,
    CommentRounded as CommentRoundedIcon,
} from '@mui/icons-material';
import Modal from '@mui/material/Modal';

import { likePost } from "src/actions/postActions";
import { saveComment, removeComment } from '../../actions/postActions';
import { Comment as CommentComponent } from "./../Comment";

const Like = ({ userid, postid, likes = [] }) => {

    const [isLike, setLike] = useState(false);
    const [data, setData] = useState(likes);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLike(!!!(data.indexOf(userid) < 0));
    }, [data]);

    const handleLikePost = (status) => {
        likePost(postid, status).then((response) => {
            setData([...response.likes])
        }).catch(error => {
            console.log(error)
            setLoading(false)
        })
    }

    return (
        <>
            {isLike ? (
                <FavoriteRoundedIcon
                    className='post-footer-icon text-[red] cursor-pointer'
                    onClick={() => handleLikePost(false)}
                />
            ) : (
                <FavoriteBorderIcon
                    className='post-footer-icon text-[red] cursor-pointer'
                    onClick={() => handleLikePost(true)}
                />
            )}
            <span className="w-[25px] ml-1">{data.length}</span>
        </>

    )
}

const Comment = ({ userid, postid, comments = [] }) => {

    const [data, setData] = useState(comments);
    const [isLoading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState( false );

    const handleSaveComment = (comment) => {
        setLoading(true)
        saveComment(postid, comment).then((response) => {
            setData([...response.comments]);
            setLoading(false)
        }).catch((err) => {
            setLoading(false);
        })
    }

    const handleRemoveComment = (commentId) => {
        setLoading(true)
        removeComment(postid, commentId).then((response) => {
            setData([...response.comments]);
            setLoading(false)
        }).catch((err) => {
            setLoading(false);
        })
    }

    return (
        <>
            <CommentRoundedIcon 
                className='post-footer-icon text-[red] cursor-pointer' 
                onClick={ () => {
                        setModalOpen(true)
                    }
                }
            />
            <span className="w-[25px] ml-1">{data.length}</span>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={modalOpen}
                onClose={() => setModalOpen( false )}
                closeAfterTransition
                BackdropProps={{
                    timeout: 500,
                }}
                className={"flex flex-wrap justify-between content-around"}
            >
                <div className={`w-[90%] lg:w-[50%] lg:aspect-[5/3] h-[80%] bg-white shadow-lg rounded-md outline-none border-none`}>
                    <CommentComponent 
                        className="w-full h-full" 
                        onRemove={handleRemoveComment} 
                        onSave={handleSaveComment} 
                        comments={data}
                    />
                </div>
            </Modal>
        </>

    )
}

export {
    Like,
    Comment
}