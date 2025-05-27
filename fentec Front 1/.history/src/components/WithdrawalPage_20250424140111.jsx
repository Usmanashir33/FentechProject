import React, { use, useContext, useEffect, useRef, useState } from "react";
import "./WithdrawalPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEdit, faHistory, faMultiply, faUser } from "@fortawesome/free-solid-svg-icons";
import TransectionStatus from "./TransectionStatus";
import ConfirmTransperDetails from "./ConfirmTransperDetails";
import SetBankDialog from "./SetBankDialog";
import PinsPage from "./PinsPage";
import useExRequest from "../customHooks/ExternalRequestHook";
import BankAccountCard from "./AvailableBankCard";
import TransectionCard from "./TransectionCard";
import { liveContext } from "../customContexts/LiveContext";
import { authContext } from "../customContexts/AuthContext";

const WithdrawalPage = () => {
  const RAccoHis = useRef(null);
  const withdrawBtnRef = useRef(null);
  const {transections,sendRequest} = useContext(liveContext);
  const {currentUser} = useContext(authContext);
  const [showPopup, setShowPopup] = useState('');
  const [showRedPopup, setShowRedPopup] = useState('');
  const [amount,setAmount] = useState('');
  const [transectionStatus,setTransectionStatus] = useState('success');
  const [dialog, setDialog] = useState(false);
  const [newBankData, setNewBankData] = useState({});
  const [myBanks, setMyBanks] = useState([]);
  const [selectedBank,setSelectedBank] = useState();
  const [delitingAccId,setDeletingAccId] = useState(null);
  const [withdrawalDetails, setWithdrawalDetails] = useState({amount:'', bank: {}});
  const [confirmPaymentDialog, setConfirmPaymentDialog] = useState(false);
  const {sendExRequest} = useExRequest();
  const {sendTransectionRequest} = useSendTransection();

  const [withdrawalTrx,setWithdrawalTrx] = useState([])
  const TransectionDetails = {
    recipient:"WITHDRAWAL",
    status:transectionStatus,
    amount:amount,
  }
  const [pinDialog, setPinDialog] = useState(false); // for adding account
  const [pinDialog2, setPinDialog2] = useState(false); // for deleting account
  const [pinDialog3, setPinDialog3] = useState(false); // for payment Validation
  
  const toggleInsertPin = () => {
      setPinDialog(!pinDialog);
  }

  const toggleInsertPin2 = () => {
      setPinDialog2(!pinDialog2);
  }

  const toggleInsertPin3 = () => {
      setPinDialog3(!pinDialog3);
  }

  const toggleConfirmPaymentDialog = () => {
    setConfirmPaymentDialog(!confirmPaymentDialog);
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAmount(value)
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    if (!selectedBank) {
      setShowRedPopup("Please select Bank to proceed or add new one.");
      return;
    }
    if (amount < 100 || amount > 5000) {
      setShowRedPopup("Amount must be between 100 and 5000.");
      return;
    }
    if (Number(amount) > Number(currentUser.account.account_balance)) {
      console.log(' currentUser bal',  currentUser.account.account_balance);
      console.log('amount: ', amount);
      setShowRedPopup("Insufficient balance.");
      return;
    }
    // Handle withdrawal submission logic here
    setWithdrawalDetails((prev) => ({
        ...prev,
        amount: amount,
        bank: selectedBank,
    }));
    setConfirmPaymentDialog(true);
  };

  const handleDeleteAccResponse = (data) => {
    setShowPopup("bank deleted successfully ");
    setMyBanks(myBanks.filter((item) => item.id !== data.id));
    if (selectedBank.id === data.id) {
      setSelectedBank(null);
    }
  }

  const setDeleteAcc = (id) => {
    setPinDialog2(true);
    setDeletingAccId(id);
  }

  const handledeletingAccountId = (payment_pin) => {
    let formdata = {
      'payment_pin': payment_pin,
    }
    const url = `/account/delete_withdrowal_acc/${delitingAccId}/`
    sendExRequest(url,"DELETE",formdata,handleDeleteAccResponse)
  }

  const handleSaveBankResponse = (data) => {
      setShowPopup("New bank added successfully ");
      setMyBanks([ data.new_account,...myBanks]);
      setNewBankData({});
      setSelectedBank(data?.new_account); 
      setDialog(false);
      setTimeout(() => setShowPopup(''), 2000);
  }

  const handleSaveNewAccount = (pwsds) => { 
    const url = '/account/setting_withdrowal_acc/'
    let formdata = newBankData
    formdata['payment_pin'] = pwsds;
    formdata['action'] = 'saveBank';
    sendExRequest(url,"POST",formdata,handleSaveBankResponse)
  };

  const getWithdrawalStatus = (data) => { 
    console.log('data: ', data);
  }

  const handlewithdraw = (payment_pin) => { 
    setConfirmPaymentDialog(false);
    let url = "/account/withdraw-money/";
    let data = {
      amount: amount,
      payment_pin: payment_pins,
      account_number: selectedBank.account_number,
      bank_name: selectedBank.bank_name,
    };
    sendTransectionRequest(url,"POST",data,getWithdrawalStatus,true)
  }

  const grabBankData = (data) => {
    setMyBanks(data?.accounts);
  }

  const dateSelected = (e) => {
      let range = new Date(e.target.value);
      let month  = range.getMonth()
      let year = range.getFullYear()
      const filteredTrx = transections?.filter((trx) => {
        let trxYear = new Date(trx.trx_date).getFullYear();
        let trxMonth = new Date(trx.trx_date).getMonth();
        if (trxYear === year && trxMonth === month && trx.transaction_type === "Withdraw"){
          return trx
        }
      })
      if (!e.target.value){ // clear 
        setWithdrawalTrx(transections?.filter((trx) => trx.transaction_type=="Withdraw"))
      }else{
        setWithdrawalTrx(filteredTrx);
      }
    }
  
    useEffect(() => {
      setWithdrawalTrx(transections?.filter((trx) => trx.transaction_type=="Withdraw"))
    },[transections])
    useEffect(() => {
      sendRequest('/account/trxs/','GET','')
    },[])

  useEffect(() => {
    // tetch banks data
    const url = '/account/getting_withdrowal_acc/'
    sendExRequest(url,"GET",null,grabBankData)
  },[])

  useEffect(()  => {
    if (showPopup || showRedPopup) {
      const timer = setTimeout(() => {
        setShowPopup('');
        setShowRedPopup();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showPopup,showRedPopup]);

  return (
    <div className="withdrawal-container relative">
      {showRedPopup && <div className="popup red-popup">{showRedPopup}</div>}
      {transectionStatus && 
            <TransectionStatus TransectionDetails={TransectionDetails}
            setTransectionStatus ={setTransectionStatus}
        />}
        
        <div className="transection-header header-send" style={{color:'white',borderRadius:'5px'}}>
            <h2 style={{color:'white'}}>Withdrawal Page</h2>
            <div className="t-sort-buttons">
            {<FontAwesomeIcon icon={faHistory} className="end-input"  onClick={(e) => {
                RAccoHis.current.classList.toggle('hidden');
            }}/>}
            </div>
        </div>
          {dialog && <SetBankDialog 
              setDialog = {setDialog}
              toggleInsertPin={toggleInsertPin}
              dialogAction={setNewBankData}
          />}
          
        <div className="a-dropdown RAccoHis custom-overflow  hidden"
            id='' ref={RAccoHis} style={{top:'15%'}}>
                <div className="d-header">
                    <div className="name">Withdrawal History</div>
                    <label htmlFor="dateFilter">At :    
                      <input type="month"  id="depoTrxFilter" className=" dateFilter"
                        onChange={(e) => {dateSelected(e)}}
                      />
                    </label>
                    <div className="c-icon" onClick={(e) => {
                                    RAccoHis.current.classList.toggle('hidden')
                    }}>
                    <FontAwesomeIcon icon={faMultiply} className="v-icon"/>
                    </div>
                </div>
                <div className="d-body ">
                    <div className="navs ">
                      {withdrawalTrx && withdrawalTrx?.length > 0 ? (
                                withdrawalTrx.map((trx) => (
                                <TransectionCard trx ={trx}/>
                                ))
                              ) : (
                                <div className="empty-notification">
                                  <p>No Withdrawal Found Yet!</p>
                                </div>
                          )}
                    </div>
                </div>
        </div>
      <form onSubmit={handleSubmit} className="withdrawal-form">
        <div className="form-group">
          <label htmlFor="amount">Withdrawal Amount</label>
          <input
            required
            type="number"
            id="amount"
            name="amount"
            value={amount}
            maxLength={5}
            minLength={3}
            onChange={handleInputChange}
            placeholder="Enter amount (100 - 5000)"
          />
        </div>
        {selectedBank && <div className="selectedBank relative">
          <span>
            <FontAwesomeIcon icon={faCheckCircle} size="lg" color="3498db" />
          </span>
          <BankAccountCard  account={selectedBank} isSelected={true}/>
        </div>}
        <button type="submit" className="submit-btn" ref={withdrawBtnRef}  >Withdraw</button>
      </form>

      <div className="restore-info-section custom-overflow">

        <h3>Select From Available Accounts <FontAwesomeIcon icon={faEdit} className="icon-color" onClick={() => {setDialog(true)}}/></h3>
        {myBanks.length < 1 && <p>{"No Available Accounts"}</p>}
        {/* <BankAccountCard account={accountData} /> */}
        {myBanks.length > 0 && myBanks.map((account, index) => (
          <div  onClick={() => {
            setSelectedBank(account);
          }}>
            <BankAccountCard key={index} account={account} actionFunc={setDeleteAcc} />
          </div>
        )) } 
      </div>
      { pinDialog && <PinsPage toggleInsertPin={toggleInsertPin}
            insertPinAction={handleSaveNewAccount}
      />}
      {/* for delting acco8nt  */}
      { pinDialog2 && <PinsPage toggleInsertPin={toggleInsertPin2}
            insertPinAction={handledeletingAccountId}
      />}
      {confirmPaymentDialog &&  <ConfirmTransperDetails
        togglePaymentPage ={toggleConfirmPaymentDialog} 
        toggleInsertPin={toggleInsertPin3}
        paymentDetails={withdrawalDetails}/>}
      {showPopup && <div className="popup">{showPopup}</div>}

      {/* for withdrawal  */}
      {pinDialog3 && <PinsPage toggleInsertPin={toggleInsertPin3}
            insertPinAction={handlewithdraw}
      />}
    </div>
  );
};

export default WithdrawalPage;
