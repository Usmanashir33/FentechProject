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
    const [filteredTrxs,setFilteredTrxs] = useState([]);
    const  [showFilter,setShowFilter] = useState(false);

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

            // const ThisWeek = new Date(Today);
            // LastWeek.setDate(LastWeek.getDate() - 7);

            // const ThisMonth = new Date(Today);
            // LastMonth.setMonth(LastMonth.getMonth() - 1);

            const LastMonth = new Date(Today);
            LastMonth.setMonth(LastMonth.getMonth() - 1);
            
              switch (range) {

                case 'today':
                  return setFilteredTrxs(transections.filter(item => {
                    const itemDate = new Date (item.trx_date);
                    return itemDate >= Today ? item : null ;
                  }))

                case 'yesterday':
                    return setFilteredTrxs(transections.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        return (itemDate >= Yesterday && itemDate < Today)? item : null ;
                      }))

                case 'lastWeek':
                    const LastWeek = new Date(Today);
                    LastWeek.setDate(LastWeek.getDate() - 7);
                    let weekly = transections.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if (itemDate >= LastWeek){
                            console.log('itemDate >= LastWeek: ', itemDate >= LastWeek);
                            return item
                        }});
                    return setFilteredTrxs(weekly);

                case 'lastMonth':
                    let last_month = transections.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        console.log('(itemDate.getMonth() -1): ', (itemDate.getMonth() -1));
                        console.log('Today.getMonth()-1: ', Today.getMonth()-1);
                        if ((itemDate.getMonth() -1) === Today.getMonth()-1){
                            return item
                        }
                    })
                    return setFilteredTrxs(last_month);
                case 'clear':
                    setFilteredTrxs(transections)
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
                                    <div className="filtered-date relative " onClick={() => {setShowFilter(true)}}>
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
                            {showFilter && <div className="filter-container">
                                <div className=" relative">
                                    <FontAwesomeIcon icon={faMultiply} className="cancel" onClick={() => {setShowFilter(!true)}}/>
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
                            </div>}

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