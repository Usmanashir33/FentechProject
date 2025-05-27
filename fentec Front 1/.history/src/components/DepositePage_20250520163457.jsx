import React, { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faMultiply,  } from "@fortawesome/free-solid-svg-icons";
import { liveContext } from "../customContexts/LiveContext";
import TransectionCard from "./TransectionCard";
import { FaAngleRight, FaCopy, FaCreditCard,FaUniversity } from "react-icons/fa";
import { authContext } from "../customContexts/AuthContext";

const DepositePage = () => {
  const DAccoHis = useRef();
  const {transections,sendRequest} = useContext(liveContext);
  const {currentUser} = useContext(authContext);

  const [depositeTrx,setDepositeTrx] = useState([])
  
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");
  const dateFilter = useRef(null);

  const copyToClipboard = (text,message) => {
    navigator.clipboard.writeText(text);
    setPopupText(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const dateSelected = (e) => {
    let range = new Date(e.target.value);
    let month  = range.getMonth()
    let year = range.getFullYear()
    const filteredTrx = transections?.results?.filter((trx) => {
      let trxYear = new Date(trx.trx_date).getFullYear();
      let trxMonth = new Date(trx.trx_date).getMonth();
      if (trxYear === year && trxMonth === month && trx.transaction_type === "Deposite"){
        return trx
      }
    })
    if (!e.target.value){ // clear 
      setDepositeTrx(transections?.results?.filter((trx) => trx.transaction_type=="Deposite"))
    }else{
      setDepositeTrx(filteredTrx);
    }
  }

  useEffect(() => {
    setDepositeTrx(transections?.results?.filter((trx) => trx.transaction_type=="Deposite"))
  },[transections])
  useEffect(() => {
    sendRequest('/account/trxs/','GET','')
  },[])

  
  return (
    <div className="withdrawal-container relative">
        <div className="transection-header header-send" style={{color:'white',borderRadius:'5px'}}>
            <h2 style={{color:'white'}}>Deposite Page</h2>
            <div className="t-sort-buttons">
            {<FontAwesomeIcon icon={faHistory} className="end-input"  onClick={(e) => {
                DAccoHis.current.classList.toggle('hidden');
            }}/>}
            </div>
        </div>

        <div className="a-dropdown DAccoHis custom-overflow  hidden"
            id='' ref={DAccoHis} style={{top:'30%'}}>
                <div className="d-header">
                    <div className="name">Deposite History</div>
                    <label htmlFor="dateFilter">At :    
                      <input type="month" ref={dateFilter} id="depoTrxFilter" className=" dateFilter"
                        onChange={(e) => {dateSelected(e)}}
                      />
                    </label>
                    <div className="c-icon" onClick={(e) => {
                        DAccoHis.current.classList.toggle('hidden')
                    }}>
                    <FontAwesomeIcon icon={faMultiply} className="v-icon"/>
                    </div>
                </div>

                <div className="d-body ">
                    <div className="navs ">

                        {depositeTrx && depositeTrx?.length > 0 ? (
                              depositeTrx.map((trx) => (
                               <TransectionCard trx ={trx}/>
                              ))
                            ) : (
                              <div className="empty-notification" key={trx.id}>
                                {transections?.length}
                                <p>No Deposite Found Yet!</p>
                              </div>
                        )}

                    </div>
                </div>
        </div>

      <div className="restore-info-section">
        <div><b>Available Methods </b></div>

        <div className="methods-sections"> 
          {/* account details section  */}
          <section style={{marginBottom:'4px'}}>
            <div className={`message-card`} >
              <div className="message-icon"><FaUniversity/></div>
              <div className="message-details  " style={{width:'100%'}}>
                <span className="message-time justify-end"> 
                  <span>Pay With Your Account Details </span>
                  <FaCopy onClick={() => copyToClipboard(`
                    Account No : ${currentUser?.account?.accountnumbers[0]?.account_number} 
                    Account Name : ${currentUser.account?.accountnumbers[0]?.bank_name} 
                    Bank Name : ${currentUser.account?.accountnumbers[0]?.bank_name} 
                    `,`Bank Details Copied`)} />

                </span>
                <h3 className=" justify-end">
                  <div >
                    <span className="">{currentUser?.account?.accountnumbers[0]?.account_number}</span>
                    <FaCopy onClick={() => copyToClipboard(
                      `${currentUser.account?.accountnumbers[0]?.bank_name}`,`Account Number Copied`)} />
                  </div>
                  <span>
                    {currentUser.account?.accountnumbers[0]?.bank_name || "No bank found"}
                  </span>
                </h3>
              </div>
            </div>
          </section>
          
          <section>
            <div className={`message-card`} >
              <div className="message-icon"><FaCreditCard/></div>
              <div className="message-details  " style={{width:'100%'}}>
                <span className="message-time justify-end"> 
                  <span>Pay With Card </span>
                  <FaAngleRight />
                </span>
               
              </div>
            </div>
          </section>
          
        </div>
      </div>
      {/* Popup */}
      {showPopup && <div className="popup" >{popupText}</div>}
    </div>
  );
};

export default DepositePage;
