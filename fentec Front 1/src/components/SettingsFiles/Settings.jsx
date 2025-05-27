import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBell, faCreditCard,faEnvelope,  faGear, faGears,  faInfoCircle, faMultiply,
     faPalette, faPowerOff, faSearch, faShieldAlt,faUsers } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { uiContext } from '../../customContexts/UiContext';

const SettingsPage = () => {
        const navigate = useNavigate();
        const {setPorPPageAction,setHeaderDD,headerDD,sideBarRef} = useContext(uiContext);
    
        const pageRef = useRef(null);
        const loggingSec = useRef(null);
        const paymentSec = useRef(null);
        const securitySec = useRef(null);
        const modeSec = useRef(null);
        const siderSecs = [loggingSec,paymentSec,securitySec,modeSec] ;

        const ShowSec = (sec) => {
            // close all opend available 
            siderSecs.forEach((section) => {
                section.current.classList.add("hidden")
            })
            // open the perticular sec 
            sec.current.classList.remove("hidden");
        }
        const checkPageShowOff = () => {
            let samePage = document.location.pathname === '/dashbord/settings/'
            if ( samePage ){
                navigate('/dashbord/home/')
            } else {
                setHeaderDD(false)
            }
        }
        useEffect(() => {
            setHeaderDD(true);
            return (() => {
                setHeaderDD(false);
            });
        },[])
    return(
        <>
            {headerDD && <div className="dh-dropdown  dd custom-overflow hidden-d" id ='dh-dropdown'>
                                    <div className="d-header ">
                                        <div className="name">Account Settings</div>
                                        <div className="c-icon" onClick={(e) => {
                                            checkPageShowOff();
                                        }} >
                                        <FontAwesomeIcon icon={faMultiply} className="nav-ico" />
                                        </div>
                                    </div>
                                    <div className="d-body ">
                                <div className="navs ">
                                                        <div className="nav d-nav" onClick={(e) => {ShowSec(loggingSec)}}>
                                                            <FontAwesomeIcon icon={faGears} className="nav-icon" />
                                                            {/* <img alt='u-pic'src="./images/password.png" className="nav-icon" /> */}
                                                            <span>Logging Settings</span>
                                                        </div>
                                                        <section className="sub-sec hidden " ref={loggingSec}>
                                                            <div className="" onClick={(e) => {navigate('/dashbord/logSet');setPorPPageAction('changePassword')}}>Change Password</div>
                                                            <div className="" onClick={(e) => {navigate('/dashbord/logSet');setPorPPageAction('resetPassword')}}>Reset Password</div>
                                                        </section>
                                                        <div className="nav d-nav" onClick={(e) => {ShowSec(paymentSec)}}>
                                                            <FontAwesomeIcon icon={faCreditCard} className="nav-icon" />
                                                            {/* <img alt='u-pic'src="./images/password.png" className="nav-icon" /> */}
                                                            <span>Payment Settings</span>
                                                        </div>
                                                        <section className="sub-sec hidden " ref={paymentSec}>
                                                            <div className="" onClick={(e) => {navigate('/dashbord/paySet');setPorPPageAction('changePin')}}>Change Pin</div>
                                                            <div className="" onClick={(e) => {navigate('/dashbord/paySet');setPorPPageAction('resetPin')}}>Reset Pin</div>
                                                        </section>
                                                        <div className="nav d-nav" onClick={(e) => {ShowSec(securitySec)}}>
                                                            <FontAwesomeIcon icon={faShieldAlt} className="nav-icon" />
                                                            {/* <img alt='u-pic'src="./images/password.png" className="nav-icon" /> */}
                                                            <span>Security Center</span>
                                                        </div>
                                                        <section className="sub-sec hidden " ref={securitySec}>
                                                            <div>
                                                                <span className="">Log  with Pin</span>
                                                                <input type="checkbox" name="" id="" />
                                                            </div>
                                                            <div className="">Stay Logged</div>
                                                        </section>
                                                        <div className="nav d-nav" onClick={(e) => {ShowSec(modeSec)}}>
                                                            <FontAwesomeIcon icon={faPalette} className="nav-icon" />
                                                            {/* <img alt='u-pic'src="./images/password.png" className="nav-icon" /> */}
                                                            <span>Theme Mode</span>
                                                        </div>
                                                        <section className="sub-sec hidden " ref={modeSec}>
                                                            <div>
                                                                <span className="">Night Mode</span>
                                                                <input type="checkbox" name="" id="" />
                                                            </div>
                                                        </section>

                                                        <div className="nav d-nav">
                                                            <FontAwesomeIcon icon={faUsers} className="nav-icon" />
                                                            {/* <img alt='u-pic'src="./images/password.png" className="nav-icon" /> */}
                                                            <span>Refarrels</span>
                                                        </div>
                                                        <div className="nav d-nav">
                                                            <FontAwesomeIcon icon={faInfoCircle} className="nav-icon" />
                                                            {/* <img alt='u-pic'src="./images/password.png" className="nav-icon" /> */}
                                                            <span>About Us</span>
                                                        </div>
                                                        <div className="nav d-nav">
                                                            <FontAwesomeIcon icon={faPowerOff} className="nav-icon" />
                                                            {/* <img alt='u-pic'src="./images/password.png" className="nav-icon" /> */}
                                                            <span>Close Account</span>
                                                        </div>

                                                    </div>
                                    </div>                                
            </div>}
        </>
     );
}
 
export default SettingsPage;