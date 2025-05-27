import "../css/dashbord.css"
// import { FaBeer } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMultiply, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from "react";
import TransectionCard from "./TransectionCard";
import { liveContext } from "../customContexts/LiveContext";
import { FaCalendarCheck } from "react-icons/fa6";
import { FaArrowCircleDown, FaArrowCircleUp, } from "react-icons/fa";
const Transactions = () => {
    const {transections,sendRequest} = useContext(liveContext);
    const [filteredTrxs,setFilteredTrxs] = useState([]);
    const {} 
    const  [displayFilter,setDisplayFilter] = useState(false);
    const nextPageRef = useRef(null);
    const transectionsRef = useRef(null);
    const refetchRef = useRef(null);

    const calender = useRef(null);
    const [selectedDate,setSelctedDate] = useState('All');

    useEffect(() => {
        if (transections){
            setFilteredTrxs(transections?.results)
        }
    },[transections])

    const refetch = (refetch_mode='next') => {
        let link_next = transections?.next; 
        let link_previous = transections?.previous; 

        switch (refetch_mode) {
            case 'next':
                if (link_next){
                    let url = new URL(link_next);
                    let next = `${url.pathname}${url.search}`;
                    console.log('link_next: ', next); 
                    sendRequest(next,'GET','',false)
                }
                return true;
            case 'previous':
                if (link_previous){
                    let url = new URL(link_previous);
                    let previous = `${url.pathname}${url.search}`;
                    console.log('link_prev: ', previous);
                    sendRequest(previous,'GET','')
                }
                return true;
            default:
                return true
        }
    }
    const findSum = (creditOrsum,data) => {
            // loop throgh the filteredTrxs and get the total credit
            let total_credit = 0
            let total_debit = 0
            data?.forEach((trx) => {
                console.log('trx.transection_type: ', trx.transaction_type
);
                let trx_type = trx.transaction_type == 'Deposite' ? true :
                             trx.transaction_type == 'Refund' ? true : false;
                
                if (trx_type){ // its credit 
                    console.log('trx_type: ', trx_type);
                    total_credit += parseFloat(trx.amount);
                } else{
                    total_debit += parseFloat(trx.amount);
                }
            })
            if (creditOrsum === 'credit'){
                return total_credit;
            }else if (creditOrsum === 'debit'){
                return total_debit;
            }
            return null 
}
    const handleCustomClick = () => {
        calender.current.classList.remove('hidden');
    }
    const handleDateSelection =(range,data,setData) => {
            setSelctedDate(range)

            // also calender selecetion 
            let calenderDate = new Date(range)
            let next_day = new Date(calenderDate)
            next_day.setDate(calenderDate.getDate() + 1)

            if (calenderDate !== 'Invalid Date'){
                let calender_data = data.filter(item => {
                    const itemDate = new Date(item.trx_date);
                    if (itemDate < next_day && itemDate >= calenderDate){
                        return item
                        
                    }
                })
                setData(calender_data);
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
                  return setData(data.filter(item => {
                    const itemDate = new Date (item.trx_date);
                    return itemDate >= Today ? item : null ;
                  }))

                case 'yesterday':
                    return setData(data.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        return (itemDate >= Yesterday && itemDate < Today)? item : null ;
                      }))

                case 'thisWeek':
                    let this_weekly = data.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if (itemDate >= ThisWeek){
                            return item
                        }});
                    return setData(this_weekly);

                case 'lastWeek':
                    let weekly = data.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if (itemDate >= LastWeek && itemDate < ThisWeek){
                            return item
                        }});
                    return setData(weekly);

                case 'thisMonth':
                    let this_month = data.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if ((itemDate.getMonth() -1) === Today.getMonth()-1){
                            return item
                        }
                    })
                    return setData(this_month);
                case 'lastMonth':
                    let last_month = data.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if ((itemDate.getMonth() -1) === Today.getMonth()-2){
                            return item
                        }
                    })
                    return setData(last_month);
                case 'clear':
                    setData(data)
                    setSelctedDate('All')

                default:
                    setDisplayFilter(false);
                    return true; // no filter
                }
            
    }

    useEffect(() => {
        if (!transections?.results.length){
            sendRequest('/account/trxs/','GET','',)
        }
    },[])

    useEffect(() => {
        if (refetch){
            refetchRef.current = refetch
        }
    },[refetch])
    useEffect(() => { // observe the data
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting &&  typeof refetchRef.current === 'function' ){
                    // refetchRef.current()
                    // console.log('nexting',);
                }
            })
        },
        {
            root : transectionsRef.current,
            threshold : 1.0
        }
    )
    if (nextPageRef.current) observer.observe(nextPageRef.current);
    },[])
    return ( 
        <div className="transection-section ">
                            <div className="transection-header">
                                <div className="flex justify-end">
                                    <div className="transection-name">
                                        <span>Transections</span>
                                    </div>

                                    <div className="transection-search">
                                        <>
                                            <input type="search" name="" id="" placeholder="transection ref here" />
                                            <FontAwesomeIcon icon={faSearch} className="dh- ts-icon"/>
                                        </>
                                    </div>
                                </div>

                                <div className="filter-trx flex justify-end">
                                    <span className="flex">
                                        <div className="total-flow relative flow-in" >
                                            < FaArrowCircleDown/>
                                            <span className="f-amount">{findSum('credit',filteredTrxs)}</span>
                                        </div>
                                        <div className="total-flow relative flow-out">
                                            < FaArrowCircleUp/>
                                            <span className="f-amount">{findSum('debit',filteredTrxs)}</span>
                                        </div>
                                    </span>
                                    <div className="filtered-date relative " onClick={() => {setDisplayFilter(true)}}>
                                        < FaCalendarCheck/>
                                        <span className="date">{selectedDate}</span>
                                    </div>
                                    
                                </div>
                            </div>
                            
                            {/* <!-- filter transection --> */}
                            {displayFilter && <div className="filter-container">
                                <div className=" relative">
                                    <FontAwesomeIcon icon={faMultiply} className="cancel" onClick={() => {setDisplayFilter(false)}}/>
                                </div>
                                <div className="sel-days">
                                    <div className={``} onClick={() => {handleDateSelection('today', transections?.results ,setFilteredTrxs)}}>Today</div>
                                    <div className={``} onClick={() => {handleDateSelection('yesterday', transections?.results ,setFilteredTrxs)}}>Yesterday</div>
                                    <div className={``} onClick={() => {handleDateSelection('thisWeek', transections?.results ,setFilteredTrxs)}}>This Week</div>
                                    <div className={``} onClick={() => {handleDateSelection('lastWeek', transections?.results ,setFilteredTrxs)}}>Last Week</div>
                                    <div className={``} onClick={() => {handleDateSelection('thisMonth', transections?.results ,setFilteredTrxs)}}>This Month</div>
                                    <div className={``} onClick={() => {handleDateSelection('lastMonth', transections?.results ,setFilteredTrxs)}}>Last Month</div>
                                    <div className={``} onClick={() => {handleDateSelection('clear', transections?.results ,setFilteredTrxs)}}>Clear</div>
                                    <div className={`flex`} onClick={handleCustomClick}>
                                        custom
                                        <input type='date' name="" id="date"  className="" ref={calender} onChange={(e) => {
                                            handleDateSelection(e.target.value,transections?.results ,setFilteredTrxs)
                                        }}/>
                                    </div>
                                </div>
                            </div>}

                            {/* <!-- transection cards  --> */}
                            <div className="transections custom-overflow" ref={transectionsRef}>
                                {filteredTrxs?.length > 0 ? (
                                    filteredTrxs.map((trx,index) => (
                                     <TransectionCard trx ={trx} key={index}/>
                                     
                                    ))
                                  ) : (
                                    <div className="empty-notification">
                                      <p>No Transection Found Yet!</p>
                                    </div>
                                )}
                                <div className="end" ref={nextPageRef} onClick={() => {refetch()}}>---The End----</div>
                            </div>
                    </div>
     );
}
 
export default Transactions;