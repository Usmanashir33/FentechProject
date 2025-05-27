import React, { useContext, useState ,use} from "react";
import "./Home.css";
import { FaCopy, FaMobileAlt, FaWifi, FaPaperPlane, FaPiggyBank,} from "react-icons/fa";
import config from "../customHooks/ConfigDetails";
import { authContext } from "../customContexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { uiContext } from "../customContexts/UiContext";
import { useNavigate } from "react-router-dom";
import { FaBars, FaBell } from "react-icons/fa6";
import useRequest from "../customHooks/RequestHook";
import { liveContext } from "../customContexts/LiveContext";

const Home = () => {
    const navigate = useNavigate();
    const {setAirtimeOrData,showBalance,toggleShowBalance,sideBarRef} = useContext(uiContext)
    const {currentUser} = useContext(authContext)
    const {unreadNotif} = useContext(liveContext)
    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopupText] = useState("");
    const {sendRequest} = useRequest();

    const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setPopupText(`Copied`);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="support-header home-header ">
        <div className="flex">
            <img alt={currentUser.picture}src={`${config.BASE_URL}${currentUser.picture}`}
            className="user-pic-home" />
            <div className="names">
                <div className="user-fullname">Usman Ashir Muhammad </div>
                <div className="user-name"><span>{currentUser?.username}</span> </div>
            </div>
        </div>
        {/* <button > */}
        <span className="relative menu-btn-home"  onClick={(e) => {navigate("/dashbord/notif/")}}>{(unreadNotif > 0) &&
              <span className="unread-notif">{unreadNotif<100?unreadNotif:"99+"}</span>
            }
          <FaBell className="menu-btn-home"/>
        </span>
          <FaBars className="menu-btn-home" onClick={() => {sideBarRef.current.classList.toggle("hide-side")}}/>
        {/* </button> */}
      </header>


      {/* User Info Card */}
      <div className="user-info-card">
        <div className="info-item">
          <p>Balance</p>
          <span >{showBalance? `₦ ${currentUser?.account?.account_balance}` : "*****"}</span>
          <FontAwesomeIcon icon={!showBalance? faEye : faEyeSlash} onClick={() => {toggleShowBalance()}} className="copy-icon"/>
        </div>

        <div className="info-item ">
          <p>Account ID</p>
          <div>
            <span>{currentUser?.account?.account_id}</span>
            <FaCopy onClick={() => copyToClipboard(currentUser?.account?.account_id)} className="copy-icon" />
            
          </div>
        </div>
        <div className="info-item bankname">
          <div className="">
            <p>Account Number</p>
            <div>
              <span>{currentUser?.account?.accountnumbers[0]?.account_number}</span>
              <FaCopy onClick={() => copyToClipboard(currentUser?.account?.accountnumbers[0]?.account_number || 'null')} className="copy-icon" />
            </div>
            <div>
              {!currentUser?.account?.accountnumbers[0]?.account_number && <section onClick={() => sendRequest(
              '/account/generate-account-number/','POST'
                )}>
                <span> Get Account Number </span>
              </section>}
            </div>
          </div>

          <div className="">
            <p>Bank Name</p>
            <div>
              <span>
                {currentUser.account?.accountnumbers[0]?.bank_name || "No bank found"}
              </span>
              <FaCopy onClick={() => copyToClipboard(currentUser.account?.accountnumbers[0]?.bank_name || 'null' )} className="copy-icon" />
            </div>
          </div>
        </div>
      </div>

      {/* Deposit & Withdraw Section */}
      <div className="transaction-buttons ">
        <button className="deposit-btn button-home" onClick={() => {navigate("/dashbord/deposite/")}}>Deposit</button>
        <button className="withdraw-btn button-home" onClick={() => {navigate("/dashbord/withdraw/")}}>Withdraw</button>
      </div>

      {/* Our Services Section */}
      <div className="services-section">
        <div className="services">
          <div className="service-item" onClick={() => {navigate("/dashbord/sendmoney/")}}>
            <FaPaperPlane className="service-icon" />
            <p>Send Money</p>
          </div>
          <div className="service-item"  onClick={() => {setAirtimeOrData('Airtime');navigate("/dashbord/airtime/")}}>
            <FaMobileAlt className="service-icon" />
            <p>Airtime</p>
          </div>
          <div className="service-item"  onClick={() => {setAirtimeOrData('Data');navigate("/dashbord/airtime/")}}>
            <FaWifi className="service-icon" />
            <p>Data</p>
          </div>
          <div className="service-item">
            <FaPiggyBank className="service-icon" />
            <p>Save</p>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && <div className="popup">{popupText}</div>}
    </div>
  );
};
// Exporting the Home component

// import React, { useState, useEffect } from 'react';
// import {
//   FaBell, FaWallet, FaPaperPlane, FaBolt,
//   FaMobileAlt, FaTv, FaGraduationCap
// } from 'react-icons/fa';
import { MdOutlineDataUsage } from 'react-icons/md';
import { IoIosMore } from 'react-icons/io';

function WalletDashboard() {
  const [balance, setBalance] = useState(45000);
  const [transactions, setTransactions] = useState([]);

  // Dummy fetch simulation
  useEffect(() => {
    setTimeout(() => {
      setTransactions([
        {
          id: 1,
          type: 'Data Purchase',
          icon: <MdOutlineDataUsage />,
          amount: -2000,
          time: 'Today, 10:30 AM'
        },
        {
          id: 2,
          type: 'Wallet Funding',
          icon: <FaWallet />,
          amount: 10000,
          time: 'Today, 09:15 AM'
        },
        {
          id: 3,
          type: 'Airtime Purchase',
          icon: <FaMobileAlt />,
          amount: -1000,
          time: 'Yesterday, 3:45 PM'
        },
        {
          id: 4,
          type: 'DSTV Subscription',
          icon: <FaTv />,
          amount: -6500,
          time: 'Yesterday, 2:20 PM'
        }
      ]);
    }, 800); // Simulate API delay
  }, []);

  const quickActions = [
    { label: 'Data', icon: <MdOutlineDataUsage /> },
    { label: 'Airtime', icon: <FaMobileAlt /> },
    { label: 'TV', icon: <FaTv /> },
    { label: 'School', icon: <FaGraduationCap /> },
    { label: 'Electricity', icon: <FaBolt /> },
    { label: 'Wallet', icon: <FaWallet /> },
    { label: 'Transfer', icon: <FaPaperPlane /> },
    { label: 'More', icon: <IoIosMore /> }
  ];

  return (
    <div className="max-w-md mx-auto p-4 font-sans bg-[#F9FAFB] min-h-screen transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          <div>
            <p className="text-[13px] text-gray-500 font-medium">Welcome back</p>
            <h2 className="text-[16px] font-semibold text-[#111827]">Hi, Samuel</h2>
          </div>
        </div>
        <FaBell className="text-xl text-gray-500 hover:text-[#5A50E3] transition" />
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-[#5A50E3] to-[#9157E6] text-white rounded-2xl p-5 mb-6 shadow-lg transition">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-medium opacity-90">Available Balance</p>
          <FaWallet className="text-xl opacity-90" />
        </div>
        <h1 className="text-3xl font-bold mb-4 transition-all duration-300">₦{balance.toLocaleString()}</h1>
        <div className="flex space-x-4">
          <button className="flex-1 bg-white text-[#5A50E3] font-semibold py-2 rounded-xl shadow transition hover:bg-[#F3F4F6] active:scale-95">Fund Wallet</button>
          <button className="flex-1 bg-white bg-opacity-20 text-white border border-white font-semibold py-2 rounded-xl transition hover:bg-opacity-30 active:scale-95">Transfer</button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-[15px] font-semibold text-[#111827] mb-3">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4 text-center text-[13px] text-[#5A50E3] font-medium">
          {quickActions.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-1 transition-transform hover:scale-105 active:scale-95"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-[#EEF2FF] text-[#5A50E3] rounded-full shadow-sm transition-all">
                {React.cloneElement(item.icon, { className: 'text-lg' })}
              </div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[15px] font-semibold text-[#111827]">Recent Transactions</h3>
          <span className="text-[#5A50E3] text-[13px] font-medium cursor-pointer hover:underline">See All</span>
        </div>

        {transactions.length === 0 ? (
          <p className="text-sm text-gray-400 text-center mt-8">Loading transactions...</p>
        ) : (
          <div className="space-y-3">
            {transactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm transition hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="text-[#5A50E3] text-xl">{tx.icon}</div>
                  <div>
                    <p className="text-[14px] font-medium text-[#111827]">{tx.type}</p>
                    <p className="text-[12px] text-gray-400">{tx.time}</p>
                  </div>
                </div>
                <div className={`font-semibold text-[14px] ${tx.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>
                  {tx.amount < 0 ? `-₦${Math.abs(tx.amount).toLocaleString()}` : `+₦${tx.amount.toLocaleString()}`}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// export default Home;
export default WalletDashboard;
