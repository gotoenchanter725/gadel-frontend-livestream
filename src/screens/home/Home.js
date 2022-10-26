import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Header, Footer, Sidebar
} from 'src/components';
import { POSTS } from 'src/mock/mockData';
import './Home.scss';
import CreatePostComponent from 'src/components/CreatePost';
import PostComponent from 'src/components/PostComponent';

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
      <Header type="home" />
      <div className='home main relative flex justify-around md:justify-start'>
        <Sidebar active="home" />
        <div className='w-[100%] sm:w-[80%] md:w-[60%] lg:w-[50] xl:w-full  py-4 px-2 flex flex-wrap'>
          <CreatePostComponent />
          {posts && posts.length > 0 && posts.map((post, index) => (
            <PostComponent
              key={index + 1}
              postId={post.id}
              img={post.img}
              postedBy={post.postedBy}
              location={post.location}
              isLive={post.isLive}
              isFavorite={post.isFavorite}
              numberOfLikes={post.numberOfLikes}
              numberOfComments={post.numberOfComments}
              numberOfViews={post.numberOfViews}
              handleLikePost={() => handleLikePost(index)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeScreen;
