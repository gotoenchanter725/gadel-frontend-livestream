import { useState } from "react";
import { Footer, Header } from "src/components";
import Gift from "src/components/gift";
import officialImage from "../../assets/images/icon/official.png";
import giftImage from '../../assets/images/icon/gifts.png';
import downImage from '../../assets/images/icon/down.png';
import giftMoon from '../../assets/images/icon/moon.png';
import giftStar from '../../assets/images/icon/gift-star.png';
import giftBottle from '../../assets/images/icon/bottle.png';
import giftAngel from '../../assets/images/icon/angel.png';
import giftKiss from '../../assets/images/icon/kiss.png';

import infrastructureImage from "../../assets/images/icon/gift-infrastructure.png";
import schoolImage from "../../assets/images/icon/gift-school.png";
import politicalImage from "../../assets/images/icon/gift-political.png";
import partyImage from "../../assets/images/icon/gift-party.png";
import houseImage from "../../assets/images/icon/gift-house.png";
import bridgeImage from "../../assets/images/icon/gift-bridge.png";
import policeImage from "../../assets/images/icon/gift-police.png";

const GiftPage = () => {
    const [official, setOfficial] = useState(false);

    return (
        <div>
            <Header />
            <div className="flex flex-col my-10 items-center">
                {
                    official ? (
                        <>
                            <h3 className="w-full flex items-center justify-center shadow-button text-primary font-bold text-3xl py-2">
                                <img className="mr-2" width={'90px'} src={giftImage} alt='gift' />
                                OFFICIAL GIFTS PAGE
                                <img className="ml-2" width={'30px'} src={officialImage} alt='official' />
                            </h3>
                            <div className="flex flex-wrap justify-center p-4">
                                <Gift className='mx-4 md:mx-8 my-8' title='Infrastructure' image={infrastructureImage} price={200} />
                                <Gift className='mx-4 md:mx-8 my-8' title='School' image={schoolImage} price={0.80} />
                                <Gift className='mx-4 md:mx-8 my-8' title='Political' image={politicalImage} price={300} />
                                <Gift className='mx-4 md:mx-8 my-8' title='Parties' image={partyImage} price={100} />
                                <Gift className='mx-4 md:mx-8 my-8' title='House' image={houseImage} price={150} />
                                <Gift className='mx-4 md:mx-8 my-8' title='Bridge' image={bridgeImage} price={30} />
                                <Gift className='mx-4 md:mx-8 my-8' title='Police' image={policeImage} price={200} />
                            </div>
                        </>
                    ) : (
                        <>
                            <h3 className="w-full flex items-center justify-center shadow-button text-primary font-bold text-3xl py-2">
                                <img className="mr-2" width={'90px'} src={giftImage} alt='gift' />
                                GIFTS PAGE
                            </h3>
                            <div className="flex flex-wrap justify-center p-4">
                                <Gift className='mx-4 md:mx-8 my-8' title='Moon' image={giftMoon} price={1} />
                                <Gift className='mx-4 md:mx-8 my-8' title='Star' image={giftStar} price={1} />
                                <Gift className='mx-4 md:mx-8 my-8' title='bottle of wine' image={giftBottle} price={1} />
                                <Gift className='mx-4 md:mx-8 my-8' title='Angel' image={giftAngel} price={1} />
                                <Gift className='mx-4 md:mx-8 my-8' title='Kiss' image={giftKiss} price={1} />
                            </div>
                            {/* <img className="w-[60px]" src={downImage} alt='down' />
                        <div className="flex flex-col items-center">
                            <p className="font-semibold text-center text-black text-xl mb-4">Every Receive Of 10% Reward Of Donate Amount</p>
                            <div className="relative w-[300px] flex flex-col items-center justify-center aspect-[1/1]  bg-[#ff0000ab]">
                                <h5 className="text-5xl font-bold text-white text-center mb-4">10%</h5>
                                <p className="text-2xl font-semibold text-white">Gifts Receive</p>
                            </div>
                        </div> */}
                        </>
                    )
                }
            </div>
            <Footer />
        </div>
    )
}

export default GiftPage;