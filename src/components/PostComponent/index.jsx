import {
    LiveTvRounded as LiveTvRoundedIcon,
    FavoriteRounded as FavoriteRoundedIcon,
    FavoriteBorder as FavoriteBorderIcon,
    CommentRounded as CommentRoundedIcon,
    PeopleRounded as PeopleRoundedIcon,
} from '@mui/icons-material';
import user from 'src/assets/images/image.png';
import "./index.scss";

export default function PostComponent(props) {
    return (
        <>
            <div key={props.postId} className='post-wrap shadow-lg w-full xl:w-[48%] mx-2 mb-4'>
                <div className='post-row'>
                    <div className='post-info'>
                        <div className='header-icon-container !ml-0 !p-0'>
                            <img src={user} className="user-image" />
                        </div>
                        <div>
                            <div className='posted-by'>
                                {props.postedBy}
                            </div>
                            <div className='posted-location-text'>
                                {props.location}
                            </div>
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
                <img src={props.img} className='post-img aspect-[5/3]' />
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
                        <CommentRoundedIcon className='post-footer-icon' />
                        <div className='post-footer-text !ml-2'>{props.numberOfComments}</div>
                    </div>
                    <div className='post-bottom-info ml-6'>
                        <PeopleRoundedIcon className='post-footer-icon' />
                        <div className='post-footer-text !ml-2'>{props.numberOfViews}</div>
                    </div>
                </div>
            </div>
        </>
    )
}