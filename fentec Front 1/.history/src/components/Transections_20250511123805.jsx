import "../css/dashbord.css"
// import { FaBeer } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMultiply, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from "react";
import TransectionCard from "./TransectionCard";
import { liveContext } from "../customContexts/LiveContext";
import { FaCalendarCheck } from "react-icons/fa6";
const Transactions = () => {
    const {transections,sendRequest} = useContext(liveContext);
    const [filteredTrxs,setFilteredTrxs] = useState([]);
    const  [displayFilter,setDisplayFilter] = useState(false);

    const calender = useRef(null);
    const [selectedDate,setSelctedDate] = useState('All');

    useEffect(() => {
        if (transections){
            setFilteredTrxs(transections?.results)
        }
    },[transections])
    const refetch = () => {

    }
    let link = transections?.next;
            if (link){
                let url = new URL(link);
                let next = `${url.pathname}${url.search}`;
                console.log('link: ', next);
            }
   
    const handleCustomClick = () => {
        calender.current.classList.remove('hidden');
    }
    const handleDateSelection =(range) => {
            setSelctedDate(range)

            // also calender selecetion 
            let calenderDate = new Date(range)
            let next_day = new Date(calenderDate)
            next_day.setDate(calenderDate.getDate() + 1)

            if (calenderDate !== 'Invalid Date'){
                let calender_data = transections?.results.filter(item => {
                    const itemDate = new Date(item.trx_date);
                    if (itemDate < next_day && itemDate >= calenderDate){
                        return item
                        
                    }
                })
                setFilteredTrxs(calender_data);
            }
            const now = new Date();
            const Today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            const Yesterday = new Date(Today);
            Yesterday.setDate(Yesterday.getDate() - 1);

            const ThisWeek = new Date(Today);
            ThisWeek.setDate(ThisWeek.getDate() - 7);

            const LastWeek = new Date(Today);
            LastWeek.setDate(LastWeek.getDate() - 14);

            const LastMonth = new Date(Today);
            LastMonth.setMonth(LastMonth.getMonth() - 1);
            setDisplayFilter(false);
            
              switch (range) {
                case 'today':
                  return setFilteredTrxs(transections?.results.filter(item => {
                    const itemDate = new Date (item.trx_date);
                    return itemDate >= Today ? item : null ;
                  }))

                case 'yesterday':
                    return setFilteredTrxs(transections?.results.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        return (itemDate >= Yesterday && itemDate < Today)? item : null ;
                      }))

                case 'thisWeek':
                    let this_weekly = transections?.results.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if (itemDate >= ThisWeek){
                            return item
                        }});
                    return setFilteredTrxs(this_weekly);

                case 'lastWeek':
                    let weekly = transections?.results.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if (itemDate >= LastWeek && itemDate < ThisWeek){
                            return item
                        }});
                    return setFilteredTrxs(weekly);

                case 'thisMonth':
                    let this_month = transections?.results.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if ((itemDate.getMonth() -1) === Today.getMonth()-1){
                            return item
                        }
                    })
                    return setFilteredTrxs(this_month);
                case 'lastMonth':
                    let last_month = transections?.results.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if ((itemDate.getMonth() -1) === Today.getMonth()-2){
                            return item
                        }
                    })
                    return setFilteredTrxs(last_month);
                case 'clear':
                    setFilteredTrxs(transections?.results)
                    setSelctedDate('All')

                default:
                    setDisplayFilter(false);
                    return true; // no filter
                }
            
    }
    useEffect(() => {
        // if (!transections){
            sendRequest('/account/trxs/','GET','')
        // }
    },[])
    return ( 
        <div className="transection-section ">
                            <div className="transection-header">
                                <div className="transection-name">
                                    <span>Transections</span>
                                    <div className="filtered-date relative " onClick={() => {setDisplayFilter(true)}}>
                                        < FaCalendarCheck/>
                                        <span className="date">{selectedDate}</span>
                                    </div>
                                </div>

                                <div className="transection-search">
                                    <input type="search" name="" id="" placeholder="transection ref here" />
                                    {/* <div className="icon">ic</div> */}
                                    <FontAwesomeIcon icon={faSearch} className="dh- ts-icon"/>
                                </div>
                            </div>
                            {displayFilter && <div className="filter-container">
                                <div className=" relative">
                                    <FontAwesomeIcon icon={faMultiply} className="cancel" onClick={() => {setDisplayFilter(false)}}/>
                                </div>
                                <div className="sel-days">
                                    <div className={``} onClick={() => {handleDateSelection('today')}}>Today</div>
                                    <div className={``} onClick={() => {handleDateSelection('yesterday')}}>Yesterday</div>
                                    <div className={``} onClick={() => {handleDateSelection('thisWeek')}}>This Week</div>
                                    <div className={``} onClick={() => {handleDateSelection('lastWeek')}}>Last Week</div>
                                    <div className={``} onClick={() => {handleDateSelection('thisMonth')}}>This Month</div>
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
                                {filteredTrxs?.length > 0 ? (
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