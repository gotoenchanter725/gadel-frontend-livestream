import { Footer, Header } from "src/components";
import { useNavigate } from 'react-router';

import monetizationOn from "../../assets/images/icon/monetization.png";
import tickImage from '../../assets/images/icon/tick.png';

import followers from "../../assets/images/icon/followers.png";
import { useStateValue } from "src/services/state/State";
import { useEffect, useState } from "react";

const MonetizationPage = () => {
    const [state,] = useStateValue();
    const navigate = useNavigate();
    const [userActivated, setUserActivate] = useState(false);
    
    useEffect(() => {
        if( state && state.user ) {
            if( state.user.official ) {
                if(state.user.officialActive){
                    setUserActivate( true );
                }
                else setUserActivate( false );
            }
            else {
                if( state.user.follows.length >= 3000 ) {
                    setUserActivate( true );
                }
                else setUserActivate( false );
            }
        }
    }, [state])

    return (
        <div>
            <Header type="home" />
            <div className="flex flex-col my-10 items-center">
                <h3 className="w-full flex items-center justify-center shadow-button text-primary font-bold text-3xl py-4">
                    Gadel Monetization Page
                </h3>
                <div className="flex flex-col items-center">
                    <img className="w-[400px] my-4" src={monetizationOn} alt={'monetizationOn'} />
                    <h2 className="w-full text-black font-semibold text-3xl py-4 text-center">Grow Your Earning with Gadel</h2>
                    <p className="w-[70%] text-center text-[#636363] text-lg">
                        As a Gadel partner, you'll be eligible to earn money from your videos, get creator support,
                    </p>
                    <p className="w-[70%] text-center text-[#636363] text-lg">
                        To get into the Gadel, Partner Program, you need to meet the criteria listed below. After you submit the application, your channel will get reviewed by Gadel against our <a className="cursor-pointer text-[#0057FF]" href="/">Gadel monetization policies</a>
                    </p>

                    <div className="w-[450px] flex flex-col items-center p-4 shadow-button mt-8 rounded">
                        <img className="w-[100px] h-[100px] mb-4" src={followers} alt={'follower'} />
                        {state.user.official?(
                            <>
                                <p className="text-center text-[#636363] text-lg">{`Your Status - ${state.user.officialActive?'Verified':'unverified'}`}</p>
                                <p className="text-center text-[#636363] text-lg"><span className="text-[#0C0A73]">required</span>&nbsp;-&nbsp;<span className="text-[#129A40]">Verify</span></p>
                            </>
                        ):(
                            <>
                                <p className="text-center text-[#636363] text-lg">{`Your Status - ${state.user.follows.length} followers`}</p>
                                <p className="text-center text-[#636363] text-lg"><span className="text-[#0C0A73]">required</span>&nbsp;-&nbsp;<span className="text-[#129A40]">{`3k followers`}</span></p>
                            </>

                        )}
                    </div>
                    {userActivated ? (
                        <p className="w-full flex items-center justify-center text-[#636363] text-lg mt-8"><img className="h-[30px] mr-2" src={tickImage} alt='tick' />Gadel send you an email when you’re eligible to apply &nbsp;<a className="text-blue-500 cursor-pointer" onClick={(e) => {
                            navigate("/monetization/withdraw");
                        }}>withdraw</a></p>
                    ): (
                        <button className="px-4 py-2.5 text-lg text-white bg-primary rounded-full mt-8">WHEN I'M ELIGIBLE NOTIFY ME</button>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MonetizationPage;