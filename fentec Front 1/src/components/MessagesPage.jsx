import React, { useState } from "react";
import "./notification.css";

import { FaChevronLeft, FaSearch, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";

const MessagesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Support Team",
      content: "Your account statement for December is now available.",
      time: "10 mins ago",
      status: "unread",
    },
    {
      id: 2,
      sender: "Promo Team",
      content: "Exclusive Offer: Earn 10% cashback on deposits this week!",
      time: "1 hour ago",
      status: "unread",
    },
    {
      id: 3,
      sender: "Support Team",
      content: "Your KYC has been approved. Welcome onboard!",
      time: "Yesterday",
      status: "read",
    },
    {
      id: 4,
      sender: "Finance Department",
      content: "Your withdrawal request is being processed.",
      time: "2 days ago",
      status: "read",
    },
  ]);

  // Filter messages based on the search query
  const filteredMessages = messages.filter(
    (message) =>
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const markAsRead = (id) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, status: "read" } : message
      )
    );
  };

  return (
    <div className="messages-container ">
      {/* Header */}
      <header className="messages-header">
       
        <h1>Messages</h1>
      </header>

      {/* Search Bar */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Message List */}
      <div className="messages-list">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`message-card ${message.status}`}
              onClick={() => markAsRead(message.id)}
            >
              <div className="message-icon">
                {message.status === "unread" ? <FaEnvelope /> : <FaEnvelopeOpen />}
              </div>
              <div className="message-details">
                <h3>{message.sender}</h3>
                <p>{message.content}</p>
                <span className="message-time">{message.time}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-messages">
            <p>No messages found!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
