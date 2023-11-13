import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Header, Footer, Sidebar
} from 'src/components';
import { POSTS } from 'src/mock/mockData';
import './Home.scss';
import CreatePostComponent from 'src/components/CreatePost';
import PostComponent from 'src/components/PostComponent';
import userImage from 'src/assets/images/image.png'
import { Snackbar } from '@mui/material';
import { 
  createPost, 
  getAllPosts, 
  getMyPosts, 
  POST_GET_SUCCESS, 
  POST_SUCCESS, 
  removeComment, 
  saveComment,
  getGifts as getPostGifts
} from 'src/actions/postActions';
import authService from 'src/services/authService';
import { settings } from 'src/services/Settings';

import textDefaultImage from "./../../assets/images/post.jpeg"
import { useStateValue } from 'src/services/state/State';
import { likePost } from '../../actions/postActions';
import { getUserGifts, sendGift } from 'src/actions/accountActions';

function HomeScreen() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [openError, setOpenError] = useState(false)
  const [errorText, setErrorString] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(0)
  const [state, dispatch] = useStateValue()
  const [userImg, setUserImg] = useState(userImage)
  const [loadingText, setLoadingText] = useState('')
  
  useEffect(() => {
    const loadMyPosts = async () => {
      setLoading(true)
      try {
        let response = await getAllPosts(null, null, null, 'ALL')
        if( response.type == POST_GET_SUCCESS ) {
          let data = response.payload.data
          data = data.map(item => ({...item, isFavorite:(item.like.indexOf(state.user._id)<0)?false:true}))
          console.log(state.user, data)
          setPosts([...data])
          setLoading(false)
        }
      } catch (error) {
        setOpenError(true)
        setErrorString(error)
        setLoading(false)
      }
      setLoading(false)
    }
    loadMyPosts()
    setUserImg(`${settings.sourceUrl}/avatar/${state.user._id}`)
  }, [])
  const handleLikePost = async (index) => {
    const item = posts[index];
    item.isFavorite = !item.isFavorite;
    setLoading(true)
    likePost(item._id, item.isFavorite).then((response) => {
      item.like = response.likes
      posts[index] = item;
      setPosts([...posts]);
      setLoading( false )
    })
    .catch(error => {
      console.log( error )
      setLoading( false )
    })
  }

  const handlePost = async (data) => {
    setOpenError(!data.status)
    setLoading( true )
    if(data.status == false) setErrorString(data.message)
    else {
      try {
        let res = await createPost(data.data.title, data.data.text, data.data.file, onProgress)
        if( res.type == POST_SUCCESS && res.payload && res.payload.post && res.payload.post.state ) {
          setPosts([{...res.payload.post.post, userId:state.user}, ...posts])
          setOpenError( true )
          setErrorString("Success!")
        }
        else {
          setOpenError( true )
          setErrorString(res.error.errMessage)
        }
        setLoading( false )
      } catch (error) {
        setLoading( false )
        // setErrorString(res.payload.post.data)
      }
      
    }
    setLoading( false )
  }

  const handleSaveComment = ( idx, comment ) => {
    setLoading( true )
    saveComment(posts[idx]._id, comment).then((response) => {
      posts[idx].comments = response.comments;
      setPosts([...posts]);
      setLoading( false )
    }).catch((err) => {
      setLoading( false );
    })
  }

  const handleRemoveComment = ( idx, commentId ) => {
    setLoading( true )
    removeComment(posts[idx]._id, commentId).then((response) => {
      posts[idx].comments = response.comments;
      setPosts([...posts]);
      setLoading( false )
    }).catch((err) => {
      setLoading( false );
    })
  }

  const getGifts = async ( postID ) => {
    const res = {
      user: [],
      post: []
    }
    try {
      const userGifts = await getUserGifts();
      res.user = userGifts.data.gifts;
      const postGifts = await getPostGifts( postID );
      res.post = postGifts.data.gifts;
      return res;
    } catch (error) {
      return res;
    }
    return res;
  }

  const onProgress = (e) => {
    setLoadingText(`( ${Math.round(e.loaded / 1024 / 1024 * 100) / 100} Mb / ${Math.round(e.total / 1024 / 1024 * 100) / 100} Mb ) ${Math.round(e.loaded / e.total * 1E4) / 100} %`)
  }

  const handleSendGift = (giftID, postID) => {
    return sendGift(giftID, postID);
  }

  return (
    <div className="" style={{ position: 'relative' }}>
      <Header type="home" />
      <div className='home main relative flex justify-around md:justify-start'>
        <Sidebar active="home" />
        <div className='grow w-full sm:w-[80%] md:w-[60%] py-4 px-[2%] flex flex-wrap space-x-1 justify-between'>
          <CreatePostComponent
            onSubmit={handlePost}
            userImage={userImg}
          />
          {posts && posts.length > 0 && posts.map((post, index) => (
            <PostComponent
              key={index + 1}
              postId={post._id}
              img={post.file_path?`${settings.baseUrl}/${post.file_path}`:textDefaultImage}
              postedBy={post.userId.username}
              posterImg={`${settings.sourceUrl}/avatar/${post.userId._id}`}
              title={post.title}
              description={post.description}
              location={post.userId.country}
              isLive={post.isLive}
              isFavorite={post.isFavorite}
              numberOfLikes={post?.like?.length}
              numberOfComments={post.comments.length}
              numberOfViews={post.views}
              handleLikePost={() => handleLikePost(index)}
              type={post.type}
              userId={post.userId._id}
              handleSaveComment={(comment) => (handleSaveComment(index, comment))}
              handleRemoveComment={(commentId) => (handleRemoveComment(index, commentId))}
              comments={post.comments}
              getGifts={getGifts}
              sendGift={(giftID) => handleSendGift(giftID, post._id)}
              gifts={post.gifts}
            />
          ))}
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
  );
}

export default HomeScreen;
