import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from 'src/services/state/State';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { captureOfficalAcivatePayment } from 'src/actions/accountActions';
import { ScrollToTop } from 'src/components';
import logo from 'src/assets/icon-white.png';
import './ActivateOfficial.scss';
import { StateContext } from '../../App';

const paypalOption = {
  "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
}

function ActivateOfficial() {
  const [, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(1.5);

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
    });
  }

  // const onApproveOrder = (data, actions) => {
  //   console.log(data);
  //   return actions.order.capture().then((details) => {
  //     const name = details.payer.name.given_name;
  //     alert(`Transaction completed by ${name}`);
  //   });
  // }
  const onApproveOrder = (data, actions) => {
    const orderId = data.orderID;
    const token = data.facilitatorAccessToken;
    return captureOfficalAcivatePayment(orderId, token).then((response) => {
      const name = response.payer.name.given_name;
      navigate("/profile")
    }).catch(err => {
      alert(`Payment failture`);
      alert( err.message );
    });
  }

  return (
    <div className="login">
      <div className='flex flex-col w-full pt-[100px] sm:pt-[200px] items-center bg-user-background min-h-[1000px] sm:min-h-[1200px] bg-100% bg-no-repeat pb-5'>
        <img src={logo} className='logo' />
        <div className="pt-[50px] px-4 w-full flex justify-around items-center">
          <div className="right-container rounded-2xl bg-white w-full max-w-[555px] min-w-[300px] overflow-hidden">
            <h4 className='w-full sm:pb-[80px] pb-[50px] sm:pt-[100px] pt-[60px]  font-bolder text-5xl text-center text-white bg-auth-header-background bg-100% my-0'>Activation Official</h4>
            <div className="flex flex-col items-center w-full bg-[#D5D5D5] py-4 sm:py-6 px-4 sm:px-8">
              <label className='text-[20px] mb-4'>{amount} USD</label>
              <div className="w-full flex items-center justify-center mb-3 paypal-container">
                <PayPalScriptProvider options={paypalOption}>
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => onCreateOrder(data, actions)}
                    onApprove={(data, actions) => onApproveOrder(data, actions)}
                  />
                </PayPalScriptProvider>
              </div>
              <div className="have-an-account mb-4">
                <div className='text-button-login' onClick={() => navigate('/profile')}>
                  Goto Profile
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivateOfficial;
