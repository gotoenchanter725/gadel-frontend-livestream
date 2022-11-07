import { Footer, Header } from "src/components";
import Gift from "src/components/gift";
import giftImage from '../../assets/images/icon/gifts.png';
import downImage from '../../assets/images/icon/down.png';
import giftMoon from '../../assets/images/icon/moon.png';
import giftStar from '../../assets/images/icon/gift-star.png';
import giftBottle from '../../assets/images/icon/bottle.png';
import giftAngel from '../../assets/images/icon/angel.png';
import giftKiss from '../../assets/images/icon/kiss.png';

const GiftPage = () => {
    return (
        <div>
            <Header />
            <div className="flex flex-col my-10 items-center">
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
                <img className="w-[60px]" src={downImage} alt='down' />
                <div className="flex flex-col items-center">
                    <p className="font-semibold text-center text-black text-xl mb-4">Every Receive Of 10% Reward Of Donate Amount</p>
                    <div className="relative w-[300px] flex flex-col items-center justify-center aspect-[1/1]  bg-[#ff0000ab]">
                        <h5 className="text-5xl font-bold text-white text-center mb-4">10%</h5>
                        <p className="text-2xl font-semibold text-white">Gifts Receive</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default GiftPage;