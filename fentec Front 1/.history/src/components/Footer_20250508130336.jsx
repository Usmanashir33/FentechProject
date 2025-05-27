import "../css/dashbord.css"
// import { FaBeer } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChartBar,faEnvelope, faExchangeAlt, faEye, faGear, faHeadphonesSimple, faHome, faMultiply, faRightFromBracket, faSearch, faShieldAlt, faSignInAlt, faSignOutAlt, faTableCellsColumnLock, faTableCellsLarge, faUser, faUserAltSlash, faUsers, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef } from "react";
import { authContext } from "../customContexts/AuthContext";
import config from "../customHooks/ConfigDetails";
import { FaGears } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { uiContext } from "../customContexts/UiContext";
const Footer= () => {
    
    const {logOut} = useContext(authContext) ;
    const {setHeaderDD,sideBarRef} = useContext(uiContext) ;

    const navigate = useNavigate();
    const checkActive = (navPath) => {
        let current_location = document.location.pathname ;
        return navPath === current_location ? "active" : ''
    }
   const handleButtonClick = (path) => {
        navigate(path);
   }
    

    return ( 
        <div className="footer hidden">
                {/* <div className="items"> */}
                    <div className="navs ">
                        <div className={`nav ${checkActive("/dashbord/home/")}`} onClick={() => {handleButtonClick("/dashbord/home/")}} >
                            <FontAwesomeIcon icon={faHome} className="footer-icon"  /> {/* Overview */}
                            <span className=""> home</span>
                        </div>
                        <div className={`nav ${checkActive("/dashbord/wallet/")}`} onClick={() => {handleButtonClick("/dashbord/wallet/")}}>
                            <FontAwesomeIcon icon={faWallet} className="footer-icon" /> {/* Analysis */}
                            <span>Wallet</span>
                        </div>

                        <div className={`nav ${checkActive("/dashbord/trans/")}`} onClick={() => {handleButtonClick("/dashbord/trans/")}}>
                            <FontAwesomeIcon icon={faExchangeAlt} className="footer-icon" /> {/* Transaction */}
                            <span>Transections</span>
                        </div>

                        <div className={`nav ${checkActive("/dashbord/mssg/")}`}onClick={() => {handleButtonClick("/dashbord/mssg/")}}>
                            <FontAwesomeIcon icon={faEnvelope}  className="footer-icon"/> {/* Message */}
                            <span>Messages</span>
                        </div>
                        
                        <div className="nav" onClick={(e) => {
                            // headerDDRef.current.classList.remove("hidden-dh");
                            handleButtonClick("/dashbord/settings/")
                        }}>
                        <FontAwesomeIcon icon={faGear}  className="footer-icon"/> {/* Profile */}
                        <span>Settings</span>
                    </div>
                    </div>
                {/* </div> */}

            </div>
     );
}
 
export default Footer;