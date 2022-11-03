import { useNavigate } from 'react-router-dom';

import filterImage from "src/assets/images/icon/filter.png"
import maskImage from "src/assets/images/icon/mask.png"

export const SubHeader = (props) => {
    const navigate = useNavigate();
    return (
        <div className='sub-header flex flex-col md:flex-row  items-end md:items-center pb-4 w-full sm:px-2 md:px-4'>
            <div className='button-group w-full flex justify-between md:justify-start order-2 md:order-1'>
                <button className={`font-semibold shadow-button rounded-full text-sm md:text-md px-3 mt-2 sm:px-4 md:px-6 py-1 md:py-1.5 mr-1 md:mr-3 ${props.active == 'all' ? "text-primary bg-white" : "text-white bg-button"}`} onClick={() => navigate("/all")}>All Pages</button>
                <button className={`font-semibold shadow-button rounded-full text-sm md:text-md px-3 mt-2 sm:px-4 md:px-6 py-1 md:py-1.5 mr-1 md:mr-3 ${props.active == 'post' ? "text-primary bg-white" : "text-white bg-button"}`} onClick={() => navigate("/posts")}>Posts</button>
                <button className={`font-semibold shadow-button rounded-full text-sm md:text-md px-3 mt-2 sm:px-4 md:px-6 py-1 md:py-1.5 mr-1 md:mr-3 ${props.active == 'picture' ? "text-primary bg-white" : "text-white bg-button"}`} onClick={() => navigate("/pictures")}>Pictures</button>
                <button className={`font-semibold shadow-button rounded-full text-sm md:text-md px-3 mt-2 sm:px-4 md:px-6 py-1 md:py-1.5 mr-1 md:mr-3 ${props.active == 'video' ? "text-primary bg-white" : "text-white bg-button"}`} onClick={() => navigate("/videos")}>Videos</button>
                <button className={`font-semibold shadow-button rounded-full text-sm md:text-md px-3 mt-2 sm:px-4 md:px-6 py-1 md:py-1.5 mr-1 md:mr-3 ${props.active == 'audio' ? "text-primary bg-white" : "text-white bg-button"}`} onClick={() => navigate("/audios")}>Audio</button>
                <button className={`font-semibold shadow-button rounded-full text-sm md:text-md px-3 mt-2 sm:px-4 md:px-6 py-1 md:py-1.5 ${props.active == 'live-stream' ? "text-primary bg-white" : "text-white bg-button"}`} onClick={() => navigate("/live-streams")}>Live Streams</button>
            </div>
            <div className='flex order-1 md:order-2 mb-2 md:mb-0'>
                <img className='w-[18px] md:w-[24px] cursor-pointer' src={filterImage} alt='filter' />
                <img className='w-[18px] md:w-[24px] cursor-pointer ml-4' src={maskImage} alt='alt image' />
            </div>
        </div>
    )
}