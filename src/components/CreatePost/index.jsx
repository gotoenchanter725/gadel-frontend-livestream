import { useRef, useState } from 'react';
import {
    BorderColorRounded as BorderColorRoundedIcon,
    InsertPhotoRounded as InsertPhotoRoundedIcon,
    VideocamRounded as VideocamRoundedIcon,
} from '@mui/icons-material';
import "./createPost.scss";

const PREV_NONE = 'PREV_NONE'
const PREV_VIDEO = 'PREV_VIDEO'
const PREV_IMAGE = 'PREV_IMAGE'
const PREV_AUDIO = 'PREV_AUDIO'

export default function CreatePostComponent(props) {
    
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [file, setFile] = useState(null)
    const [prevUrl, setPrevUrl] = useState('')
    const [prevType, setPrevType] = useState(PREV_NONE)

    const inputFileRef = useRef(null)
    const onClickFileSelect = (e) => inputFileRef.current.click()

    const handleFileChange = (e) => {
        if( e.target.files && e.target.files.length ) {
            setFile(e.target.files[0])
            const url = URL.createObjectURL(e.target.files[0])
            const type = e.target.files[0].type.split('/')[0]
            setPrevUrl( url )
            console.log(type );
            if( type == 'video' ) setPrevType( PREV_VIDEO )
            else if(type == 'image') setPrevType( PREV_IMAGE )
            else if(type == 'audio') setPrevType( PREV_AUDIO )
            else setPrevType( PREV_NONE )
        }
        
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleTextChange = (e) => {
        setText(e.target.value)
    }
    
    const handleSubmit = () => {
        let maxTitle = 2048
        if( props.maxTitle != null && !isNaN(Number(props.maxTitle)) ) maxTitle = Number(props.maxTitle)

        let minTitle = 0
        if( props.minTitle != null && !isNaN(Number(props.minTitle)) ) minTitle = Number(props.minTitle)

        let minText = 0
        if( props.minText != null && !isNaN(Number(props.minText)) ) minText = Number(props.minText)

        let maxText = 999999
        if( props.maxText != null && !isNaN(Number(props.maxText)) ) maxText = Number(props.maxText)

        let fileRequired = false;
        if( props.fileRequired != null && !isNaN(Number(props.fileRequired)) ) fileRequired = Number(props.fileRequired)

        let data = {
            status : true,
            message: "",
            data :{
                title,
                text,
                file
            }
        }
        if(title.length > maxTitle) {
            data.message = `Title max length is ${maxTitle}`
            data.status = false
        } else if(title.length < minTitle) {
            data.message = `Title min length is ${minTitle}`
            data.status = false
        } else if(text.length > maxText) {
            data.message = `Text max length is ${maxText}`
            data.status = false
        } else if(text.length < minText) {
            data.message = `Text min length is ${minText}`
            data.status = false
        } else if(fileRequired && file == null) {
            data.message = "Please select Photo or Video"
            data.status = false
        }
        props.onSubmit(data)
    }

    return (
        <>
            <div className='create-post-container-wrapp shadow-lg w-full xl:w-[49%] mb-4 aspect-[9/5] flex flex-col'>
                <div className='create-post-container'>
                    <div className='header-icon-container'>
                        <BorderColorRoundedIcon className='small-icon' />
                    </div>
                    <div className='create-post'>
                        <input type="text" placeholder='Subject Title' onChange={handleTitleChange}/>
                    </div>
                </div>
                <div className='post-container !mx-0 flex flex-col grow'>
                    <div className='input'>
                        <div className='header-icon-container !p-0'>
                            <img src={props.userImage} className="user-image w-full h-full" />
                        </div>
                        <input
                            placeholder={`What's on your mind?`}
                            className='new-post-input'
                            onChange={handleTextChange}
                        />
                    </div>
                    <div className='prev flex grow'>
                        {prevType == PREV_IMAGE?(
                            <img src={prevUrl} className={" aspect-[5/4] sm:aspect-[5/5] justify-center"} alt=""/>
                        ):(prevType == PREV_VIDEO?(
                            <video src={prevUrl} controls className=' aspect-[5/4] sm:aspect-[5/5] justify-center object-fill'>
                                <source src={prevUrl} type='video/mp4'/>
                            </video>
                        ):(<div className='flex flex-col-reverse'>
                            {prevType == PREV_AUDIO?(
                                <audio controls style={{width:"100%"}}>
                                    <source src={prevUrl}/>
                                </audio>
                            ):(<></>)}
                        </div>))}
                    </div>
                </div>
                <div className='new-post-buttons'>
                    <div className='new-post-buttons-left'>
                        <div className='new-post-button !mx-0'>
                            <VideocamRoundedIcon className='new-post-icon' />
                            <div className='new-post-text'>Live Video</div>
                        </div>
                        <div className='new-post-button !mx-0 !ml-2' onClick={onClickFileSelect}>
                            <InsertPhotoRoundedIcon className='new-post-icon' />
                            <div className='new-post-text'>Photo/Video</div>
                            <input 
                                type="file" 
                                className='hidden' 
                                onChange={handleFileChange}
                                ref={inputFileRef}
                            />
                        </div>
                    </div>
                    <div className='submit-button' onClick={handleSubmit}>
                        Submit
                    </div>
                </div>
            </div>
        </>
    )
}