import {
    BorderColorRounded as BorderColorRoundedIcon,
    InsertPhotoRounded as InsertPhotoRoundedIcon,
    VideocamRounded as VideocamRoundedIcon,
} from '@mui/icons-material';
import user from 'src/assets/images/image.png';
import "./createPost.scss";

export default function CreatePostComponent(props) {
    return (
        <>
            <div className='create-post-container-wrapp  shadow-lg w-full xl:w-[48%] mx-2 mb-4'>
                <div className='create-post-container'>
                    <div className='header-icon-container'>
                        <BorderColorRoundedIcon className='small-icon' />
                    </div>
                    <div className='create-post'>
                        Create Post
                    </div>
                </div>
                <div className='post-container aspect-[5/3]'>
                    <div className='header-icon-container !p-0'>
                        <img src={user} className="user-image w-full h-full" />
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
        </>
    )
}