import { Link } from "react-router-dom";
import { Footer, Header } from "src/components";
import backImage from '../../assets/images/icon/back.png';
import settingImage from '../../assets/images/icon/follow-setting.png';
import user1Image from '../../assets/images/users/user1.png';
import user2Image from '../../assets/images/users/user2.png';
import user3Image from '../../assets/images/users/user3.png';
import user4Image from '../../assets/images/users/user4.png';
import user5Image from '../../assets/images/users/user5.png';

const FollowsPage = () => {
    return (
        <div>
            <Header />
            <div className="flex flex-col my-10 items-center">
                <div className="w-full px-8">
                    <Link to={'/'} className="">
                        <img className="w-[30px]" src={backImage} alt='back' />
                    </Link>
                </div>

                <div className="flex justify-between items-center w-full px-12 pb-6">
                    <div className="w-[45px]"></div>
                    <h2 className="text-[#565656] text-5xl font-bold">Followers</h2>
                    <img className="w-[45px]" src={settingImage} alt="setting" />
                </div>

                <div className="flex flex-col w-full border-b border-solid border-black">
                    <div className="flex justify-between items-center px-12 py-4 border-t border-solid border-black">
                        <div className="flex items-center">
                            <img className="w-[120px]" src={user1Image} alt='user' />
                            <p className="ml-4 text-5xl font-bold ">Xind_kim </p>
                        </div>
                        <p className="text-[#848484] text-2xl">20 May 2012  </p>
                        <button className="bg-[#848484] text-2xl text-white px-4 py-2">Unfollow</button>
                    </div>
                    <div className="flex justify-between items-center px-12 py-4 border-t border-solid border-black">
                        <div className="flex items-center">
                            <img className="w-[120px]" src={user2Image} alt='user' />
                            <p className="ml-4 text-5xl font-bold ">Yeam_un</p>
                        </div>
                        <p className="text-[#848484] text-2xl">20 May 2012  </p>
                        <button className="bg-[#848484] text-2xl text-white px-4 py-2">Unfollow</button>
                    </div>
                    <div className="flex justify-between items-center px-12 py-4 border-t border-solid border-black">
                        <div className="flex items-center">
                            <img className="w-[120px]" src={user3Image} alt='user' />
                            <p className="ml-4 text-5xl font-bold ">Xind_kim </p>
                        </div>
                        <p className="text-[#848484] text-2xl">20 May 2012  </p>
                        <button className="bg-[#848484] text-2xl text-white px-4 py-2">Unfollow</button>
                    </div>
                    <div className="flex justify-between items-center px-12 py-4 border-t border-solid border-black">
                        <div className="flex items-center">
                            <img className="w-[120px]" src={user4Image} alt='user' />
                            <p className="ml-4 text-5xl font-bold ">Xind_kim </p>
                        </div>
                        <p className="text-[#848484] text-2xl">20 May 2012  </p>
                        <button className="bg-[#848484] text-2xl text-white px-4 py-2">Unfollow</button>
                    </div>
                    <div className="flex justify-between items-center px-12 py-4 border-t border-solid border-black">
                        <div className="flex items-center">
                            <img className="w-[120px]" src={user5Image} alt='user' />
                            <p className="ml-4 text-5xl font-bold ">Xind_kim </p>
                        </div>
                        <p className="text-[#848484] text-2xl">20 May 2012  </p>
                        <button className="bg-[#848484] text-2xl text-white px-4 py-2">Unfollow</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FollowsPage;