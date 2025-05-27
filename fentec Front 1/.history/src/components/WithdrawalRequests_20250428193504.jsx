// WithdrawalsPage.jsx
import React, { useContext, useEffect, useState } from "react";
import useExRequest from "../customHooks/ExternalRequestHook";
import { uiContext } from "../customContexts/UiContext";
import PinsPage from "./PinsPage";
// import "./WithdrawalsPage.css";
const WithdrawalRequestsPage = () => {
    const {sendExRequest} = useExRequest();
    const {getFormattedDate} = useContext(uiContext);;
    const [pinDialog,setPinDialog] = useState(false);
    const [activeTab, setActiveTab] = useState("Pending");
    const Tabs = ["Pending", "Approved", "Cancelled"];
    const [mockWithdrawals,setMockithdrawals] = useState([]);
      
    const filteredWithdrawals = mockWithdrawals.filter(
      (w) => w.status === activeTab.toLowerCase()
    );
    const displayWithdrawals = (data) => {
      setMockithdrawals(data.data)
    }
  
    useEffect(() => {
      // fetch pending withdrawals 
      sendExRequest("/account/withdraw-money-requests/", "GET", null,displayWithdrawals )
    },[])

    return (
      <div className="withdrawals-page relative">
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
                        <button className="cancel-button">Cancel</button>
                        <button className="approve-button">Approve</button>
                    </div>
                </div>
              <input type="text" name="" id="" placeholder="write the reason for cancelation"/>
            </div>
          ))}
  
          {filteredWithdrawals.length === 0 && (
            <div className="no-withdrawals">No withdrawals found.</div>
          )}
        </div>
        {pinDialog && <PinsPage toggleInsertPin={toggleInsertPin}
            insertPinAction={handleSaveNewAccount}
      />}
      </div>
    );
  }    
export default WithdrawalRequestsPage;