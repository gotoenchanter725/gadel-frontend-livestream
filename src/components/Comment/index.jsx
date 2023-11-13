import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { settings } from "src/services/Settings";
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import { CommentPreview } from "./Preview";
import "./comment.scss"

const Comment = (props = {onSave: (comment) => {}, className: '', onRemove: (id) => {}, comments: []}) => {
    const [comment, setComment] = useState('')
    const scrollToBottom = () => {
        const element = document.getElementById("comments-container")
        element.scrollTo({
            top: 99999999999,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        scrollToBottom()
    })
    
    return (
        <div className={props.className+" comment p-4 pt-3 flex flex-col"}>
            <h5 className="px-3">Comments</h5>
            <div 
                className={`p-2 ${props.comments.length && ``} rounded-lg grow overflow-x-hidden overflow-y-auto scroll-md my-3 pr-2`}
                id="comments-container"
            >
                {(props.comments && props.comments.length)?props.comments.map((item, index) => {
                    return (
                        <div className={`w-fill bg-white ${index && "mt-2"} rounded-md p-[8px] border-[1px] border-[#eeeff1]`} key={index}>
                            <div className="flex justify-start text-[15px] text-gray-500">
                                <img src={`${settings.sourceUrl}/avatar/${item.senderId}`} alt="BH" className="rounded-full shadow-lg mr-1" style={{ width: "35px", height: "35px" }} />
                                <span className="flex flex-col w-full justify-center">
                                    <span className="flex justify-between">
                                        <span>
                                            {item.sender}
                                        </span>
                                        <span onClick={() => props.onRemove(item._id)}>
                                            <ClearIcon fontSize="10px" className="cursor-pointer" />
                                        </span>
                                    </span>
                                    <span className="text-[10px]">{moment(item.date).format(settings.time.format.full)}</span>
                                </span>
                            </div>
                            <span className="break-words">{item.content}</span>
                        </div>
                    )
                }):(
                    <div className="w-fill bg-white p-[4px] ">
                        No Comment
                    </div>
                )}
            </div>
            
            {/* <div className="text-sm flex justify-end mb-1 px-5 text-gray-600">{comment.length}</div> */}
            <div className="flex flex-row justify-end">
                <input 
                    className="p-2 px-4 grow text-[18px] rounded-lg" 
                    placeholder="Please remain comment here"
                    onChange={(e) => {
                        setComment( e.target.value )
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode == 13) {
                            comment.length && props.onSave(comment); setComment("")
                        }
                    }}
                    value={comment}
                />
                <div className="flex flex-col justify-center">
                    <button className="bg-red-600 rounded-md h-[40px] py-[2px] px-5 text-white ml-2 hover:bg-red-400 active:bg-red-700" onClick={() => {comment.length && props.onSave(comment); setComment("")}}><SendIcon/> </button>
                </div>
            </div>
        </div>
    )
}

export { Comment, CommentPreview };