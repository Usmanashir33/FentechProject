// WithdrawalsPage.jsx
import React, { useContext, useEffect, useState } from "react";
import useExRequest from "../customHooks/ExternalRequestHook";
import { uiContext } from "../customContexts/UiContext";
import PinsPage from "./PinsPage";
import { liveContext } from "../customContexts/LiveContext";
import useCalenderFilterer from "../customHooks/useCalenderFilter";
// import "./WithdrawalsPage.css";
const WithdrawalRequestsPage = () => {
    const {sendExRequest} = useExRequest();
    const {getFormattedDate} = useContext(uiContext);
    const {withdrawalRequests,setWithdrawalRequests} = useContext(liveContext);
    const [pinDialog,setPinDialog] = useState(false);
    const [activeTab, setActiveTab] = useState("Pending");
    const Tabs = ["Pending", "Approved", "Cancelled"];
    const [dateFiltered,setDateFiltered] = useState([]);
    const {CalenderDisplayer, CalenderScreen} = useCalenderFilterer(dateFiltered ,setDateFiltered);
    const [filteredWithdrawals,setFilteredWithdrawals] = useState([]);
    const [trx_selected, setTrxSelected] = useState(null);
    const [showRedPopup, setShowRedPopup] = useState('');

    const [formData, setFormData] = useState({ 
      approval:null,
      trx_id:null,
      reason:'',
    });

    const  toggleInsertPin = () => {
      setPinDialog(!pinDialog)
    }

    const buttonClicked = (e,trx_selected) => {
      setTrxSelected(trx_selected);
      const action = e.target.name.toLowerCase();

      setFormData({ ...formData, approval: action, trx_id: trx_selected.id });
      if (action === "approve") {
        setPinDialog(true);
      }else if (action === "cancel") {
        setPinDialog(true);
      }
    }
    const handleResposne = (data) => {  
      const cancelled_trx = data.data
      if(data.success === "withdrawal cancelled"){
        console.log('data.succes: ', data.success);
        setWithdrawalRequests(withdrawalRequests.map((with_trx) => {
          if (with_trx?.id === cancelled_trx.id) {
            return cancelled_trx;
          }else{
            return with_trx;
          }
        }));
    }else{
      setShowRedPopup(data.success)
      setTimeout(() => {
        setShowRedPopup('')
      }, 1000);
    }
  }

    const handleCancelOrApproveWithdrawal = (pin) => {
      let data = formData
      data.payment_pin = pin
      sendExRequest("/account/withdraw-money-requests/", "POST", data,handleResposne)
    }

    useEffect(() => {
      if(withdrawalRequests){
        setDateFiltered(withdrawalRequests)
        setFilteredWithdrawals(dateFiltered.filter(
          (w) => w.status === activeTab.toLowerCase()
        ))
      }
    },[withdrawalRequests,activeTab,dateFiltered])
    useEffect(() => {
      if(withdrawalRequests){
        setDateFiltered(withdrawalRequests)
        setFilteredWithdrawals(dateFiltered.filter(
          (w) => w.status === activeTab.toLowerCase()
        ))
      }
    },[withdrawalRequests,activeTab,dateFiltered])
    const displayWithdrawals = (data) => {
      setWithdrawalRequests(data.data)
    }
  
    useEffect(() => {
      // fetch pending withdrawals 
      sendExRequest("/account/withdraw-money-requests/", "GET", null,displayWithdrawals )
    },[])

    return (
      <div className="withdrawals-page relative">
      {showRedPopup && <div className="popup red-popup">{showRedPopup}</div>}

        <h1 className="page-title">
            Withdrawals Management
        </h1>
  
        {/* Tabs */}
        <div className="tabs">
          {Tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
  
        {/* Cards */}
        <div className="cards-container">
          {filteredWithdrawals.map((withdrawal) => (
            <div key={withdrawal.id} className="withdrawal-card hover-effect">
                <div  className="justify-between pb4">
                    <span className="name">{withdrawal.user?.username}</span>
                    <span className="amount">{`\u20a6${withdrawal.amount}`}</span>
                </div>
                <div className="flex justify-between">
                    <div className="card-info">
                        <div className="bank">
                          <strong>{withdrawal.withdrawal_bank_name}</strong>
                        </div>
                        <div className="account">
                          <strong>{withdrawal.withdrawal_account_number}</strong>
                        </div>
                        <div className="account">
                          <strong>{withdrawal.withdrawal_account_name}
                          </strong></div>
                        <div className="date">{getFormattedDate(withdrawal.trx_date)}</div>
                    </div>
                    
                    <div className="card-actions">
                      {
                        (activeTab === "Pending") ? 
                        <>
                          <button className="cancel-button" name="cancel" onClick={(e) => {buttonClicked(e,withdrawal)}}>Cancel</button>
                          <button className="approve-button" name="approve" onClick={(e) => {buttonClicked(e,withdrawal)}}>Approve</button>
                        </> : 
                        <div className={`${activeTab.toLowerCase()}-status`}>
                          {activeTab}
                        </div>
                      }
                    </div>
                </div>
                {
                  (activeTab === "Pending") ? 
                  <input type="text" value={formData.reason} name="" id={withdrawal.id} placeholder="write the reason for cancelation"
                  maxLength={200} onChange={(e) => {
                  setFormData({ ...formData, reason: e.target.value });
                  }}/>
                  :
                  <div className="reason">
                    {withdrawal?.note}
                  </div>
                }
            </div>
          ))}
  
          {filteredWithdrawals.length === 0 && (
            <div className="no-withdrawals">No withdrawals found.</div>
          )}
        </div>
        {pinDialog && <PinsPage toggleInsertPin={toggleInsertPin}
            insertPinAction={handleCancelOrApproveWithdrawal}
            title={`${formData.approval === "approve" ? "Approve" : "Cancel"} Withdrawal of ${trx_selected?.amount}`}
      />}
      </div>
    );
  }    
export default WithdrawalRequestsPage;