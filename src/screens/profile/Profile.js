import React, { useRef, useState, useEffect } from 'react';
import { Link, useAsyncError, useNavigate, useParams } from 'react-router-dom';
import {
  Header, Footer, Sidebar
} from 'src/components';
import './Profile.css';

import { useStateValue } from 'src/services/state/State';
import { settings } from 'src/services/Settings';
import { changeCoverImage, changeProfileImage, follow, getUserInfo, updateUserInformation } from 'src/actions/accountActions';
import axios from 'axios';
import { getAllPosts, getMyPosts } from 'src/actions/postActions';
import { POST_GET_SUCCESS } from './../../actions/postActions';
import Profile from "./../../components/Profile";
import authService from 'src/services/authService';

function ProfileScreen() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const profileRef = useRef(null)
  const [state, dispatch] = useStateValue()
  const [isLoading, setLoading] = useState( false )
  const [profileImage, setProfileImage] = useState(`${settings.sourceUrl}/avatar/${state.user._id}`)
  const { userId } = useParams()
  const [userInfo, setUserInfo] = useState({})
  const [coverImage, setCoverImage] = useState(`${settings.sourceUrl}/cover/${state.user._id}`)
  const [isFollow, setIsFollow] = useState(false)
  const [canFollow, setCanFollow] = useState( false )
  const [isOfficial, setOfficial] = useState( !!state.user.official );
  const [officialActive, setOfficialActive] = useState( !!state.user.officialActive );
  const [loadingText, setLoadingText] = useState('');

  const handleEditProfile = () => {
    if( profileRef && profileRef.current ) {
      profileRef.current.click()
    }
  }

  const handleChangeProfile = (file) => {
      var reader = new FileReader();
      reader.onloadend = function() {
        changeProfileImage(file)
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
  }

  const handleChangeCoverImage = ( file ) => {
    let url = URL.createObjectURL(file)
    setLoading( true );
    try {
      changeCoverImage(file, onProgress).then((response) => {
        setLoading( false );
        setCoverImage( url )
      }).catch((err) => {
        setLoading( false );
      })
    } catch (error) {
      setLoading( false );
    }
  }

  const handleClickFollow = (userId) => {
    console.log( userId )
    follow(userId, !isFollow).then((response) => {
      state.user.follows = response.payload.follows
      dispatch({...state})
      userInfo.follows = response.payload.follows
      setUserInfo({...userInfo})
      authService.setUser(state.user)
      const follows = state.user.follows
      if( follows.filter((item)=> item.userId == userId).length <= 0 ) setIsFollow( false )
      else setIsFollow( true )
    })
  }

  const onProgress = (e) => {
    setLoadingText(`( ${Math.round(e.loaded / 1024 / 1024 * 100) / 100} Mb / ${Math.round(e.total / 1024 / 1024 * 100) / 100} Mb ) ${Math.round(e.loaded / e.total * 1E4) / 100} %`)
  }

  const loadUserInfo = async (userId) => {
    try {
      setLoading( true );
      let info = (await getUserInfo(userId)).payload.res.userData;
      setUserInfo( {...info} );
      setProfileImage(`${settings.sourceUrl}/avatar/${info._id}`);
      setCoverImage(`${settings.sourceUrl}/cover/${info._id}`);
      setLoading( false );
      setOfficial( !!info.official );
      setOfficialActive( info.officialActive );
    } catch (error) {
      setLoading( false );
    }
    setLoading( false );
  }

  useEffect(() => {
    console.log(state.user)
    const loadMyPosts = async () => {
      setLoading(true)
      try {
        let response = await getAllPosts(userId?userId:state.user._id, null, null, 'ALL')
        if( response.type == POST_GET_SUCCESS ) {
          console.log(response);
          setPosts([...response.payload.data])
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
      }
      setLoading(false)
    }
    loadMyPosts()
  }, [])

  useEffect(() => {
    loadUserInfo(userId?userId:state.user._id)
    if(userId == null || userId == state.user._id) {
      setIsFollow( false )
      setCanFollow( false )
    }
    else {
      setCanFollow( true )
      const follows = state.user.follows
      if(typeof follows == 'object') {
        if( follows.filter((item)=> item.userId == userId).length <= 0 ) setIsFollow( false )
        else setIsFollow( true )
      }
    }
  }, [userId])
  
  const handleEditInformaiton = async ( data ) => {
    try {
      await updateUserInformation( data );
      return true;
    }
    catch ( err ) {
      alert( err.response.data.message );
      return false;
    }
  }

  return (
    <>
      <Profile 
        posts={posts} 
        profileImage={profileImage} 
        onChangeProfileImage={handleChangeProfile} 
        onChangeCoverImage={handleChangeCoverImage}
        userInfo={userInfo}
        editProfile={(userId==null || userId==state.user._id)?true:false}
        editCoverImage={(userId==null || userId==state.user._id)?true:false}
        coverImage={coverImage}
        canFollow={canFollow}
        isFollow={isFollow}
        onClickFollow={handleClickFollow}
        isOfficial={isOfficial}
        officialActive={officialActive}
        isSelf={userId==null || userId==state.user._id}
        handleEditInformaiton={handleEditInformaiton}
      />
      <div className={'loading-spin '+(isLoading?'active':'')}>{loadingText}</div>
    </>
  );
}

export default ProfileScreen;
