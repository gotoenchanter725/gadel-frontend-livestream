import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Header, Footer, Sidebar
} from 'src/components';
import './Profile.css';

import EditSharpIcon from '@mui/icons-material/EditSharp';

import messageImage from "../../assets/images/icon/message-white.png";
import giftImage from '../../assets/images/icon/gifts.png';
import followAddImage from "../../assets/images/icon/followAdd.png";
import postImage from "../../assets/images/icon/post.png";
import supportImage from "../../assets/images/icon/support.png";
import officialImage from "../../assets/images/icon/official.png";
import { ReactComponent as AccountImage } from "./../../assets/svgs/account.svg";
import { ReactComponent as LocationImage } from "./../../assets/svgs/location.svg";
import { ReactComponent as InformationImage } from "./../../assets/svgs/information.svg";
import { settings } from 'src/services/Settings';
import { ModeEdit, SaveSharp, Settings } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import { addContact } from 'src/actions/messageActions';

import {
  FavoriteRounded,
  FavoriteBorder
} from '@mui/icons-material';

export const MODE_EDIT = "MODE_EDIT";
export const MODE_VIEW = "MODE_VIEW";

function ProfileScreen(props) {
  const navigate = useNavigate();
  const profileRef = useRef(null)
  const coverRef = useRef( null )
  const [isLoading, setLoading] = useState( false );
  const [likes, setLikes] = useState(0);
  const [mode, setMode] = useState( MODE_VIEW );
  const [country, setCountry] = useState( props.userInfo.country );
  const [information, setInformation] = useState( props.userInfo.information || '' );

  useEffect(() => {
    setCountry(props.userInfo.country);
    setInformation( props.userInfo.information || '' )
  }, [props.userInfo])
  
  const handleClickFollowers = () => {
    navigate(`/profile/${props.userInfo._id}/follows`);
  }

  const handleEditProfile = () => {
    if( profileRef && profileRef.current ) {
      profileRef.current.click()
    }
  }
  
  const handleChangeProfile = (e) => {
    if( e.target && e.target.files && e.target.files.length ) {
      var file = e.target.files[0];
      props.onChangeProfileImage(file)
    }
  }

  const handleChangeCover = (e) => {
    if( e.target && e.target.files && e.target.files.length ) {
      var file = e.target.files[0];
      props.onChangeCoverImage(file)
    }
  }

  const handleClickCoverSetting = ( e ) => {
    if( coverRef && coverRef.current ) {
      coverRef.current.click()
    }
  }

  const handleClickFollow = (e) => {
    if( props.canFollow ) props.onClickFollow(props.userInfo._id)
  }

  const [isModalOpen, setModalOpen] = useState( {open: false, zoom: false} )
  const [modalImage, setModalImage] = useState("")
  const [imageMetaData, setImageMetaData] = useState({width: 0, height: 0})

  const handleModalClose = () => setModalOpen( {open: false} )
  const handleImageClick = (src) => {
      setModalImage(src)
      setModalOpen( { open: true, zoom: true} )
      const image = new Image()
      image.onload = () => {
        setImageMetaData({width: image.naturalWidth, height: image.naturalHeight});
      }
      image.src = src;
  }

  const handleClickMessage = () => {
    if( props.canFollow ) {
      addContact(props.userInfo._id).then((response) => {
        navigate(`/message#${props.userInfo._id}`);
      }).catch((err) => {
        navigate(`/message`);
      });
    }
    else navigate(`/message`);
  }

  const handleClickGift = () => {
    navigate("/gifts");
  }

  const handleVerifyOfficial = (e) => {
    navigate("/activate-official")
  }

  const handleEditInformation = async () => {
    const status = await props.handleEditInformaiton({
      country, information
    });
    if( status ) setMode( MODE_VIEW );
    else setMode( ModeEdit );
  }

  const handleClickEditInformationIcon = () => {
    setMode( ModeEdit );
  }

  useEffect(() => {
    if( props.posts ) {
      let n = props.posts.length;
      let res = 0;
      for( let i = 0; i < n; i ++ ) {
        res += props.posts[i].like.length;
      }
      setLikes( res );
    }
  }, [props.posts])

  return (
    <div className="profile" style={{ position: 'relative' }}>
      <div className='flex flex-col relative w-full'>
        <div className='min-h-[200px]'>
          <img src={props.coverImage} className="w-[100%] aspect-[11/8] md:aspect-[11/5]" />
          {props.editCoverImage?(
            <>
              <Settings className='cover-setting-icon shadow-[0px_0px_3px_3px_#e9b6b6 ] rounded-[50%]' onClick={handleClickCoverSetting} ></Settings>
              <input type="file" hidden ref={coverRef} onChange={handleChangeCover} accept=".jpg, .jpeg, .png" />
            </>
          ):(<></>)}
          
        </div>
        <div className='flex w-full p-4 mb-2 md:mb-4'>
          <div className='relative w-[100px] md:w-[200px] mr-2'>
            <div className='absolute left-0 -top-[70px] md:-top-[120px]'>
              <img src={props.profileImage} onClick={(e) => {handleImageClick(props.profileImage)}} alt="" className='rounded-[50%] border-solid border-2 border-white-600 w-[80px] h-[80px] md:w-[150px] md:h-[150px] aspect-[1/1]'/>
              {props.editProfile&&(
                <>
                  <EditSharpIcon className='absolute md:right-[9%] md:bottom-[9%] right-[5%] bottom-[5%] text-[#6e1429] rounded-[50%] bg-[#ffffff] border-[black] p-[3px] cursor-pointer shadow-[0px_0px_3px_3px_#e9e7e7]' onClick={handleEditProfile}></EditSharpIcon>
                  <input type="file" ref={profileRef} className='hidden' onChange={handleChangeProfile}/>
                </>
              )}
              
            </div>
            
          </div>
          <div className='flex flex-wrap items-center justify-between w-[calc(100%_-_100px)] md:w-[calc(100%_-_200px)]'>
            <div className='flex jusstify-start w-full md:w-auto'>
              <Link className='p-1.5 mr-1.5 font-semibold text-md md:text-lg' to={`/${props.userInfo._id}/all`}>All</Link>
              <Link className='p-1.5 mr-1.5 font-semibold text-md md:text-lg' to={`/${props.userInfo._id}/posts`}>Posts</Link>
              <Link className='p-1.5 mr-1.5 font-semibold text-md md:text-lg' to={`/${props.userInfo._id}/pictures`}>Pictures</Link>
              <Link className='p-1.5 mr-1.5 font-semibold text-md md:text-lg' to={`/${props.userInfo._id}/videos`}>Videos</Link>
              <Link className='p-1.5 mr-1.5 font-semibold text-md md:text-lg' to={`/${props.userInfo._id}/audios`}>Audios</Link>
              <Link className='p-1.5 mr-1.5 font-semibold text-md md:text-lg' to={`/${props.userInfo._id}/live-streams`}>Live Streams</Link>
            </div>
            <div className='flex justify-end w-full md:w-auto'>
              <button className='flex items-center rounded-lg text-white mr-2 px-2 py-1.5 bg-green-400' onClick={handleClickMessage}>
                <img className='h-[20px] mr-2' src={messageImage} alt={'message'} />
                Message
              </button>
              {props.canFollow ? (
                <button className='flex items-center rounded-lg text-white px-2 py-1.5 bg-primary' onClick={handleClickFollow}>
                  {/* <img className='h-[20px] mr-2' src={followAddImage} alt={'Follows'} /> */}
                  {props.isFollow?'Unfollow':'Follow'}
                  
                </button>
              ): (
                <button className='flex items-center rounded-lg text-white mr-2 px-2 py-1.5' onClick={handleClickGift}>
                  <img className='h-[30px]' src={giftImage} alt={'gift'} />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col px-4 py-6'>
          <div className='flex flex-col w-full pl-6'>
            <div className='flex flex-col sm:flex-row justify-start sm:justify-between w-full'>
              <div className=''>
                <div className='flex space-x-2'>
                  <h2 className='text-[#515151] text-4xl pb-2 font-bold flex items-center space-x-2'>
                    <AccountImage className='fill-current w-[36px] h-[36px]' />
                    <span>{props.userInfo.username}</span>
                  </h2>

                  {
                    props.isOfficial && (
                      props.officialActive?(
                        <img className='w-[30px] h-[30px] ml-2 mt-[8px]' src={officialImage} alt={'official'} />
                      ):(
                        props.isSelf && (
                          <button className='flex items-center rounded-lg text-white px-2 py-1 bg-green-400' onClick={handleVerifyOfficial}>
                            Activate
                          </button>
                        )
                      )
                    )
                  }
                </div>
              </div>
              <div className='flex items-center'>
                <button className='flex items-center rounded-full text-white mr-2 px-3 py-1.5 bg-[#B7B7B7]'>
                  <img className='h-[20px] mr-2' src={postImage} alt={'Post'} />
                  Post
                </button>
                <button className='flex items-center rounded-full text-white px-3 py-1.5 bg-primary'>
                  <img className='h-[20px] mr-2' src={supportImage} alt={'Support'} />
                  Support
                </button>
              </div>
            </div>
          </div>
          <div className='flex w-full justify-between pl-6'>
            <div className='flex flex-col space-y-1'>
              <h2 className='text-[#515151] text-md font-bold flex items-center space-x-2'>
                <LocationImage className='fill-current  w-[20px] h-[20px]' />
                { (props.editProfile && mode == ModeEdit) ? (
                  <input 
                    type="text" 
                    value={country} 
                    className={`border-red-500 border-[1px] border-solid rounded-md px-[2px] py-[1px]`}
                    onChange={e => { setCountry( e.target.value )}}
                  />
                ):(
                  <span className='px-[2px] py-[1px]'>{country}</span>
                )}
              </h2>
              <h2 className='text-[#515151] text-md font-bold flex items-center space-x-2'>
                <InformationImage className='fill-current w-[20px] h-[20px]' />
                { (props.editProfile && mode == ModeEdit) ? (
                  <input 
                    type="text" 
                    value={information} 
                    className={`border-red-500 border-[1px] border-solid rounded-md px-[2px] py-[1px]`}
                    onChange={e => { setInformation( e.target.value )}}
                  />
                ):(
                  <span className='px-[2px] py-[1px]'>{information}</span>
                )}
              </h2>
            </div>
            <div className="text-blue-500 cursor-pointer flex flex-col justify-end">
              {props.editProfile && (
                mode == ModeEdit ? (
                  <SaveSharp onClick={handleEditInformation}/>
                ) : (
                  <EditSharpIcon onClick={handleClickEditInformationIcon}/>
                )
              )}
            </div>
          </div>
          <div className='flex flex-col w-full pl-6 mb-3'>
            <p className='text-[#868686] font-semibold text-lg'>{props.posts?.length} Posts | <a className='text-blue-500 cursor-pointer' onClick={handleClickFollowers}>{props?.userInfo?.follows?.length}  Followers</a> | {likes} <FavoriteRounded style={{ color: "red", marginTop: "-3px" }} /></p>
          </div>
          <div className='w-full py-4 md:px-2 flex flex-wrap px-3'>
            {
              props.posts.map((item, index) => {
                return item.file_path && (
                  <div key={index} className='w-full sm:w-[50%] lg:w-[33%] xl:w-[25%] aspect-[11/9] p-2 md:p-3'>
                    <div className='flex flex-col justify-end relative w-full h-full rounded-md overflow-hidden'>
                      {/* <img className='-z-[10] absolute left-0 top-0 w-full h-full' src={`${settings.baseUrl}/${item.file_path}`} alt='post image' /> */}
                      {(item.type == 'PHOTO')?(
                        <>
                          <img src={`${settings.baseUrl}/${item.file_path}`} className='absolute left-0 top-0 w-full h-full' /*onClick={() => handleImageClick(item.img)}*/ />
                          <div className='px-2 py-2 bg-[#ff6262b2] min-h-[40px] z-[1]'>
                            <h4 className='font-bold text-white text-lg px-2'>
                              {item.title}
                            </h4>
                          </div>
                        </>
                      ):(
                        <video width="100%" height="100%" controls className='object-fill z-[1] absolute left-0 top-0 w-full h-full'>
                            <source src={`${settings.baseUrl}/${item.file_path}`} type="video/mp4"/>
                            <source src={`${settings.baseUrl}/${item.file_path}`} type="video/ogg"/>
                            Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <Footer />
      </div>
      <div className={'loading-spin '+(isLoading?'active':'')}></div>
      
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
        <div className={`${isModalOpen.comment?"w-[90%] h-[70%] lg:w-[50%] lg:aspect-[5/3]":((imageMetaData.width > imageMetaData.height)?"w-[80%]":"h-[80%]")} bg-white shadow-lg rounded-md`}>
            <img src={modalImage} alt="" className={'w-full h-full rounded-lg'} />
        </div>
    </Modal>
    </div>
  );
}

export default ProfileScreen;
