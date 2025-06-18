import './setBankDialog.css'
import {useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useExRequest from '../customHooks/ExternalRequestHook';
import { MdCancel } from 'react-icons/md';


const SetBankDialog = ({setDialog,toggleInsertPin,dialogAction = null}) => {
    const url = '/account/setting_withdrowal_acc/'
    const bottomRef = useRef(null)
    const [accountNumber, setAccountNumber] = useState("");
    const [selectedBank, setSelectedBank] = useState(null);
    const [accountName, setAccountName] = useState(""); 
    const [isVerified, setIsVerified] = useState(null);
    const [bankSearch, setBankSearch] = useState("");
    const [errorAccount, setErrorAccount] = useState(false);
    const {sendExRequest} = useExRequest();
    const [banks, setBanksData] = useState([]);

    const banksObtained = (data) => {
      let banks = JSON.parse(data.banks);
      setBanksData(banks.data);
    }

    const handleSaveAccount = (e) => {
      let formdata = {
        account_number: accountNumber,
        account_name : accountName,
        bank_code: selectedBank.code,
        bank_name: selectedBank.name,
      };
      toggleInsertPin();
      dialogAction(formdata);
    }
    const verifyAccountObtained = (data) => {
      let resp = JSON.parse(data?.account_fetched);
      console.log('resp: ', resp);
      setAccountName(resp?.data?.account_name);
      if (resp?.data?.account_name){
        setIsVerified(true);
      } else {  
        setIsVerified(false);
      }
      if (resp?.status === "error"){
        setErrorAccount(true);
      } else {  
        setErrorAccount(false);
      }
    }
   
    useEffect(() => {
      if (accountNumber.length === 10 && selectedBank) {
        let formdata = {
          action: 'verifyBank',
          account_number: accountNumber,
          bank_code: selectedBank.code,
          bank_name: selectedBank.name,
        };
        sendExRequest(url,"POST",formdata,verifyAccountObtained)
      }
    },[accountNumber, selectedBank])

    useEffect(() => {
      sendExRequest(url,"POST",{'action':'fetchBanks'},banksObtained)
    },[])

    // for scrolling efect 
    useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [isVerified , errorAccount]);

    const handleBankSelect = (bank) => {
      setBankSearch(bank.name);
      setSelectedBank(bank);
    };
  
    const filteredBanks = banks?.filter((bank) =>
      bank.name.toLowerCase().includes(bankSearch.toLowerCase())
    );
    const selectionDone =filteredBanks.find(({name}) => name.toLowerCase() === bankSearch.toLowerCase())
  
    // if (!open) return null;
    
    return (
          <div className="dialog-box custom-overflow">
            <div className="dialog-header flex justify-between">
              <h2 className="dialog-title">Set New Withdrawal Account</h2>
              <h3 className="icon-color" onClick={() => {setDialog(false)}}>
                <MdCancel/>
              </h3>
            </div>
    
            <div className="dialog-body">
              <div className="form-group">
                <label>Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter 10-digit account number"
                  maxLength={11}
                  className="form-input"
                />
              </div>
    
              <div className="form-group">
                <label>Select Bank</label>
                <div className="">
                  <input
                    type="text"
                    className="dropdown-search"
                    placeholder="Search bank..."
                    value={bankSearch}
                    onChange={(e) => setBankSearch(e.target.value)}
                  />
                 { !selectionDone && <ul className="dropdown-list">
                    {filteredBanks.length > 0 ? (
                      filteredBanks.map((bank) => (
                        <li
                          key={bank.id}
                          className="dropdown-item"
                          onClick={() => handleBankSelect(bank)}
                        >
                          {bank.name}
                        </li>
                      ))
                    ) : (
                      <li className="dropdown-item">No banks found</li>
                    )}
                  </ul>}
                </div>
              </div>
    
              {(isVerified || errorAccount) && (
                <div className="account-name-display">
                  <div className="account-name">{accountName? accountName:"Account Not Found"}</div>
                  <div className="verification-ico">
                    {isVerified ? (
                      <FaCheckCircle className="icon-success" />
                    ) : (
                      <FaTimesCircle className="icon-failure" />
                    )}
                  </div>
                </div>
              )}
    
              {isVerified && <button className="btn-save" onClick={(e) => {handleSaveAccount(e)}}>Proceed Save Account</button>}
            </div>
            {(isVerified || errorAccount) && <div className="scrolltome" ref={bottomRef}></div>}
          </div>
      );
}
 
export default SetBankDialog;