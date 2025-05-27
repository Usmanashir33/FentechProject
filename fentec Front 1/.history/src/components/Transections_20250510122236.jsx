import "../css/dashbord.css"
// import { FaBeer } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMultiply, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from "react";
import TransectionCard from "./TransectionCard";
import { liveContext } from "../customContexts/LiveContext";
import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar";
import { FaCalendarCheck } from "react-icons/fa6";
const Transactions = () => {
    const {transections,sendRequest} = useContext(liveContext);
    const [filteredTrxs,setFilteredTrxs] = useState([])
    const calender = useRef(null);
    const [selectedDate,setSelctedDate] = useState();

    useEffect(() => {
        if (transections){
            setFilteredTrxs(transections)
        }
    },[transections])
    const handleCustomClick = () => {
        calender.current.classList.remove('hidden');
    }
    const handleDateSelection =(range) => {
            const now = new Date();

            const Today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            const Yesterday = new Date(Today);
            Yesterday.setDate(Yesterday.getDate() - 1);

            const LastWeek = new Date(Today);
            LastWeek.setDate(LastWeek.getDate() - 7);

            const LastMonth = new Date(Today);
            LastMonth.setMonth(LastMonth.getMonth() - 1);
            
              switch (range) {
                case 'today':
                  return setFilteredTrxs(filteredTrxs.filter(item => {
                    const itemDate = new Date(item.date);
                    return itemDate >= Today ? item : null ;
                  }))
                case 'yesterday':
                    return setFilteredTrxs(filteredTrxs.filter(item => {
                        const itemDate = new Date(item.date);
                        return (itemDate >= Yesterday && itemDate < Today) ? item : null ;
                      }))

                case 'lastWeek':
                    return setFilteredTrxs(filteredTrxs.filter(item => {
                        const itemDate = new Date(item.date);
                        return (itemDate >= LastWeek) ? item : null ;
                      }))
                // case 'lastMonth':
                //   return itemDate >= LastMonth;
                case 'clear':
                    console.log('transections: ', 'transections');
                    setFilteredTrxs([transections])
                default:
                    return true; // no filter
              }
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
                                    <div className={``} onClick={() => {handleDateSelection('today')}}>Today</div>
                                    <div className={``} onClick={() => {handleDateSelection('yesterday')}}>Yesterday</div>
                                    <div className={``} onClick={() => {handleDateSelection('lastWeek')}}>Last Week</div>
                                    <div className={``} onClick={() => {handleDateSelection('lastMonth')}}>Last Month</div>
                                    <div className={``} onClick={() => {handleDateSelection('clear')}}>Clear</div>
                                    <div className={`flex`} onClick={handleCustomClick}>
                                        custom
                                        <input type='date' name="" id="date"  className="" ref={calender} onChange={(e) => {
                                            handleDateSelection(e.target.value)
                                        }}/>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- transection cards  --> */}
                            <div className="transections custom-overflow">
                                {filteredTrxs.length > 0 ? (
                                    filteredTrxs.map((trx) => (
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