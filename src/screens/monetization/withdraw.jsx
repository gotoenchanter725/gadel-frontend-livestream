import React, { useEffect, useState } from "react";
import { Footer, Header } from "src/components";
import { useNavigate } from "react-router";
import { useStateValue } from "src/services/state/State";

import monetizationOn from "../../assets/images/icon/monetization.png";
import followers from "../../assets/images/icon/followers.png";
import tickImage from '../../assets/images/icon/tick.png';
import { captureOfficalAcivatePayment, getUserGifts } from "src/actions/accountActions";
import { settings } from "src/services/Settings";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export const MIN_WITHDRAW_AMOUNT = 50;

const MonetizationPage = () => {
    const [state,] = useStateValue();
    const navigate = useNavigate();
    const [gifts, setGifts] = useState([]);
    const [selects, setSelects] = useState([]);
    const [total, setTotal] = useState(0);
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

    const paypalOption = {
        "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
    }

    const toggleSelect = (index) => {
        const i = selects.indexOf(index);
        if (i < 0) selects.push(index);
        else selects.splice(i, 1);
        setSelects([...selects]);
        let sum = 0;
        selects.map((id) => { sum += gifts[id].price });
        setTotal(sum);
    }


    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: total,
                    },
                },
            ],
        });
    }

    const onApproveOrder = async (data, actions) => {
        const orderId = data.orderID;
        const token = data.facilitatorAccessToken;
        try {
            const response = await captureOfficalAcivatePayment(orderId, token);
            const name = response.payer.name.given_name;
            navigate("/profile");
        } catch (err) {
            alert(`Payment failture`);
            alert(err.message);
        }
    }

    useEffect(() => {
        getUserGifts().then((response) => {
            setGifts([...response.data.gifts]);
            setSelects([]);
        }).catch((err) => {
            alert(err.message);
        })
    }, []);

    return (
        <div>
            <Header />
            <div className="flex flex-col my-10 items-center">
                <h3 className="w-full flex items-center justify-center shadow-button text-primary font-bold text-3xl py-4">
                    Gadel Monetization Page
                </h3>
                <div className="py-5">
                    <h2 className="w-full text-center text-3xl"><span className="text-blue-500">Total</span> : <span className="text-red-400">{total}</span> $</h2>
                    <div className="flex items-center space-x-5 flex-wrap justify-center p-8">
                        {(gifts.map((gift, index) => {
                            return (
                                <div key={index} className={`p-1 cursor-pointer rounded-md border-b-[1px] mb-5${selects.indexOf(index) > -1 ? " bg-red-300 text-gray-50" : ''}`} onClick={() => toggleSelect(index)}>
                                    <div className="flex w-full justify-center">
                                        <img src={`${settings.sourceUrl}/gift/${gift.icon}`} className="w-[65px] h-[65px] rounded-lg" alt="" />
                                    </div>
                                    <div className="text-lg w-full text-center">{gift.title} {gift.price}$</div>
                                </div>
                            )
                        }))}
                    </div>
                    {state.user.official ? (
                        state.user.officialActive ? (
                            <></>
                        ) : (
                            <div>Please verify official <a className="text-blue-300" onClick={(e) => navigate("/activate-official")}>verify now</a></div>
                        )
                    ) : (
                        state.user.follows.length < 3000 ? (
                            <div>You have follows less than 3000. You can't withdraw now.</div>
                        ) : (<></>)
                    )}

                    { (userActivated && total < MIN_WITHDRAW_AMOUNT) ? (
                        <h2 className="w-full text-center text-3xl">Minimum withdraw amount : <span className="text-red-400">{MIN_WITHDRAW_AMOUNT}</span> $</h2>
                    ) : (
                        <div className="paypal-container">
                            <PayPalScriptProvider options={paypalOption}>
                                <PayPalButtons
                                    style={{ layout: "vertical" }}
                                    createOrder={(data, actions) => onCreateOrder(data, actions)}
                                    onApprove={(data, actions) => onApproveOrder(data, actions)}
                                />
                            </PayPalScriptProvider>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MonetizationPage;