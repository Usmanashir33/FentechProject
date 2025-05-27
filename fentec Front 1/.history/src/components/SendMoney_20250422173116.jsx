// SendMoneyPage.js
import React, { useContext, useEffect, useRef, useState } from "react";
import "./SendMoneyPage.css";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faHistory, faMultiply, faUser } from "@fortawesome/free-solid-svg-icons";
import ConfirmPayment from "./ConfirmPayment";
import PinsPage from "./PinsPage";
import TransectionStatus from "./TransectionStatus";
import useSearchRequest from "../customHooks/SearchRequest";
import useSendTransection from "../customHooks/SendTransection";
import { authContext } from "../customContexts/AuthContext";
import { liveContext } from "../customContexts/LiveContext";

const SendMoneyPage = () => {
  const RAcco = useRef();
  const RAccoHis = useRef();
  const {sendSearchRequest} = useSearchRequest();
  const {sendTransectionRequest} = useSendTransection();
  const [transectionStatus,setTransectionStatus] = useState('');
  const {currentUser,setCurrentUser} = useContext(authContext);
  const {transections,setTransections} = useContext(liveContext);

  const [validRecipient,setValidRecipient] = useState(false) ;
  const [receiver,setReceiver] = useState(null);
  const [showPopup, setShowPopup] = useState('');
  const [confirmPayment,setConfirmPayment] = useState(false);
  const [insertPins,setinsertPins] = useState(false);

  const [formData, setFormData] = useState({
    senderName: "",
    recipientName: "",
    amount: "",
    note: "",
  });

  const resetPayment = () => {
    setConfirmPayment();
    setinsertPins();
  }
  const TransectionDetails = {
    recipient:formData.recipientName,
    status:transectionStatus,
    amount:formData.amount,
    note:formData.note
  }

  const toggleConfirmPayment = (e) => {
    setConfirmPayment(!confirmPayment);
  }
  const toggleInsertPin = (e) => {
      setinsertPins(!insertPins);
  }
 
  const getPaymentStatus = (data) => {
    if (data.error){
      setShowPopup(data.error);
    }else{
      setTransectionStatus('pending')
      resetPayment();
      const {trx,user} = data.data;
      setCurrentUser(user);
      setTransections([trx,...transections]);
      setTimeout(() => {
        setTransectionStatus('success');
      }, 1500);
    }
  }
  const initiatePayment = (payment_pins) => {
    let url = "/account/send-money/";
    let data = {
      amount: formData.amount,
      note: formData.note, 
      recipient: receiver?.id,
      payment_pin: payment_pins,
    };
    sendTransectionRequest(url,"POST",data,getPaymentStatus,true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.amount > currentUser.account.account_balance){
      setShowPopup('Insufficient Balance !')
      return
    }
    if (receiver.username === currentUser.username){
      setShowPopup('You can not make transfer to your self!')
      return
    }
    if (!validRecipient){
      setShowPopup('Invalid Recipient')
      return
    }
    toggleConfirmPayment()
  };

  const checkValidRecipient = (data) => {
    if (!data.success){ 
      setValidRecipient(true)
      setReceiver(data)
    } else {
      setValidRecipient(false)
      setReceiver(null)
    }
  }

  useEffect(() => {
    if (!transectionStatus){
      setValidRecipient(false);
      setReceiver(null);
      setFormData({
        senderName: "",
        recipientName: "",
        amount: "",
        note: "",
      });
    }
  },[transectionStatus])
 
  useEffect(() => {
    if (formData.recipientName.length > 4){
      let search = formData.recipientName
      const url = "/authuser/search-user/"
      sendSearchRequest(url,"POST",{search},checkValidRecipient)
    }
  },[formData.recipientName])

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup('');
      }, 2000);
      return () => clearTimeout(timer); // Clean up
    }
  }, [showPopup]);

  return (
    <div className="send-money-page relative">
      {showPopup && <div className="popup red-popup">{showPopup}</div>}

      {transectionStatus && 
          <TransectionStatus TransectionDetails = {TransectionDetails}
          setTransectionStatus ={setTransectionStatus}
      />}
      
      <div className="form-container relative">
        <div className="transection-header header-send">
                Send Money
            <div className="t-sort-buttons">
            {<FontAwesomeIcon icon={faHistory} className="end-input"  onClick={(e) => {
                RAccoHis.current.classList.toggle('hidden');
            }}/>}
            </div>
        </div>

        {/* drop down  */}
        <div className="a-dropdown RAccoHis custom-overflow  hidden"id='' ref={RAccoHis}>
                <div className="d-header">
                    <div className="name">Send Money History</div>
                    <div className="c-icon" onClick={(e) => {
                                    RAccoHis.current.classList.toggle('hidden')
                    }}>
                    <FontAwesomeIcon icon={faMultiply} className="v-icon"/>
                    </div>
                </div>
                <div className="d-body ">
                    <div className="navs ">
                        <div className="nav d-nav justify-end">
                            <span className="justify-end">
                                <FontAwesomeIcon icon={faUser} className="nav-icon"/>
                                <span> 081 6699 7172</span>
                            </span>
                             <FontAwesomeIcon icon={faMultiply} className="v-icon"/>
                        </div>
                        <div className="nav d-nav justify-end">
                            <span className="justify-end">
                                <FontAwesomeIcon icon={faUser} className="nav-icon"/>
                                <span> 081 6699 7172</span>
                            </span>
                             <FontAwesomeIcon icon={faMultiply} className="v-icon"/>
                        </div>
                       
                    </div>
                </div>
        </div>

        {/* <h1>Send Money</h1> */}
        <form onSubmit={handleSubmit}>
          <div className="form-group relative ">
            <label htmlFor="recipientName">
            {validRecipient && <FontAwesomeIcon icon={faCheckCircle} className="icon-color"/>}
                {(!receiver && !validRecipient ) && <span>Recipient's Name</span>}
                {receiver && <span>{receiver?.username}</span> }
            </label>
            <span className="relative">
            <input
              type="text"
              id="recipientName"
              maxLength={40}
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              placeholder="Enter recipient's ( ID,phone Number or Email )"
              required
            />
            {<FontAwesomeIcon icon={faBook} className="icon-color end-input"  onClick={(e) => {
                RAcco.current.classList.toggle('hidden')
            }}/>}
            </span>

            {/* dropdown  */}
            <div className="a-dropdown custom-overflow  hidden"id='' ref={RAcco}>
                            <div className="d-header">
                                <div className="name">Recent Recipients</div>
                                <div className="c-icon" onClick={(e) => {
                                    RAcco.current.classList.toggle('hidden')
                                }}>
                                <FontAwesomeIcon icon={faMultiply} className="v-icon"/>
                                </div>
                            </div>
                            <div className="d-body ">
                                <div className="navs ">
                                    <div className="nav d-nav justify-end">
                                        <span className="justify-end">
                                            <FontAwesomeIcon icon={faUser} className="nav-icon"/>
                                            <span> 081 6699 7172</span>
                                        </span>
                                         <FontAwesomeIcon icon={faMultiply} className="v-icon"/>
                                    </div>
                                    <div className="nav d-nav justify-end">
                                        <span className="justify-end">
                                            <FontAwesomeIcon icon={faUser} className="nav-icon"/>
                                            <span> 081 6699 7172</span>
                                        </span>
                                         <FontAwesomeIcon icon={faMultiply} className="v-icon"/>
                                    </div>
                                   
                                </div>
                            </div>
            </div>

          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount (₦)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount (min 50)"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="note">Payment Note (Optional)</label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Add a note for this transaction"
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">Send Money</button>
        </form>
      </div>
      
       {/* confirm payment  */}
       {confirmPayment && <ConfirmPayment 
                togglePaymentPage = {toggleConfirmPayment} 
                toggleInsertPin={toggleInsertPin} 
                paymentDetails={formData}
            />}

        {/* insert pins here */}
        {insertPins && <PinsPage 
            toggleInsertPin={toggleInsertPin}
            insertPinAction={initiatePayment}
        />}
    </div>
  );
};

export default SendMoneyPage;
