import "../css/dashbord.css"
// import { FaBeer } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBell, faBellConcierge, faChartBar, faColumns, faCreditCard, faEllipsisVertical, faEnvelope, faExchangeAlt, faEye, faGear, faGears, faHeadphonesSimple, faInfoCircle, faMessage, faMultiply, faOutdent, faPalette, faPhone, faPowerOff, faRightFromBracket, faSearch, faShieldAlt, faSignInAlt, faSignOutAlt, faTableCellsColumnLock, faTableCellsLarge, faUser, faUserAltSlash, faUsers, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect } from "react";
import TransectionCard from "./TransectionCard";
import { liveContext } from "../customContexts/LiveContext";
const Transactions = () => {
    const {transections,sendRequest} = useContext(liveContext);

    useEffect(() => {
        sendRequest('/account/trxs/','GET','')
    },[])
    return ( 
        <div className="transection-section ">
                            <div className="transection-header">
                                <div className="transection-name">
                                    Transections
                                </div>
                                <div className="transection-search">
                                    <input type="search" name="" id="" placeholder="transection ref here" />
                                    {/* <div className="icon">ic</div> */}
                                    <FontAwesomeIcon icon={faSearch} className="dh- ts-icon"/>
                                </div>
                                <div className="t-sort-buttons">
                                    <button>new</button>
                                    <button>old</button>
                                </div>
                            </div>
                            {/* <!-- transection cards  --> */}
                            <div className="transections ">
                                {transections.length > 0 ? (
                                    transections.map((trx) => (
                                     <TransectionCard trx ={trx} key={trx.id}/>
                                    ))
                                  ) : (
                                    <div className="empty-notification">
                                      <p>No Transection Found Yet!</p>
                                    </div>
                                )}

                                {/* <div className="transection-card t-in">
                                    <div className="transection-col1">
                                        <img src="./images/google1.avif" alt="pic" className="t-image" />
                                        
                                        <div className="t-details">
                                            <span className="t-name"> Airtime Purchase</span>
                                            <span className="t-date">12/12/2024</span>
                                        </div>
                                    </div>
                                    <div className="t-status t-completed">Success</div>
                                    <div className="t-amount">+$3000</div>
                                    <div className="dot3">...</div>
                                </div>

                                <div className="transection-card t-in">
                                    <div className="transection-col1">
                                        <img src="./images/google1.avif" alt="pic" className="t-image" />
                                        <div className="t-details">
                                            <span className="t-name"> Salahuddin Shehu</span>
                                            <span className="t-date">12/12/2024</span>
                                        </div>
                                    </div>
                                    <div className="t-status t-failed">Failed</div>
                                    <div className="t-amount">+$3000</div>
                                    <div className="dot3">...</div>
                                </div> */}

                            </div>
                    </div>
     );
}
 
export default Transactions;