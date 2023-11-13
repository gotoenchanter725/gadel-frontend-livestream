import React, { useEffect } from "react";
import { useState } from "react";
import { settings } from "src/services/Settings";
import GiftSendIcon from "./../../assets/images/gift-send.png";

const GiftSend = ({ senderGifts = [], postGifts = [], title = '', className, onSend}) => {
    const [selected, setSelected] = useState(-1);
    const handleClickSend = ( ) => {
        if( selected >= 0 && selected < senderGifts.length ) {
            onSend( senderGifts[selected].id );
        }
    }
    return (
        <div className={className+" p-4 flex space-x-2 justify-between"}>
            <div className="w-[40%] max-w-[40%] p-1 rounded-lg grow overflow-x-auto overflow-y-auto scrollbar-w-[2px] scrollbar-thin scroll-smooth scrollbar-thumb-slate-700 border-[1px] scrollbar-thumb-rounded-lg border-gray-200">
                {senderGifts.map((gift, index) => {
                    return (
                        <div key={index} className={`p-1 cursor-pointer rounded-md border-b-[1px]${selected == index ? " bg-red-300 text-gray-50" : ''}`} onClick={ () => setSelected(index) }>
                            <div className="flex w-full justify-center">
                                <img src={`${settings.sourceUrl}/gift/${gift.icon}`} className="w-[45px] h-[45px] rounded-lg" alt="" />
                            </div>
                            <div className="text-sm w-full text-center">{gift.title} {gift.price}$</div>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-col justify-center">
                <img src={GiftSendIcon} alt="" className="w-[35px] h-[35px] cursor-pointer hover:w-[30px] hover:h-[30px] active:w-[35px] active:h-[35px]" onClick={handleClickSend}/>
            </div>
            <div 
                className={`w-[40%] p-1 max-w-[40%] rounded-lg grow overflow-x-auto overflow-y-auto scrollbar-w-[2px] scrollbar-thin scroll-smooth scrollbar-thumb-slate-700 border-[1px] border-gray-200`}
            >
                {postGifts.map((gift, index) => {
                    return (
                        <div key={index} className={`p-1 cursor-pointer rounded-md border-b-[1px]`}>
                            <div className="flex w-full justify-center">
                                <img src={`${settings.sourceUrl}/gift/${gift.icon}`} className="w-[45px] h-[45px] rounded-lg" alt="" />
                            </div>
                            <div className="text-sm w-full text-center">{gift.title} {gift.price}$</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GiftSend;