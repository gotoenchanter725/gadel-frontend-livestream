import { settings }  from "src/services/Settings";
import "./comment.scss"

const CommentPreview = ( props ) => {
    return (
        <div className='post-comment-prev'>
            <div className='flex'>
                <div className='arrow'></div>
                <img src={`${settings.sourceUrl}/avatar/${props.comment.senderId}`} className={`rounded-full w-[35px] h-[35px] ml-1`} alt="" />
                <div className="content-box">
                    <span className="sender-name">{props.comment.sender}</span>
                    <div className="content overflow-hidden">{props.comment.content}</div>
                </div>
            </div>
        </div>
    )
}

export { CommentPreview };

