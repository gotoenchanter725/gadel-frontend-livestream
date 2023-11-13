import DownloadIcon from '@mui/icons-material/Download';

export const MESSAGE_IN = 'MESSAGE_IN';
export const MESSAGE_OUT = 'MESSAGE_OUT';
export const MESSAGE_READED = 'MESSAGE_READED';
export const MESSAGE_UNREAD = 'MESSAGE_UNREAD';

const Message = ( {type, img, text, file, fileType, date, onDownload = (id) => {}, status = MESSAGE_READED} ) => {
    return (
        <>
            <div className={`chat ${type == MESSAGE_IN?'chat-start':'chat-end'}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src={img} />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs opacity-50">{date}</time>
                </div>
                <div className="chat-bubble break-words bg-gray-100 text-black">{text}</div>
                <div className="chat-footer opacity-50">
                    {`${status == MESSAGE_READED ? 'Delivered' : 'Unread'}`}
                </div>
            </div>
            {fileType&&(
                <div className={`chat relative ${type == MESSAGE_IN?'chat-start':'chat-end'}`}>
                    {fileType == "image" && (
                        <img src={file} alt="" className='max-w-[90%] md:max-w-[60%] rounded-lg border-[1px] border-gray-100 shadow-xl' />
                    )}
                    <div className={`cursor-pointer absolute ${type == MESSAGE_IN?'left-[8px]':'right-[20px]'} bottom-[10px] rounded-full bg-slate-100 text-blue-500`} onClick={(e) => {onDownload()}}>
                        <DownloadIcon/>
                    </div>
                </div>
            )}
            
        </>
    )
}

export default Message;