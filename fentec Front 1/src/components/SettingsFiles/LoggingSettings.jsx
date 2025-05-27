import React, { useContext, useState } from "react";
import "./LoggingSettings.css";
import { uiContext } from "../../customContexts/UiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PinsPage from "../PinsPage";
import useAlterSetting from "../../customHooks/settingHook";

const LoggingSettings = () => {
    const [password1Vis,setPassword1Vis] = useState(false);
    const [password2Vis,setPassword2Vis] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const {PoPPageAction,setPorPPageAction} = useContext(uiContext);
    const [emailConfirmed ,setEmailConfirmed] = useState(false);
    const [insertPins,setinsertPins] = useState(false);
    const {changePassword,passwordResetRequest} = useAlterSetting(setError,setSuccess,setEmailConfirmed);


    const toggleInsertPin = (e) => {
        setinsertPins(!insertPins);
    }

    const checkActiveButton = (action) => {
        return action === PoPPageAction ? "active-btn" : ''
    }

    const confirmWithPins = (pins) => {
        let formData = {
            password1 : newPassword,
            password2 : confirmPassword,
            currentPassword : currentPassword,
            pin : pins
        }
        if (PoPPageAction === 'changePassword'){
            changePassword(formData);
        }else{
            passwordResetRequest(formData,false);
        }
    }
    const setDone = () => {
        setSuccess(false);
        setCurrentPassword('');
        setEmail('');
        setNewPassword('');
        setConfirmPassword('');
        setEmailConfirmed(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation: Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            setSuccess(false);
        } else if (newPassword.length < 8) {
            setError("New password must be at least 8 characters long.");
            setSuccess(false);
        } else {
            setError("");
            // Add your API call or backend logic here\
            // this is called the pin component 
            // confirmWithPins
            setinsertPins(true)
        }
    };

    return (
        <div className="password-change-container">
            
             <div className="transection-header less-index">
                <div className="transection-name">
                    Manage Password 
                </div>
                <div className="t-sort-buttons">
                    <button className={`${checkActiveButton('changePassword')}`}
                         onClick={() => {setPorPPageAction('changePassword'),setDone()}}>Change Password</button>
                    <button className={`${checkActiveButton('resetPassword')}`}
                         onClick={() => {setPorPPageAction('resetPassword'),setDone()}}>Reset Password</button>
                </div>
            </div>
            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Success Message */}
            {success && (
                <>
                    <FontAwesomeIcon icon={faCircleCheck} shake title="show password" className="action-succssfull"
                    />
                    <div className="success-message">
                    {success}
                    </div>
                </>
            )} 

           {!success && (PoPPageAction === 'changePassword') &&  <form onSubmit={handleSubmit} className="password-change-form">
                    {/* Current Password */}
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current Password</label>
                        <input maxLength={10}
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter current password"
                            required
                        />
                    </div>

                    {/* New Password */}
                    <div className="form-group relative">
                            <label htmlFor="newPassword">New Password</label>
                            <input maxLength={10}
                                type={password1Vis? 'text': 'password'}
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                required
                            />
                            <FontAwesomeIcon icon={password1Vis? faEye : faEyeSlash } title="show password" className="pp-icon"
                                    onClick={(e) => {setPassword1Vis(!password1Vis)}}
                            />
                    </div>

                    {/* Confirm New Password */}
                    <div className="form-group relative">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input maxLength={10}
                            type={password2Vis? 'text': 'password'} 
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                        />
                         <FontAwesomeIcon icon={password2Vis? faEye : faEyeSlash } title="show password" className="pp-icon"
                                onClick={(e) => {setPassword2Vis(!password2Vis)}}
                        />
                    </div>

                

                {/* Submit Button */}
                <button type="submit" className="submit-button">
                    Change Password
                </button>
            </form>}


            {/* reset password page  */}
           {!success && (PoPPageAction === 'resetPassword') &&  <form onSubmit={handleSubmit} className="password-change-form">
                {/* Current Password */}
                <div className="form-group relative">
                    <label htmlFor="currentPassword">Email</label>
                    <input
                        minLength={10}
                        type="email"
                        id="currentPassword"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your Email"
                        required
                    />
                    {emailConfirmed && <FontAwesomeIcon icon={faCircleCheck} title="verified email" className="pp-icon"
                        onClick={(e) => {setPassword2Vis(!password2Vis)}}
                    />}
                </div>
               {emailConfirmed &&  <>
                    {/* New Password */}
                    <div className="form-group relative">
                        <label htmlFor="newPassword">New Password</label>
                        <input maxLength={10}
                            type={password1Vis? 'text': 'password'}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                        />
                         <FontAwesomeIcon icon={password1Vis? faEye : faEyeSlash } title="show password" className="pp-icon"
                                onClick={(e) => {setPassword1Vis(!password1Vis)}}
                        />
                    </div>

                    {/* Confirm New Password */}
                    <div className="form-group relative">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input maxLength={10}
                            type={password2Vis? 'text': 'password'}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                        />
                         <FontAwesomeIcon icon={password2Vis? faEye : faEyeSlash } title="show password" className="pp-icon"
                                onClick={(e) => {setPassword2Vis(!password2Vis)}}
                        />
                    </div>
                </>}

                {/* Submit Button */}
                {emailConfirmed && <button type="submit" className="submit-button">
                    Reset Password
                </button>}
            </form>}
                {!success && (!emailConfirmed && PoPPageAction === 'resetPassword') && 
                <button type="submit" className="submit-button" onClick={() => {passwordResetRequest({email})}}>
                    Confirm Your Email
                </button>}

             {/* insert pins here */}
             {insertPins && <PinsPage 
                toggleInsertPin={toggleInsertPin}
                insertPinAction = {confirmWithPins}
                digit={PoPPageAction === 'changePassword' ? '4':'5'}
            />}

        </div>
    );
};

export default LoggingSettings;
