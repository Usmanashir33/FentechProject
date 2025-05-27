// WithdrawalsPage.jsx
import React, { useState } from "react";
import "./WithdrawalsPage.css";
const withdrawalRequestsPage = () => {
    const [activeTab, setActiveTab] = useState("Requested");

    const filteredWithdrawals = mockWithdrawals.filter(
      (w) => w.status === activeTab.toLowerCase()
    );
  
    return (
      <div className="withdrawals-page">
        <h1 className="page-title">Withdrawals Management</h1>
  
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
              <div className="card-info">
                <p className="name">{withdrawal.name}</p>
                <p className="amount">{withdrawal.amount}</p>
                <p className="bank">{withdrawal.bank}</p>
                <p className="account">{withdrawal.accountNumber}</p>
                <p className="date">Date: {withdrawal.date}</p>
              </div>
              <div className="card-actions">
                <button className="approve-button">Approve</button>
                <button className="cancel-button">Cancel</button>
              </div>
            </div>
          ))}
  
          {filteredWithdrawals.length === 0 && (
            <div className="no-withdrawals">No withdrawals found.</div>
          )}
        </div>
      </div>
    );
  }    
export default withdrawalRequestsPage;