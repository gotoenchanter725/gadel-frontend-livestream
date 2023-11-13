import React, { useState } from 'react';
import logo from 'src/assets/icon-white.png';

function PaymentScreen() {
    return (
        <div className="payment-container">
            <div className='flex flex-col w-full pt-[20px] sm:pt-[40px] items-center bg-user-background h-[1000px] sm:h-[1200px] bg-100% bg-no-repeat'>
                <img className='w-[250px] rounded-full my-8' src={logo} />
                <div className="pt-[20px] px-4 w-full flex justify-around items-center">
                    <div className='w-full max-w-[800px] flex flex-col items-center bg-white'>
                        <h1 className='w-full py-6 text-center text-primary text-3xl font-bold border-b border-solid border-black'>Penalty Fee Information</h1>
                        <div className='flex flex-col w-full p-4 border-b border-solid border-black'>
                            <p className='w-full text-center font-bold py-2 underline'>Payment Type</p>
                            <div className='flex justify-center items-center py-2'>
                                <input className='w-[20px] h-[20px] mr-1.5' type='checkbox' id='credit' />
                                <label className='mr-4' htmlFor='credit'>Credit Card</label>
                                <input className='w-[20px] h-[20px] mr-1.5' type='checkbox' id='dabit' />
                                <label className='mr-4' htmlFor='dabit'>Dabit Card</label>
                                <input className='w-[20px] h-[20px] mr-1.5' type='checkbox' id='paypal' />
                                <label htmlFor='paypal'>PayPal</label>
                            </div>
                        </div>
                        <div className='w-full max-w-[400px] flex flex-col items-center py-6'>
                            <div className='w-full flex flex-col mb-6'>
                                <div className='flex items-center'>
                                    <label className='w-[120px]'>Type</label>
                                    <select className='w-[200px] border border-solid border-primary rounded px-2 py-1'>
                                        <option value={''}></option>
                                        <option value={'visa'}>Visa</option>
                                        <option value={'master'}>MasterCard</option>
                                    </select>
                                </div>
                                <div className='flex items-center mt-4'>
                                    <label htmlFor='card' className='w-[120px]'>Card Number</label>
                                    <input className='w-[200px] border border-solid border-primary rounded px-2 py-1' type='text' id='card' />
                                </div>
                                <div className='flex items-center mt-4'>
                                    <label htmlFor='name' className='w-[120px]'>Name</label>
                                    <input className='w-[200px] border border-solid border-primary rounded px-2 py-1' type='text' id='name' />
                                </div>
                                <div className='flex items-center mt-4'>
                                    <label className='w-[120px]'>Valide Untill</label>
                                    <input className='w-[80px] border border-solid border-primary rounded px-2 py-1 mr-2' type='number' id='number' />
                                    <input className='w-[80px] border border-solid border-primary rounded px-2 py-1' type='number' id='number' />
                                </div>
                            </div>

                            <div className='flex flex-col w-full max-w-[400px]'>
                                <h3 className='w-full text-center py-2 text-2xl font-semibold'>Pay with PayPal</h3>
                                <p className='py-2'></p>
                                <input className='w-full border border-solid border-black rounded px-2 py-1 my-4' placeholder='Email or mobile number' />
                                <span className='text-blue-500'>Forgot Email</span>
                                <button className='w-full bg-primary text-white p-2 mt-2'>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentScreen;
