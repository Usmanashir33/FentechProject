import "./notification.css";

import { FaBell, FaChevronLeft, FaCheckCircle, FaTrash } from "react-icons/fa";
import NotificationCard from "./NotificationCard";
import { useContext, useEffect, useRef } from "react";
import { liveContext } from "../customContexts/LiveContext";

const NotificationPage = () => {
  const {notifications,sendRequest} = useContext(liveContext)
  const deleteDialog = useRef(null)
  useEffect(() => {
    const unread = notifications.filter(notification => notification.viewed === false);
    if (unread.length > 0){ // read un read ones
      sendRequest('/account/read_notif/','GET','')
    }
  },[])
  return (
    <div className="notification-container">
      {/* Header */}
      <header className="notification-header">
        <h1>Notifications</h1>
        <FaBell className="header-icon delete-all-bell"title="delete all " onClick={(e) => {deleteDialog.current.showModal()}}/>
          
      </header>

        <dialog ref={deleteDialog} className="confirmation-dialog">
            <h3> Are you Sure?</h3>
            <p>You Want Permanently Delete All Notifications </p>
            <div className="buttons">
              <button className="confirm "  onClick={() => {
                deleteDialog.current.close()
                sendRequest(`/account/delete_notifs/`,'GET',null);

              }}>Confirm</button>
              <button className="cancel " onClick={(e) => {
                deleteDialog.current.close()
              }}>Cancel</button>
            </div>
        </dialog>

      {/* Notification List */}
      <div className="notification-list">
        {(notifications && notifications.length > 0) ? (
          notifications.map((notification) => (
           <NotificationCard notification = {notification} key={notification.id}/>
          ))
        ) : (
          <div className="empty-notification">
            <p>No notifications yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
