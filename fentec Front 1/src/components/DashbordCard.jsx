import "../css/dashbord.css"
// import { FaBeer } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from "react";
import { authContext } from "../customContexts/AuthContext";
import config from "../customHooks/ConfigDetails";
import send_money from '../assets/icons/send_money.gif'
import airtime from '../assets/icons/airtime.gif'
import data from '../assets/icons/data.gif'
import dashbord_card from '../assets/icons/dashbord_card.gif'
import card_header from '../assets/icons/card_header.gif'
import { useNavigate } from "react-router-dom";
import { uiContext } from "../customContexts/UiContext";
import { faEye, faEyeDropper, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FaEyeLowVision, FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

const DashbordUserCard = () => {
    const navigate = useNavigate();

    const {currentUser} = useContext(authContext)
    const {setAirtimeOrData,showBalance,toggleShowBalance} = useContext(uiContext)
    const backGroundStyle = {
        backgroundImage:`url(${dashbord_card})`,
        backgroundSize: 'cover', // Ensures the image covers the entire element
        backgroundPosition: 'center', // Centers the image
        color: 'white', // Ensure text contrasts the image
        textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)', 
} ;
    const hBackGroundStyle = {
        backgroundImage:`url(${card_header})`,
        backgroundSize: 'cover', // Ensures the image covers the entire element
        backgroundPosition: 'center', // Centers the image
        color: 'white', // Ensure text contrasts the image
        // textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)', 
} ;
    return ( 
        // <div></div>
            <div className="user-dashbord custom-overflow" style={backGroundStyle}>
                    <div className="sec1 relative ">
                        <div className="head-paint" style={hBackGroundStyle }></div>
                        <div className="image-names ">
                            <img alt={currentUser.picture}src={`${config.BASE_URL}${currentUser.picture}`} className="profile-image" />
                            <div className="welcome-text">Welcome back</div>
                            <div className="user-username">{currentUser.username}</div>
                        </div>
                    </div>

                    <hr />

                    <div className="sec2 ">
                        <div className="available-balance">Available Balance</div>
                        <div className="balance">
                            <span >{showBalance? `₦ ${currentUser?.account?.account_balance}` : "*****"}</span>
                            <FontAwesomeIcon icon={!showBalance? faEye :faEyeSlash} onClick={() => {toggleShowBalance()}} className="" style={{paddingLeft:'10px', fontSize:'14px'}}/>
                            </div>
                        <div className="payment-buttons">
                            <button type="button" className="deposite-btn"  onClick={() => {navigate("/dashbord/deposite/")}}> Deposite</button>
                            <button type="button" className="withdraw-btn"  onClick={() => {navigate("/dashbord/withdraw/")}}> Withdraw</button> 
                        </div>
                        <div className="send-money-space">
                            Send Money to 
                            <span>  </span>
                        </div>
                    </div>

                    <hr />

                    <div className="sec ">
                        <div className="services-items ">
                            <img src={send_money} alt="" className="t-imag"  onClick={() => {navigate("/dashbord/sendmoney/")}} />
                            <img src={airtime} alt="" className="t-imag" onClick={() => {setAirtimeOrData('Airtime');navigate("/dashbord/airtime/")}}/>
                            <img src={data} alt="" className="t-imag"  onClick={() => {setAirtimeOrData('Data');navigate("/dashbord/airtime/")}}/>
                        </div>
                    </div>
            </div> 
     );
}
 
export default DashbordUserCard;