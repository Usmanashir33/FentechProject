// WithdrawalsPage.jsx
import React, { useState } from "react";
import "./WithdrawalsPage.css";

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

const Tabs = ["Requested", "Approved", "Cancelled"];


const withdrawalRequestsPage = () => {
    
}
 
export default withdrawalRequestsPage;