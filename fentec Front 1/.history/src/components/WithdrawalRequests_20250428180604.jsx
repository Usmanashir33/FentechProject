// WithdrawalsPage.jsx
import React, { useEffect, useState } from "react";
import useExRequest from "../customHooks/ExternalRequestHook";
// import "./WithdrawalsPage.css";
const WithdrawalRequestsPage = () => {
    const {sendExRequest} = useExRequest();
        const {getFormattedDate} = useContext(uiContext)
    
    const [activeTab, setActiveTab] = useState("Requested");
    const Tabs = ["Pending", "Approved", "Cancelled"];
    const [mockWithdrawals,setMockithdrawals] = useState([
        {
          id: 1,
          name: "John Doe",
          amount: "\u20a650,000",
          bank: "GTBank",
          accountNumber: "0123456789",
          status: "requested",
          date: "2025-04-25",
        },
        {
          id: 2,
          name: "Jane Smith",
          amount: "\u20a6120,000",
          bank: "Access Bank",
          accountNumber: "9876543210",
          status: "requested",
          date: "2025-04-24",
        },
        {
          id: 3,
          name: "Michael Johnson",
          amount: "\u20a630,000",
          bank: "UBA",
          accountNumber: "1122334455",
          status: "approved",
          date: "2025-04-20",
        },
        {
          id: 4,
          name: "Laura Lee",
          amount: "\u20a675,000",
          bank: "First Bank",
          accountNumber: "5566778899",
          status: "cancelled",
          date: "2025-04-22",
        },
    ]);
      
    const filteredWithdrawals = mockWithdrawals.filter(
      (w) => w.status === activeTab.toLowerCase()
    );
    const displayWithdrawals = (data) => {
      setMockithdrawals(data.data)
       // console.log('data: ', data.data);
       console.log('data: ', mockWithdrawals);
    }
  
    useEffect(() => {
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
                    <span className="amount">{withdrawal.amount}</span>
                </div>
                <div className="flex justify-between">
                    <div className="card-info">
                        <div className="bank">{withdrawal.withdrawal_bank_name}</div>
                        <div className="account">{withdrawal.withdrawal_account_number}</div>
                        <div className="date">{withdrawal.trx_date}</div>
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
      </div>
    );
  }    
export default WithdrawalRequestsPage;