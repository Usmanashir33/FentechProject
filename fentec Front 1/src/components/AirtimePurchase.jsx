import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/airtimePage.css"
import { faDiscourse } from "@fortawesome/free-brands-svg-icons/faDiscourse";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import mtn from '../assets/icons/mtn.jpg'
import airtel from '../assets/icons/airtel.png'
import etisalat from '../assets/icons/9mobile.png'
import glo from '../assets/icons/9mobile.png'

import successIcon from '../assets/successIcon.gif'
import failedIcon from '../assets/failedIcon.gif'
import pendingIcon from '../assets/pendingIcon.gif'

import recharge2CashIcon from '../assets/icons/recharge2CashIcon.gif'
import coinsIcon from '../assets/icons/coins.gif'
import scheduleIcon from '../assets/icons/scheduleIcon.gif'
import { faAngleDown, faBookAtlas, faClover, faCopy, faHistory, faMultiply, faReceipt, faShare, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../customContexts/AuthContext";
import { uiContext } from "../customContexts/UiContext";
import { faBuyNLarge } from "@fortawesome/free-brands-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import ConfirmPayment from "./ConfirmPayment";
import PinsPage from "./PinsPage";
import TransectionStatus from "./TransectionStatus";
const AirtimePurchase = () => {

    const {currentUser} = useContext(authContext) ;
    const {setLoading,airtimeOrData,setAirtimeOrData} = useContext(uiContext) ;
    
    const providerSelect = useRef(null);

    const [confirmPayment,setConfirmPayment] = useState(false);
    const [insertPins,setinsertPins] = useState(false);
    const [paymentDetails,setPaymentDetails] = useState({})


    const rNums = useRef(null);
    const AorDHis = useRef();

    const [providerSelected,setProviderSelected] = useState("mtn");
    const [amount,setAmount] = useState('');
    const [mobileNumber,setMobileNumber] = useState('');
    const [cashBack,setCashBack] = useState('');

    const [transectionStatus,setTransectionStatus] = useState('');
    const TransectionDetails = {
        transectionStatus,amount,mobileNumber
    }

    const toggleProviderSelect = (e) => {
        providerSelect.current.classList.toggle('hidden');
    }
    const toggleConfirmPayment = (e) => {
        setPaymentDetails({
            paymentType :'airtimeOrData',
            providerSelected,amount,
            mobileNumber,cashBack,
        })
        setConfirmPayment(!confirmPayment);
    }
    const toggleInsertPin = (e) => {
        setinsertPins(!insertPins);
    }
    // Function to determine the telecom provider
    function identifyTelecomProvider(phoneNumber) {
        let number = phoneNumber;
        // Extract the first 4 digits
        const prefix = phoneNumber.substring(0, 4);
        const prefix2 = phoneNumber.substring(0, 3);
        const possibleInuts = ['+234','234',] ;

        let foundNumbers = possibleInuts.find((num) => num === prefix)?? possibleInuts.find((num) => num === prefix2)
        foundNumbers? number = number.replace(foundNumbers,"") : null
        if (number.substring(0,1) !== "0"){
            number = '0'+ number
        }
        // to make sure it looks 081,090 etc
        setMobileNumber(number);

        // Prefix lists
        const mtnPrefixes = [
            "0803", "0806", "0703","0706","0704", "0813", "0814", "0816", "0903", "0906", "0913", "0916"
        ];
        const gloPrefixes = [
            "0805", "0807", "0705", "0811", "0815", "0905", "0915"
        ];
        const etisalatPrefixes = [
            "0809", "0817", "0818", "0909", "0908"
        ];
        const airtelPrefixes = [
            "0802", "0808", "0701", "0708", "0812", "0901", "0902", "0904", "0907", "0912"
        ];

        const Lastprefix = number.substring(0, 4);
        // Match the prefix to a provider
        if (mtnPrefixes.includes(Lastprefix)) {
            setProviderSelected('mtn');
            return "MTN";
        } else if (gloPrefixes.includes(Lastprefix)) {
            setProviderSelected('glo');
            return "GLO";
        } else if (etisalatPrefixes.includes(Lastprefix)) {
            setProviderSelected('etisalat');
            return "9mobile";
        } else if (airtelPrefixes.includes(Lastprefix)) {
            setProviderSelected('airtel');
            return "Airtel";
        } else {
            return "Unknown provider";
        }
    }
    const setPhoneNum = (e) => {
         // Allow only numeric input and limit to 5 digits
         const inputValue = e.target.value;
         if (/^\d*$/.test(inputValue) && inputValue.length <= 11) {
            setMobileNumber(e.target.value)
            if (e.target.value.length >= 4){
                identifyTelecomProvider(e.target.value)
            }
        }
    }
    const setAmountTyped = (input) => {
         // Allow only numeric input and limit to 5 digits
         if (/^\d*$/.test(input) && input.length <= 6) {
            setAmount(input)
        }
    }
    const selectBrand = (brandName) => {
        setProviderSelected(brandName);
        toggleProviderSelect();
    }
    const makePayment = (e) => {
        // check all the required fields if filled 
        setLoading(true);
        
        if (providerSelected && amount && mobileNumber){
            toggleConfirmPayment();
        }
        setTimeout(() => {
            setLoading(false)
        }, 1500);

    }
    return ( 
        <div className="airtimePage  relative custom-overflow">

            {transectionStatus && 
                <TransectionStatus TransectionDetails={TransectionDetails}
                setTransectionStatus ={setTransectionStatus}
            />}

            <div className="airtime-header">
                <div className="">
                    <FontAwesomeIcon  icon={faBuyNLarge} className=""/>
                    <span><b> Buying {airtimeOrData.toUpperCase()}</b></span>
                </div>
                <FontAwesomeIcon  icon={faHistory} className=" icon-color"  onClick={(e) => {
                                    AorDHis.current.classList.toggle('hidden')
                    }}/>
            </div>
            <div className="a-dropdown AorDHis custom-overflow  hidden"id='' ref={AorDHis}>
                <div className="d-header">
                    <div className="name">Airtime / Data History</div>
                    <div className="c-icon" onClick={(e) => {
                                    AorDHis.current.classList.toggle('hidden')
                    }}>
                    <FontAwesomeIcon icon={faMultiply} className="v-icon"/>
                    </div>
                </div>
                <div className="d-body ">
                    <div className="navs ">
                        <div className="nav d-nav justify-end">
                            <span className="justify-end">
                                <FontAwesomeIcon icon={faUser} className="nav-icon"/>
                                <span> 081 6699 7172</span>
                            </span>
                             <FontAwesomeIcon icon={faMultiply} className="v-icon"/>
                        </div>
                        <div className="nav d-nav justify-end">
                            <span className="justify-end">
                                <FontAwesomeIcon icon={faUser} className="nav-icon"/>
                                <span> 081 6699 7172</span>
                            </span>
                             <FontAwesomeIcon icon={faMultiply} className="v-icon"/>
                        </div>
                       
                    </div>
                </div>
        </div>

            <div className="n-form-sec">
                <div className="n-form relative">
                    <div className="number-brand flex" >
                        <span  className="selected-brand-sec flex" onClick={() => {
                            toggleProviderSelect();
                        }}>
                            <img src={
                                providerSelected === 'mtn'? mtn :
                                providerSelected === 'airtel'? airtel :
                                providerSelected === 'etisalat'? etisalat : glo

                            } alt="" className="b-selected-image"/>
                                {providerSelected.toUpperCase()}
                            <FontAwesomeIcon  icon={faAngleDown} className=" icon-color"/>
                        </span>
                        <div className="dot relativ borde">

                            <div className="t-dropdown a-dropdow dd custom-overflow  hidden"id='t-dropdown' ref={providerSelect}>
                                <div className="d-header">
                                    <div className="name">Seclect Network</div>
                                    <div className="c-icon">
                                        <FontAwesomeIcon  icon={faMultiply} className="icon-color" onClick={() => {
                                            toggleProviderSelect();
                                        }}/>
                                    </div>
                                </div>
                                <div className="d-body">
                                    <div className="services-provider-items ">
                                        <div>
                                            <img src={mtn} alt="" className="t-imag"  onClick={() => {selectBrand("mtn")}}/>
                                            <img src={airtel} alt="" className="t-imag"  onClick={() => {selectBrand("airtel")}}/>
                                        </div>
                                        <div>
                                            <img src={etisalat} alt="" className="t-imag"  onClick={() => {selectBrand("etisalat")}}/>
                                            <img src={glo} alt="" className="t-imag"  onClick={() => {selectBrand("glo")}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input type="number" maxLength={11}  name="" id=""
                         className="custom-amount" placeholder="0XXX XXX XXX"  value={mobileNumber}
                         onChange={(e) => {setPhoneNum(e)}}
                          autoFocus/>
                    </div>
                        <FontAwesomeIcon icon={faBook} className="icon-color"  onClick={(e) => {
                         rNums.current.classList.toggle('hidden')
                        }}/>
                </div>
                
                <div className="a-dropdown custom-overflow  hidden"id='' ref={rNums}>
                            <div className="d-header">
                                <div className="name">Recent phone numbers</div>
                                <div className="c-icon" onClick={(e) => {
                                    rNums.current.classList.toggle('hidden')
                                }}>
                                <FontAwesomeIcon icon={faMultiply} className="v-icon"/>
                                </div>
                            </div>
                            <div className="d-body ">
                                <div className="navs ">
                                    <div className="nav d-nav">
                                        <FontAwesomeIcon icon={faUser} className="nav-icon"/>
                                        <span> 081 6699 7172</span>
                                    </div>
                                    <div className="nav">
                                        <FontAwesomeIcon icon={faShare} className="nav-icon"/>
                                        <span>Share Reciept</span>
                                    </div>
                                </div>
                            </div>
                </div>

                <div className="n-form-title">
                    Enjoy some discount by doing transections with our app 
                </div>
            </div>

            <div className="cards-sec">
                <div> 
                    <span className="">
                        <FontAwesomeIcon  icon={faClover} className="icon-color"/>
                    </span>
                    <span className="t-text"> Sweet Packages </span>
                </div>

                { (airtimeOrData === "Airtime") && <div className="a-cards">
                    <div className="a-card " onClick={() => {setAmountTyped("50")}}>
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>₦ 50</span>
                        <span className="cashback">N2 Cashback</span>
                    </div>
                    <div className="a-card" onClick={() => {setAmountTyped("100")}}>
                        {/* <span className="a-amont"> N 100</span> */}
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>₦ 100</span>
                        <span className=" cashback" >N2 Cashback</span>
                    </div>
                    <div className="a-card" onClick={() => {setAmountTyped("200")}}>
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>₦ 200</span>
                        <span className="cashback" >N2 Cashback</span>
                    </div>
                    <div className="a-card" onClick={() => {setAmountTyped("500")}}>
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>₦ 500</span>
                        <span className="cashback" >N2 Cashback</span>
                    </div>
                    <div className="a-card" onClick={() => {setAmountTyped("1000")}}>
                        {/* <span className="a-amont"> N 1000</span> */}
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>₦ 1000</span>
                        <span className="cashback" >N2 Cashback</span>
                    </div>
                    <div className="a-card" onClick={() => {setAmountTyped("2000")}}>
                        {/* <span className="a-amont"> N 2000</span> */}
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>₦ 2000</span>
                        <span className="cashback" >N2 Cashback</span>
                    </div>
                </div>}

                <div className="a-form ">
                    {/* <span> */}
                        <span style={{ fontSize: "20px", fontWeight: "bold",color:'blue', marginRight:'-7px',paddingTop:'8px'}}>₦ </span>
                        <input type="number"className='custom-amount ' 
                        placeholder=" custom-amount (50-1000)" value={amount}
                        onChange = {(e) => {setAmountTyped(e.target.value)}}/>
                    {/* </span> */}
                        <button type="button" className="pay-btn" onClick={(e) => {makePayment(e)}}>Pay</button>
                </div>

                <div className="available-cashback">
                    <div className="coins-icon">
                        <img src={coinsIcon} alt="pic" className=""/>
                        <span className="orange">10 points </span>
                        <span className="s-bold">available</span>
                    </div>
                    <span> <FontAwesomeIcon  icon={faAngleDown} className=" icon-color"/> </span>
                </div>

            </div>

            <div className="airtime-services  ">
                <div className="a-services  ">
                        <div className="transection-card s-card">
                            <div className="transection-col1">
                                <img src={scheduleIcon} alt="pic" className="t-image"/>
                                <div className="t-details">
                                    <span className="t-name"> Schedule top up</span>
                                    <span className="t-date">Never run out of airtime</span>
                                </div>
                            </div>
                            <div className="dot3"><FontAwesomeIcon  icon={faAngleDown} className=" icon-color"/></div>
                        </div>

                        <div className="transection-card s-card ">
                            <div className="transection-col1">
                                <img src={recharge2CashIcon} alt="pic" className="t-image"/>
                                <div className="t-details">
                                    <span className="t-name"> Recharge to Cash</span>
                                    <span className="t-date">sell airtime to get cash</span>
                                </div>
                            </div>
                            <div className="dot3"><FontAwesomeIcon  icon={faAngleDown} className=" icon-color"/></div>
                        </div>
                </div>
            </div>

            {/* confirm payment  */}
            {confirmPayment && <ConfirmPayment 
                togglePaymentPage = {toggleConfirmPayment} 
                toggleInsertPin={toggleInsertPin} 
                paymentDetails={paymentDetails}
            />}

            {/* insert pins here */}
            {insertPins && <PinsPage 
                toggleInsertPin={toggleInsertPin}
            />}

        </div> 
     );
}
 
export default AirtimePurchase;