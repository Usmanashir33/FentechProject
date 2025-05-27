import React, { useState } from "react";
import { FaUserCircle, FaEdit, FaCheckCircle, FaTimesCircle, FaFileUpload } from "react-icons/fa";
import './ProfilePage.css';

const ProfilePage = () => {
  const [kycCompleted, setKycCompleted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Usman Ashir Muhammad",
    email: "example@gmail.com",
    phone: "+1234567890",
    accountNumber: "123456789012",
    balance: "$12,345.67",
  });

  const [kycForm, setKycForm] = useState({
    idProof: "",
    addressProof: "",
  });

  const handleKycSubmit = (e) => {
    e.preventDefault();
    setKycCompleted(true);
  };

  const handleEdit = () => setEditing(!editing);

  return (
    <div className="profile-container">
      {/* Header */}
      <header className="profile-header">
        <FaUserCircle className="user-icon" />
        <div>
          <h1>{userData.name}</h1>
          <p>{userData.email}</p>
          <p>{'+234 8166997172'}</p>
        </div>
      </header>

      {/* Account Info */}
      <div className="card account-info ">
        <h2>Account Info</h2>
        <div>
          <p><strong>Balance:</strong> {userData.balance}</p>
          <p><strong>Account Number:</strong> {userData.accountNumber}</p>
        </div>
      </div>

      {/* KYC Status */}
      <div className="card kyc-status account-info">
        <h2>KYC Status</h2>
        {kycCompleted ? (
          <div className="kyc-complete">
            <FaCheckCircle className="status-icon success" />
            <p>KYC Verified</p>
          </div>
        ) : (
          <div className="kyc-pending">
            <FaTimesCircle className="status-icon error" />
            <p>KYC Not Verified</p>
          </div>
        )}
      </div>

      {/* KYC Form */}
      {!kycCompleted && (
        <form className="kyc-form" onSubmit={handleKycSubmit}>
          <h3>Complete Your KYC</h3>
          <label>
            Upload ID Proof:
            <input
              type="file"
              onChange={(e) => setKycForm({ ...kycForm, idProof: e.target.files[0] })}
            />
          </label>
          <label>
            Upload Address Proof:
            <input
              type="file"
              onChange={(e) => setKycForm({ ...kycForm, addressProof: e.target.files[0] })}
            />
          </label>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      )}

      {/* Edit Profile */}
      <div className="card edit-profile account-info">
        <h2>Personal Details</h2>
        {editing ? (
          <div>
            <div className="flex">
              <label>
                Name: <input type="text" defaultValue={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
              </label>
              <label>
                Email: <input type="email" defaultValue={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
              </label>
              <label>
                Phone: <input type="tel" defaultValue={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
              </label>
            </div>
            <button onClick={handleEdit} className="save-btn">Save</button>
          </div>
        ) : (
          <div>
            div.flex
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <button onClick={handleEdit} className="edit-btn">
              <FaEdit /> Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
