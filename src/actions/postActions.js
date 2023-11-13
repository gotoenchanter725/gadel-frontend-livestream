import axios from 'src/utils/axios';
import postService from 'src/services/postService';
import { settings } from '../services/Settings';

export const POST_SUCCESS = '@post/post-success';
export const POST_FAILURE = '@post/post-failure';
export const POST_GET_SUCCESS = '@post/post-get-success';
export const POST_GET_FAILURE = '@post/post-get-failre'
export const POST_COUNT_GET_SUCCESS = '@post/post-count-get-success'
export const POST_COUNT_GET_FAILTURE = '@post/post-count-get-failture'
export const POST_LIKE_SUCCESS = '@post/post-like-success'
export const POST_LIKE_FAILTURE = '@post/post-like-failture'
export const COMMENT_SAVE_SUCCESS = '@post/post-like-success';
export const COMMENT_SAVE_FAILTURE = '@post/post-like-failture';

export async function createPost(title, description, file, onProgress=(e)=>{}) {
  try {
    const post = await postService.createPost(title, description, file, onProgress)
    return ({
      type: POST_SUCCESS,
      payload: {
        post
      }
    });
  } catch (error) {
    return ({ type: POST_FAILURE, error: error });
  }
}

export async function getMyPosts(userid, pageNum, pageLen) {
  try {
    const posts = await postService.getMyPosts(userid, pageNum, pageLen)
    return ({
      type: POST_GET_SUCCESS,
      payload: {
        posts
      }
    })
  } catch (error) {
    return ({
      type: POST_GET_FAILURE
    })
  }
}

export async function getPostCount(userid) {
  try {
    const response = await postService.getPostCount(userid)
    if( response.status ) {
      return {
        type: POST_COUNT_GET_SUCCESS,
        payload: {
          data : response.data
        }
      }
    }
    else {
      return {
        type: POST_COUNT_GET_FAILTURE,
        payload: {
          data : response.errMessage
        }
      }
    }
  } catch (error) {
    return {
      type: POST_COUNT_GET_FAILTURE,
      payload: {
        data : error
      }
    }
  }
}

export async function getAllPosts(userid, from, to, type){
  try {
    let res = await postService.getAllPosts(userid, from, to, type)
    if(res.state) {
      return {
        type: POST_GET_SUCCESS,
        payload: res
      }
    }
    else return {
      type: POST_GET_FAILURE
    }
  } catch (error) {
    return {
      type: POST_GET_FAILURE,
      error: error
    }
  }
}

export const likePost = (postId, like) => new Promise((resolve, reject) => {
  try {
    axios.post(`${settings.baseUrl}${like?settings.post.addLike:settings.post.deleteLike}`, {
      postId: postId
    }).then(response => response.data).then( (response) => {
      console.log(response)
      if( response.state ) {
        resolve({
          type: POST_LIKE_SUCCESS,
          likes: response.likes
        })
      }
      else reject({
        type: POST_LIKE_FAILTURE,
        message: response.message
      })
    }).catch((error) => {
      reject({
        type: POST_LIKE_FAILTURE,
        message: error
      })
    })
  } catch (error) {
    reject({
      type: POST_LIKE_FAILTURE,
      message: error
    })
  }
  
})

export const saveComment = (postId, comment) => new Promise((resolve, reject) => {
  try {
    axios.post(`${settings.baseUrl}${settings.post.saveComment}`, {
      postId: postId,
      content: comment
    }).then((response) => {
      if(response.status) return response.data;
      else reject({
        type: COMMENT_SAVE_FAILTURE
      })
    }).then((response) => {
      if(response.state) resolve({
        type: COMMENT_SAVE_SUCCESS,
        comments: response.comments
      })
      else reject({
        type: COMMENT_SAVE_FAILTURE
      })
    }).catch((err) => {
      reject({
        type: COMMENT_SAVE_FAILTURE,
      })
    })
  }
  catch {

  }
})

export const removeComment = (postId, commentId) => new Promise((resolve, reject) => {
  try {
    axios.post(`${settings.baseUrl}${settings.post.removeComment}`, {
      postId: postId,
      commentId: commentId
    }).then((response) => {
      if(response.status) return response.data;
      else reject({
        type: COMMENT_SAVE_FAILTURE
      })
    }).then((response) => {
      if(response.state) resolve({
        type: COMMENT_SAVE_SUCCESS,
        comments: response.comments
      })
      else reject({
        type: COMMENT_SAVE_FAILTURE
      })
    }).catch((err) => {
      reject({
        type: COMMENT_SAVE_FAILTURE,
      })
    })
  }
  catch {

  }
})

export const getGifts = ( postID ) => new Promise((resolve, reject) => {
  try {
    axios.get(`${settings.baseUrl}${settings.post.gifts}`, {
      params: {
        postID
      }
    }).then( response => response.data).then((response) => {
      resolve(response);
    }).catch(err => {
      reject(err);
    })
  } catch (error) {
    reject(error)    ;
  }
});
