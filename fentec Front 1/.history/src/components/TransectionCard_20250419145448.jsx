import { faEllipsisVertical, faMultiply, faReceipt, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useRef } from "react";
import './Transection.css'
import { BiArrowToBottom, BiArrowToTop, } from "react-icons/bi";
import { uiContext } from "../customContexts/UiContext";

const TransectionCard = ({trx}) => {
    const {
        amount,net_charges,status,
        transaction_type,
        payment_type,trx_date} = trx
    const {getFormattedDate} = useContext(uiContext)
    const cdref = useRef(null);

    const checkStatus = (statu) => {
        let status = statu.toLowerCase()
        return  status === 'success'? 't-completed' :
                status === 'pending'? 't-pending' :
                status === 'failed'? 't-failed' :' '
    }
    const chechCardType =(type) => {
        return  type === 'Deposite'? 't-in':
                type === 'Transfer-In'? "t-in" :
                type === 'Withdraw'? 't-out':
                type === 'Transfer-Out'? 't-out':
                type === 'Refund'?'t-in':''
    }
    return (
        
        <div className={`transection-card`}>
        {/* // <div className={`transection-card t-in`}> */}
            <div className={`service-icon ${chechCardType(transaction_type)}`}>
                {chechCardType(transaction_type) === 't-in'? <BiArrowToBottom />:<BiArrowToTop /> }
            </div>
            <div className="transection-col1 ">
                <div className="t-details flex ">
                        <span className="t-name">{transaction_type} </span>
                        <span className="t-date">{getFormattedDate(trx_date)}</span>
                </div>
            </div>
            {/* <div className="flex"> */}
                {/* <div className="t-status t-completed ">{status}</div> */}
                <div className={`t-status  ${checkStatus(status)} `}>{status}</div>
                <div className={`t-amount ${chechCardType(transaction_type)}`}>
                    {chechCardType(transaction_type) === 't-in'? "+" : '-' }
                    {amount}
                </div>
            {/* </div> */}

            {/* Dropdown */}
            <div className="dot3 relative">
                <FontAwesomeIcon icon={faEllipsisVertical} onClick={() => {
                    cdref.current.classList.toggle('hidden')
                }} className="v-icon" />
                <div className="t-dropdown dd custom-overflow hidden" id='t-dropdown' ref={cdref}>
                    <div className="d-header">
                        <div className="name">Manage Card</div>
                        <div className="c-icon" onClick={() => {
                            cdref.current.classList.toggle('hidden')
                        }}>
                            <FontAwesomeIcon icon={faMultiply} className="v-icon" />
                        </div>
                    </div>
                    <div className="d-body">
                        <div className="navs">
                            <div className="nav d-nav">
                                <FontAwesomeIcon icon={faReceipt} className="nav-icon" />
                                <span>View Details</span>
                            </div>
                            <div className="nav">
                                <FontAwesomeIcon icon={faShare} className="nav-icon" />
                                <span>Share Receipt</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransectionCard;
