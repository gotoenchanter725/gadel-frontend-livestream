import React, { useEffect, useState } from "react";
import { Footer, Header } from "src/components";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Gift from "src/components/Gift";
import officialImage from "../../assets/images/icon/official.png";
import giftImage from '../../assets/images/icon/gifts.png';

import { captureGiftPayment, getGifts } from '../../actions/accountActions';
import { settings } from "src/services/Settings";

const paypalOption = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
}

const globalGifts = [];

const PayPalCheckout = ( { price, gift } ) => {
    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: price,
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data, actions) => {
        const orderId = data.orderID;
        const token = data.facilitatorAccessToken;
        return captureGiftPayment(orderId, token, gift).then((response) => {
            const name = response.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
        }).catch(err => {
            alert(`Payment failture`);
            console.log(err)
        });
    }

    return (
        <PayPalScriptProvider options={paypalOption}>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => onCreateOrder(data, actions)}
                onApprove={(data, actions) => onApproveOrder(data, actions)}
            />
        </PayPalScriptProvider>
    )
}

const GiftPage = () => {
    const [official, setOfficial] = useState(false);
    const [giftIndex, setGiftIndex] = useState( -1 );
    const [gifts, setGifts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getGifts(false).then((response) => {
            setGifts([...response.data.gifts]);
            setOfficial(response.data.official == true || response.data.official == "true");
            setError("");
        }).catch(err => {
            setError(err.response.data.message || err.message);
        })
    }, [])

    return (
        <div>
            <Header type="home" />
            <div className="flex flex-col my-10 items-center">
                {error.length ? (
                    <h3>{error}</h3>
                ):<></>}
    
                <h3 className="w-full flex items-center justify-center shadow-button text-primary font-bold text-3xl py-2">
                    <img className="mr-2" width={'90px'} src={giftImage} alt='gift' />
                    {!official ?  'GIFTS PAGE' : 'OFFICIAL GIFTS PAGE'}
                    {official && <img className="ml-2" width={'30px'} src={officialImage} alt='official' />}
                </h3>
                <div className="flex flex-wrap justify-center">
                    {
                        gifts.map((item, index) => {
                            return <Gift className={`mx-4 md:mx-8 my-8 cursor-pointer ${giftIndex==index?'bg-red-300':''} hover:bg-red-200`} title={item.title} image={`${settings.sourceUrl}/gift/${item.icon}`} price={item.price} onClick={() => setGiftIndex(index)} key={index} />
                        })
                    }
                </div>
            
                <div className="paypal-container my-8 w-full md:w-[300px] flex justify-center">
                    {(giftIndex < gifts.length && giftIndex > -1) && (
                        <PayPalCheckout price={gifts[giftIndex].price} gift={gifts[giftIndex]._id}/>
                    )}
                </div>
                    
            </div>
            <Footer />
        </div>
    )
}

export default GiftPage;