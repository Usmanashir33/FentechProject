import "../css/dashbord.css"
// import { FaBeer } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBell, faCreditCard,faEnvelope,  faGear, faGears,  faInfoCircle, faMultiply,
     faPalette, faPowerOff, faSearch, faShieldAlt,faUsers } from '@fortawesome/free-solid-svg-icons';
import { useContext, useRef } from "react";
import { authContext } from "../customContexts/AuthContext";
import config from "../customHooks/ConfigDetails";
import { useNavigate } from "react-router-dom";
import { uiContext } from "../customContexts/UiContext";
import { FaBars } from "react-icons/fa6";
import SettingsPage from "./SettingsFiles/Settings";
import { liveContext } from "../customContexts/LiveContext";
import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleUp";
const DashboardHeader = () => {
    const navigate = useNavigate();
    const {setPorPPageAction,setHeaderDD,headerDD,sideBarRef} = useContext(uiContext);

    const pageRef = useRef(null);
    const loggingSec = useRef(null);
    const paymentSec = useRef(null);
    const securitySec = useRef(null);
    const modeSec = useRef(null);
    const siderSecs = [loggingSec,paymentSec,securitySec,modeSec] ;

    const {currentUser} = useContext(authContext);
    const {unreadNotif,unReadRequests} = useContext(liveContext);

    return ( 
        <div className="dashbord-header relative " >
            <button onClick={() => {sideBarRef.current.classList.toggle("hide-side")}} className="menu-btn">
            <FaBars />
            </button>
                
                <div className="greeting ">
                    <span>Hello</span>
                    <span className="user-username"> {currentUser?.username} </span>
                    <span> Good Morning! </span>
                    <span className="varified-status">
                        verified
                    </span>
                </div>

                <div className="dh-right-icons">
                        <FontAwesomeIcon icon={faSearch} className="dh-icon " onClick={(e) => {
                            navigate("/dashbord/notif/")
                        }}/>
                        <span className="relative">
                            {(unreadNotif > 0) &&
                                <span className="unread-notif">{unreadNotif<100?unreadNotif:"99+"}</span>
                            }
                            <FontAwesomeIcon icon={faBell}  className={`dh-icon`} onClick={(e) => {
                                navigate("/dashbord/notif/")
                            }}/>
                        </span>

                        <span className="relative">
                            {(unreadNotif > 0) &&
                                <span className="unread-notif">{unreadNotif<100?unreadNotif:"99+"}</span>
                            }
                           <FontAwesomeIcon icon={faEnvelope} className="dh-icon " onClick={(e) => {
                            navigate("/dashbord/mssg/")
                        }}/>
                        </span>
                        <span class>

                        </span>
                        {(unreadNotif <= 0) &&
                                <span className="unread-notif">{unreadNotif<100?unreadNotif:"99+"}</span>
                            }
                        <FontAwesomeIcon icon={faArrowAltCircleUp} className="dh-icon" onClick={(e) => {
                            navigate("/dashbord/withdrawalRequests/");
                        }}/>
                        <FontAwesomeIcon icon={faGear} className="dh-icon" onClick={(e) => {
                            setHeaderDD(true);
                        }}/>

                        {/* <!-- dropdown  --> */}
                        <div className="dot3">
                            <span  onClick={() => {}}>
                            </span>
                            {headerDD && <SettingsPage/>}
                        </div>
                </div>

                </div>
     );
}
 
export default DashboardHeader;