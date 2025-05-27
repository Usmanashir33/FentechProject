import React from 'react';
import './AvailableBankCard.css';
import { faBank, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BankAccountCard = ({ account ,isSelected=false,actionFunc=null}) => {
  const deleteAccount = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the card
    // Logic to delete the account
    actionFunc(account.id)
  }
  return (
    <div className="card">
      {/* Left: Bank Icon */}
        <FontAwesomeIcon icon={faBank} className="icon bank-icon" />

      {/* Middle: Account Info */}
      <div className="card-info">
        <div className="account-name">{account.account_name}</div>
        <div className="account-number">
          <strong>{account.account_number}</strong>
        </div>
        <div className="bank-inf">
            {account.bank_name} 
        </div>
        <div className="date-created">
           Created: {new Date(account.date_created).toLocaleString()}
        </div>
      </div>

      {/* Right: Delete Icon */}
        {!isSelected && <FontAwesomeIcon icon={faTrashAlt} className="icon delete-icon icon" onClick={(e) => {deleteAccount(e)}}/>}
    </div>
  );
};

export default BankAccountCard;
