import { Footer, Header } from "src/components";
import guideImage from "../../assets/images/icon/guide.png";

const GuidePage = () => {
    return (
        <div className="relative">
            <Header type="home" />
            <div className="flex flex-col my-10 items-center">
                <h3 className="w-full flex items-center justify-center shadow-button text-primary font-bold text-3xl py-4">
                    <spam className='max-w-[70%] break-all text-center'>
                        GADEL PARTNER PROGRAM OVERIVEW, ELIGIBILITY & GUIDELINES
                    </spam>
                </h3>
                <img className="w-[300px] mt-4" src={guideImage} alt='guide' />
                <div className="w-full px-8">
                    <div className="p-8 shadow-button rounded-2xl w-full my-4">
                        <h5 className="text-black font-bold">1. Qualification:</h5>
                        <p className="pl-4">
                            a) User must have 3k followers <br />
                            b) User must be 18 years old or older <br />
                            c) if under 14 years old, parent must be responsible for the account. <br />
                            a) User will have to connect their PayPal account to receive payment. <br />
                            b) User will be able to see how many gifts that he receives and how much they worth. <br />
                            c) The company will receive 25% from each gift receive.
                            d) Tax information forms to fill
                        </p>
                    </div>
                    <div className="p-8 shadow-button rounded-2xl w-full my-4">
                        <h5 className="text-black font-bold">2. Guidelines</h5>
                        <p className="pl-4">
                            A User who uses someone else's copyright ©️ property; That’s includes" song, videos, messages and more" without the property owner permission will be asked to pay $3.49.

                            If the copyright owner claims the piece of property, the user account will put on hold or (suspension) to pay $19.99 to remove the suspension. Once the money is paid, the user will be automatically able to use his account again.

                            The property claim fee will distributed as follows:
                            35% for the company for service fee and 65% the property owner.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default GuidePage;