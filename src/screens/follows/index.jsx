import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getFollowsInfo } from "src/actions/accountActions";
import { Footer, Header } from "src/components";
import { settings } from "src/services/Settings";
import backImage from '../../assets/images/icon/back.png';
import settingImage from '../../assets/images/icon/follow-setting.png';
import user1Image from '../../assets/images/users/user1.png';
import user2Image from '../../assets/images/users/user2.png';
import user3Image from '../../assets/images/users/user3.png';
import user4Image from '../../assets/images/users/user4.png';
import user5Image from '../../assets/images/users/user5.png';

const FollowsPage = () => {

    const { userid } = useParams();
    const [follows, setFollows] = useState( [] );
    const navigate = useNavigate();

    useEffect( () => {
        if( userid && userid.length == 24 ) {
            getFollowsInfo( userid ).then( response => {
                setFollows( [...response.data.follows] );
            }).catch( err => {
                alert( err.response.data.message );
            });
        }
        else {
            navigate('/');
        }
    }, [userid])

    return (
        <div>
            <Header />
            <div className="flex flex-col my-10 items-center">
                <div className="w-full px-8">
                    <div onClick={() => window.history.back()}>
                        <img className="w-[30px]" src={backImage} alt='back' />
                    </div>
                </div>

                <div className="flex justify-between items-center w-full px-12 pb-6">
                    <div className="w-[45px]"></div>
                    <h2 className="text-[#565656] text-5xl font-bold">Followers</h2>
                    <img className="w-[45px]" src={settingImage} alt="setting" />
                </div>

                <div className="flex flex-col w-full border-b border-solid border-black">
                    {follows.map((follow, index) => {
                        return (
                            <div className="flex justify-between items-center px-12 py-4 border-t border-solid border-black">
                                <div className="flex items-center">
                                    <img className="w-[120px] h-[120px] rounded-full" src={`${settings.sourceUrl}/avatar/${follow._id}`} alt='user' />
                                    <p className="ml-4 text-5xl font-bold ">{follow.username}</p>
                                </div>
                                <p className="text-[#848484] text-2xl">{follow.data}</p>
                                <button className="bg-[#cf1d1d] text-2xl text-white px-4 py-2" onClick={() => navigate(`/profile/${follow._id}/follows`)}>Followers</button>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FollowsPage;