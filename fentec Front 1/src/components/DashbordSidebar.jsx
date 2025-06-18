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
const DashebordSidebar= () => {
    
    const {logOut} = useContext(authContext) ;
    const {headerDD,setHeaderDD,sideBarRef} = useContext(uiContext) ;

    const navigate = useNavigate();
    const checkActive = (navPath) => {
        let current_location = document.location.pathname ;
        return navPath === current_location ? "active" : '' 
    }
   const handleButtonClick = (path) => {
        navigate(path);
        sideBarRef.current.classList.toggle('hide-side');
   }
    

    return ( 
        <div className="sidebar hide-side" ref={sideBarRef}>
                <div className="items">
                    <div className="app-name  flex ">
                        <div>
                            Logo App name
                        </div> 
                    <span className="side-cancel-cont">
                        <FontAwesomeIcon icon={faMultiply} className="  sidebar-cancel" onClick={(e) => {
                            sideBarRef.current.classList.toggle('hide-side')
                        }}/>
                    </span>
                    </div>
                    <div className="navs">
                        <span className="small-text">Main Menu</span>

                        <div className={`nav ${checkActive("/dashbord/")}`} onClick={() => {handleButtonClick("/dashbord/")}} >
                            <FontAwesomeIcon icon={faTableCellsLarge} className="nav-icon"  /> {/* Overview */}
                            <span className=""> Overview</span>
                        </div>

                        <div className={`nav ${checkActive("/dashbord/home/")}`} onClick={() => {handleButtonClick("/dashbord/home/")}} >
                            <FontAwesomeIcon icon={faHome} className="nav-icon"  /> {/* Overview */}
                            <span className=""> home</span>
                        </div>
                        
                        <div className={`nav ${checkActive("/dashbord/analysys/")}`} onClick={() => {handleButtonClick("")}}>
                            <FontAwesomeIcon icon={faChartBar}  className="nav-icon"/> {/* Wallet */}
                            <span>Analysis</span>
                        </div>

                        <div className={`nav ${checkActive("/dashbord/trans/")}`} onClick={() => {handleButtonClick("/dashbord/trans/")}}>
                            <FontAwesomeIcon icon={faExchangeAlt} className="nav-icon" /> {/* Transaction */}
                            <span>Transections</span>
                        </div>

                        <div className={`nav ${checkActive("/dashbord/mssg/")}`}onClick={() => {handleButtonClick("/dashbord/mssg/")}}>
                            <FontAwesomeIcon icon={faEnvelope}  className="nav-icon"/> {/* Message */}
                            <span>Messages</span>
                        </div>
                        <div className={`nav ${checkActive("/dashbord/wallet/")}`} onClick={() => {handleButtonClick("/dashbord/wallet/")}}>
                            <FontAwesomeIcon icon={faWallet} className="nav-icon" /> {/* Analysis */}
                            <span>Wallet</span>
                        </div>
                        <div className={`nav ${checkActive("/dashbord/profile/")}`} onClick={() => {handleButtonClick("/dashbord/profile/")}}>
                            <FontAwesomeIcon icon={faUser}  className="nav-icon"/> {/* Profile */}
                            <span>Profile</span>
                        </div>
                    </div>
                </div>

                <div className="navs" >
                    <Link to={'/dashbord/support/'} className="nav" onClick={(e) => {
                            // headerDDRef.current.classList.toggle("hidden")
                        }}>
                        <FontAwesomeIcon icon={faHeadphonesSimple}  className="nav-icon"/> {/* Profile */}
                        <span>Support</span>
                    </Link>
                    <div className="nav" onClick={(e) => {
                            setHeaderDD(true)
                        }}>
                        <FontAwesomeIcon icon={faGear}  className="nav-icon"/> {/* Profile */}
                        <span>Settings</span>
                    </div>
                    <div className="nav" onClick={() => {logOut()}}>
                        <FontAwesomeIcon icon={faRightFromBracket}  className="nav-icon"/> {/* Profile */}
                        <span>Logout</span>
                    </div>
                </div>
            </div>
     );
}
 
export default DashebordSidebar;