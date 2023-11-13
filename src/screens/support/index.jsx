import { Link } from 'react-router-dom';
import backImage from '../../assets/images/icon/back.png';
import downImage from '../../assets/images/icon/chat-down.png';
import logoImage from '../../assets/logo-header.png';

const Support = () => {
    return (
        <div className="support-container">
            <div className="w-full flex flex-col items-center">
                <div className="w-full px-8 pt-8">
                    <Link to={'/'} className="">
                        <img className="w-[30px]" src={backImage} alt='back' />
                    </Link>
                </div>

                <div className="flex flex-col items-center mt-12 w-full">
                    <img className='h-[100px]' src={logoImage} alt='gadel' />
                    <h1 className='text-3xl font-semibold py-6'>How Can we Help You ?</h1>
                    <div className='w-[80%] flex justify-around'>
                        <div class="relative w-full max-w-[600px]">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-full border border-solid border-black focus:ring-blue-500 focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                        </div>
                    </div>

                    <div className='w-[90%] flex flex-col'>
                        <p className='text-[#555151] py-2 text-lg font-semibold mt-8'>help topics</p>
                        <div className='flex flex-col text-white bg-primary rounded-lg overflow-hidden w-full'>
                            <div className='flex flex-col w-full border-b border-solid border-black'>
                                <div className='flex items-center justify-between px-6 py-4 w-full'>
                                    <p className='text-xl'>How to create your account</p>
                                    <img className='w-[16px] cursor-pointer' src={downImage} alt='down' />
                                </div>
                                {/* <div className='px-6 py-4'>
                                    Responsive search built with Tailwind CSS.
                                    Search is a special input that allows users to define a text field for entering a search string.
                                    Free download.
                                </div> */}
                            </div>
                            <div className='flex flex-col w-full border-b border-solid border-black'>
                                <div className='flex items-center justify-between px-6 py-4 w-full'>
                                    <p className='text-xl'>How to create your account</p>
                                    <img className='w-[16px] cursor-pointer' src={downImage} alt='down' />
                                </div>
                                <div className='px-6 py-4'>
                                    Responsive search built with Tailwind CSS.
                                    Search is a special input that allows users to define a text field for entering a search string.
                                    Free download.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Support;