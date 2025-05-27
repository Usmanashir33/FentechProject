import successIcon from '../assets/successIcon.gif'
import failedIcon from '../assets/failedIcon.gif'
import pendingIcon from '../assets/pendingIcon.gif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faMultiply } from '@fortawesome/free-solid-svg-icons';

const TransectionStatus = ({TransectionDetails,setTransectionStatus}) => {
    const {status} = TransectionDetails ;

    return ( 
        <div className="transection-status-page absolute">
            <FontAwesomeIcon  icon={faMultiply} className="icon-color payment-status-icon" onClick={() => {
                setTransectionStatus('');
            }}/>
            
            <div className="hdr">
                <img src={
                    status === "success" ? successIcon :
                    status === "pending" ? pendingIcon : failedIcon
                } alt="s-pic"  />
                <div className={
                    status === "success" ? 'status-success' :
                    status === "pending" ? 'status-pending' : 'status-failed'
                } style={{fontWeight:'bold'}}>{status.toUpperCase()}</div>
            </div>

            <div className="transecion-details">
                {TransectionDetails && Object.entries(TransectionDetails).map(([key,value]) => (
                <div key={key}>
                    <span>{key} : </span>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>{value}</span>
                </div>
                ))}
            </div>
        </div>
     );
}
 
export default TransectionStatus;