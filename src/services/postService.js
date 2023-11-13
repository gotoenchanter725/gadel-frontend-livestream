import axios from 'src/utils/axios';
import { settings as s } from 'src/services/Settings';

class PostService {
  createPost = (title, description, file = null, onProgress=(e)=>{}) => new Promise((resolve, reject) => {
    let formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    if( file !== null ){
      formData.append("file", file )
    }
    axios.post(`${s.baseUrl}${s.post.createPost}`, formData, {
      onUploadProgress: onProgress
    })
    .then((response) => {
      if( response.status === 200 ) resolve(response.data)
      else response.reject(response.data)
    }).catch((error) => (reject(error.response.data)))
  })

  getMyPosts = (userid, pageNum, pageLen) => new Promise((resolve, reject) => {
    try {
      console.log(`${s.baseUrl}${s.post.getMyPosts}`);
      axios(`${s.baseUrl}${s.post.getMyPosts}`, {
        method: "GET",
        headers : {
          'Content-Type': 'application/json',
          Accept: "*/*"
        },
        // body: JSON.stringify({
        //   userid: userid,
        //   pageNum: pageNum,
        //   pageLen: pageLen
        // })
      }).then((response) => {
        if( 1 ) resolve(response.data)
        else reject(response)
      }).catch((error) => {
        reject(error)
      })
    } catch (error) {
      reject( error )
    }
  })

  getPostCount = (userid) => new Promise((resolve, reject) => {
    try {
      axios(`${s.baseUrl}${s.post.getPostCount}`, {
        method: 'GET',
        params: {
          userid
        },
        headers: {
          "Content-Type": 'application/json',
          Accept: '*/*'
        }
      }).then((response) => {
        console.log(response);
        resolve(response)
      }).catch((error) => {
        reject( error )
      })
    } catch (error) {
      reject(error)
    }
  })

  getAllPosts = (userid, from, to, type) => new Promise((resolve, reject) => {
    try {
      axios(`${s.baseUrl}${s.post.getAllPosts}`, {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
        data:{
          userid:userid,
          from, to, type
        }
      }).then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
    } catch (error) {
      reject(error)
    }
    
  })
}

const postService = new PostService();

export default postService;
