import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mtn from '../assets/icons/mtn.jpg'
import airtel from '../assets/icons/airtel.png'
import etisalat from '../assets/icons/9mobile.png'
import glo from '../assets/icons/9mobile.png'
import { faAngleDown, faMultiply } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../customContexts/AuthContext";

const ConfirmPayment = ({togglePaymentPage,toggleInsertPin,paymentDetails}) => {
    const {
        paymentType,amount,mobileNumber,
        cashBack,providerSelected,note,recipientName
    } = paymentDetails;
    const {currentUser} = useContext(authContext); 

    return ( 
        <div className="confirm-payment-plate ">
                <div className="c-text">Confirm Payment Details </div>
                <div className="cancel-icon">
                    <FontAwesomeIcon  icon={faMultiply} className="" onClick={() => {
                        togglePaymentPage();
                    }}/>
                </div>
                <div className="c-amount">N {amount}</div>

                <div className="b-card">

                    {amount && <div className="flex">
                        <span>Amount </span>
                        <span>{amount??'null'} </span>
                    </div>}

                    {recipientName && <div className="flex">
                        <span>Recipient Name </span>
                        <span>{recipientName??'null'} </span>
                    </div>}
            
                    {mobileNumber && <div className="flex">
                        <span>Mobile Number</span>
                        <span>{mobileNumber}</span>
                    </div>}
                    {providerSelected && <div className="flex">
                        <span>Provider </span>
                        <div className="flex gap-10" >
                            <img src={
                                providerSelected === 'mtn'? mtn :
                                providerSelected === 'airtel'? airtel :
                                providerSelected === 'etisalat'? etisalat : glo
                            } alt="" className="b-selected-image"/>
                            <span> {providerSelected?.toUpperCase()}</span>
                        </div>
                    </div>}
                    { cashBack && <div className="flex">
                        <span>Cashback </span>
                        <span>{cashBack}</span>
                    </div>}
                    { note && <div className="flex">
                        <span>Payment Note </span>
                        <span>{note}</span>
                    </div>}
                </div>

                <div className="user-points flex">
                    <span>Cashacks</span>
                    <div>
                        <span>N {cashBack} availale</span>
                        <input type="checkbox" name="" id="" className="user-points-check" defaultChecked />
                    </div>
                </div>
                <div className="payment-method flex">
                    <span>Payment Method </span>
                    <span className='see-all-font'>  all  </span>
                </div>
                <div className=" select-account flex">
                    <div>
                        <span><FontAwesomeIcon  icon={faAngleDown} className=" icon-color"/> </span>
                        <span>Balance {`(N ${currentUser?.account?.account_balance})`}</span>
                    </div>
                    <div className="tick-icon">gd</div>
                </div>
                <button type="button" className="confirm-pay-btn" 
                    onClick={(e) => {toggleInsertPin()}}
                >Confirmed Details </button>
         </div>
    );
}
 
export default ConfirmPayment;