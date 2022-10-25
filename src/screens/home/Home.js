import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BorderColorRounded as BorderColorRoundedIcon,
  InsertPhotoRounded as InsertPhotoRoundedIcon,
  VideocamRounded as VideocamRoundedIcon,
  LiveTvRounded as LiveTvRoundedIcon,
  FavoriteRounded as FavoriteRoundedIcon,
  FavoriteBorder as FavoriteBorderIcon,
  CommentRounded as CommentRoundedIcon,
  PeopleRounded as PeopleRoundedIcon,
} from '@mui/icons-material';
import {
  Header, Footer, Sidebar
} from 'src/components';
import user from 'src/assets/images/image.png';
import post from 'src/assets/images/post.jpeg';
import { POSTS } from 'src/mock/mockData';
import './Home.scss';

function HomeScreen() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(POSTS);

  const handleLikePost = (index) => {
    const data = [...posts];
    const item = data[index];
    item.isFavorite = !item.isFavorite;
    if (item.isFavorite) {
      item.numberOfLikes = item.numberOfLikes + 1;
    } else {
      item.numberOfLikes = item.numberOfLikes - 1;
    }
    data[index] = item;
    setPosts(data);
  }

  return (
    <div className="" style={{ position: 'relative' }}>
      <Header />
      <div className='home main'>
        <Sidebar active="home" />
        <div className='main-container'>
          <div className='new-post-container'>
            <div className='create-post-container'>
              <div className='header-icon-container'>
                <BorderColorRoundedIcon className='small-icon' />
              </div>
              <div className='create-post'>
                Create Post
              </div>
            </div>
            <div className='post-container'>
              <div className='header-icon-container'>
                <img src={user} className="user-image" />
              </div>
              <input
                placeholder={`What's on your mind?`}
                className='new-post-input'
              />
            </div>
            <div className='new-post-buttons'>
              <div className='new-post-buttons-left'>
                <div className='new-post-button'>
                  <VideocamRoundedIcon className='new-post-icon' />
                  <div className='new-post-text'>Live Video</div>
                </div>
                <div className='new-post-button'>
                  <InsertPhotoRoundedIcon className='new-post-icon' />
                  <div className='new-post-text'>Photo/Video</div>
                </div>
              </div>
              <div className='submit-button'>
                Submit
              </div>
            </div>
          </div>
          {posts && posts.length > 0 && posts.map((post, index) => (
            <div key={post.id} className='post'>
              <div className='post-row'>
                <div className='post-info'>
                  <div className='header-icon-container'>
                    <img src={user} className="user-image" />
                  </div>
                  <div>
                    <div className='posted-by'>
                      {post.postedBy}
                    </div>
                    <div className='posted-location-text'>
                      {post.location}
                    </div>
                  </div>
                </div>
                {post.isLive && (
                  <div className='live-container'>
                    <LiveTvRoundedIcon className='live-icon' />
                    <div className='live-text'>
                      Live
                    </div>
                  </div>
                )}
              </div>
              <img src={post.img} className='post-img' />
              <div className='post-footer'>
                <div className='post-bottom-info'>
                  {post.isFavorite ? (
                    <FavoriteRoundedIcon
                      className='post-footer-icon'
                      onClick={() => handleLikePost(index)}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      className='post-footer-icon'
                      onClick={() => handleLikePost(index)}
                    />
                  )}
                  <div className='post-footer-text'>{post.numberOfLikes}</div>
                </div>
                <div className='post-bottom-info' style={{ marginLeft: 20 }}>
                  <CommentRoundedIcon className='post-footer-icon' />
                  <div className='post-footer-text'>{post.numberOfComments}</div>
                </div>
                <div className='post-bottom-info' style={{ marginLeft: 20 }}>
                  <PeopleRoundedIcon className='post-footer-icon' />
                  <div className='post-footer-text'>{post.numberOfViews}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeScreen;
