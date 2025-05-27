import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faMultiply } from "@fortawesome/free-solid-svg-icons";
import { useContext} from "react";
import { authContext } from "../customContexts/AuthContext";

const ConfirmTransferDetails = ({togglePaymentPage,toggleInsertPin,paymentDetails}) => {
    const {amount,bank} = paymentDetails;
    const {currentUser} = useContext(authContext);

    return ( 
        <div className="confirm-payment-plate ">
                <div className="c-text">Confirm Payment Details </div>
                <div className="cancel-icon">
                    <FontAwesomeIcon  icon={faMultiply} className="" onClick={() => {
                        togglePaymentPage();
                    }}/>
                </div>
                <div className="c-amount">N {amount}</div>

                <div className="b-card">

                    {<div className="flex">
                        <span>Amount </span>
                        <span>{amount??'null'} </span>
                    </div>}

                    { <div className="flex">
                        <span>Recipient Name </span>
                        <span>{bank?.account_name.toUpperCase()??'null'} </span>
                    </div>}
            
                    { <div className="flex">
                        <span>Account Number</span>
                        <span>{bank?.account_number}</span>
                    </div>}
                    
                    { <div className="flex">
                        <span>Receiver Bank </span>
                        <div className="flex gap-10" >
                            <span> {bank.bank_name}</span>
                        </div>
                    </div>}
                    {<div className="flex">
                        <span>Cashback </span>
                        <span>{'cashBack'}</span>
                    </div>}
                    {<div className="flex">
                        <span>Payment Note </span>
                        <span>{'note'}</span>
                    </div>}
                </div>

                <div className="user-points flex">
                    <span>Cashacks</span>
                    <div>
                        <span>N {'cashBack'} availale</span>
                        <input type="checkbox" name="" id="" className="user-points-check" defaultChecked />
                    </div>
                </div>
                <div className="payment-method flex">
                    <span>Payment Method </span>
                    <span className='see-all-font'>  all  </span>
                </div>
                <div className=" select-account flex">
                    <div>
                        <span><FontAwesomeIcon  icon={faAngleDown} className=" icon-color"/> </span>
                        <span>Balance {`(N ${currentUser?.account?.account_balance})`}</span>
                    </div>
                    <div className="tick-icon">gd</div>
                </div>
                <button type="button" className="confirm-pay-btn" 
                    onClick={(e) => {toggleInsertPin()}}
                >Confirmed Details </button>
         </div>
    );
}
 
export default ConfirmTransferDetails;