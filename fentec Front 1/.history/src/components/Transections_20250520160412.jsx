import "../css/dashbord.css"
// import { FaBeer } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMultiply, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from "react";
import TransectionCard from "./TransectionCard";
import { liveContext } from "../customContexts/LiveContext";
import { FaArrowCircleDown, FaArrowCircleUp, } from "react-icons/fa";
import useCalenderFilterer from "../customHooks/useCalenderFilter";
const Transactions = () => {
    const {transections,sendRequest} = useContext(liveContext);
    const [filteredTrxs,setFilteredTrxs] = useState([]);

    const {CalenderDisplayer, CalenderScreen} = useCalenderFilterer(transections?.results,setFilteredTrxs);
    
    const nextPageRef = useRef(null);
    const transectionsRef = useRef(null);
    const refetchRef = useRef(null);

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


                // let trx_type = trx?.transaction_type == 'Deposite' ? true :
                //              trx?.transaction_type == 'Refund' ? true : false;
                
                // if (trx_type){ // its credit 
                //     console.log('trx_type: ', trx_type);
                //     total_credit += parseFloat(trx.amount);
                // } else{
                //     total_debit += parseFloat(trx.amount);
                // }
            }
);
            
            if (creditOrsum === 'credit'){
                return total_credit;
            }else if (creditOrsum === 'debit'){
                return total_debit;
            }
            return null 
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

                                    {/* show calender to filter trx  */}
                                    <>
                                        <CalenderDisplayer/>
                                    </>
                                </div>
                            </div>
                            
                            {/* <!-- filter transection --> */}
                                <CalenderScreen />

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