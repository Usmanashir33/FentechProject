import { useContext } from "react";
import { FaBell,FaCheckCircle, FaTrash } from "react-icons/fa";
import useRequest from "../customHooks/RequestHook";
import { liveContext } from "../customContexts/LiveContext";

const NotificationCard = ({notification}) => {
    const  {sendRequest} = useContext(liveContext);

    return ( 
    <div
        className={`notification-card ${notification.type}`}
      >
        <div className="notification-icon">
          {notification.type === "success" && <FaCheckCircle />}
          {notification.type === "promotion" && <FaBell />}
          {notification.type === "info" && <FaBell />}
        </div>

        <div className="notification-details">
          <h3>{notification.title}</h3>
          <p>{notification.body}</p>
          <span className="notification-time">{notification.date}</span>
        </div>
        <FaTrash className="delete-icon" onClick={(e) => {
          sendRequest(`/account/delete_notif/${notification.id}/`,'DELETE',null)
        }}/>
      </div>
     );
}
 
export default NotificationCard;