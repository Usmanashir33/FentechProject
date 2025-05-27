import React, { useContext, useState } from "react";
import "./Home.css";
import { FaCopy, FaMoneyBillWave, FaMobileAlt, FaWifi, FaPaperPlane, FaPiggyBank, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaEyeSlash, FaToggleOn, FaStaylinked } from "react-icons/fa";
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

8520293498

export default Home;
