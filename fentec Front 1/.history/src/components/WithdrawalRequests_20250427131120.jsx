// WithdrawalsPage.jsx
import React, { useState } from "react";
import "./WithdrawalsPage.css";
const WithdrawalRequestsPage = () => {
    const [activeTab, setActiveTab] = useState("Requested");
    const Tabs = ["Requested", "Approved", "Cancelled"];
    const mockWithdrawals = [
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
    ];
      
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