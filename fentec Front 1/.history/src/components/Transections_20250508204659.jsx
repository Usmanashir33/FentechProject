import "../css/dashbord.css"
// import { FaBeer } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMultiply, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef } from "react";
import TransectionCard from "./TransectionCard";
import { liveContext } from "../customContexts/LiveContext";
import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar";
import { FaCalendarCheck } from "react-icons/fa6";
const Transactions = () => {
    const {transections,sendRequest} = useContext(liveContext);
    const calender = useRef(null);

    const handleCustomClick = () => {
        calender.current.classList.toggle('hidden');
        calender.current.focus
        calender.current.classList.toggle('hidden');
        console.log('calender.current.: ', calender);
    }

    useEffect(() => {
        sendRequest('/account/trxs/','GET','')
    },[])
    return ( 
        <div className="transection-section ">
                            <div className="transection-header">
                                <div className="transection-name">
                                    <span>Transections</span>
                                    <div className="filtered-date relative ">
                                        < FaCalendarCheck/>
                                        <span className="date">{'03-14-2001'}</span>
                                    </div>
                                </div>

                                <div className="transection-search">
                                    <input type="search" name="" id="" placeholder="transection ref here" />
                                    {/* <div className="icon">ic</div> */}
                                    <FontAwesomeIcon icon={faSearch} className="dh- ts-icon"/>
                                </div>
                            </div>
                            <div className="filter-container">
                                <div className=" relative">
                                    <FontAwesomeIcon icon={faMultiply} className="cancel"/>
                                </div>
                                <div className="sel-days">
                                    <div className={``}>Today</div>
                                    <div className={``}>Yesterday</div>
                                    <div className={``}>Last Week</div>
                                    <div className={``}>Last Month</div>
                                    <div className={`flex`} onClick={handleCustomClick}>
                                        custom
                                        <input type='date' name="" id="date"  className="hidden" ref={calender}/>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- transection cards  --> */}
                            <div className="transections custom-overflow">
                                {transections.length > 0 ? (
                                    transections.map((trx) => (
                                     <TransectionCard trx ={trx} key={trx.id}/>
                                     
                                    ))
                                  ) : (
                                    <div className="empty-notification">
                                      <p>No Transection Found Yet!</p>
                                    </div>
                                )}
                                <div className="end">---The End----</div>
                            </div>
                    </div>
     );
}
 
export default Transactions;