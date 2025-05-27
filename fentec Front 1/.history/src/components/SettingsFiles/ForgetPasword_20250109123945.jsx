import React, { useContext, useState } from "react";
import "./LoggingSettings.css";
import { uiContext } from "../../customContexts/UiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PinsPage from "../PinsPage";
import useAlterSetting from "../../customHooks/settingHook";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const navigator = useNavigate();
    const [insertPins,setinsertPins] = useState(false);

    const [password1Vis,setPassword1Vis] = useState(false);
    const [password2Vis,setPassword2Vis] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [emailConfirmed ,setEmailConfirmed] = useState(false);
    const {forgetPassword,passwordForgetRequest} = useAlterSetting(setError,setSuccess,setEmailConfirmed);

    const toggleInsertPin = (e) => {
        setinsertPins(!insertPins);
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
            toggleInsertPin();
        }
    };

    const confirmWithPins = (pins) => {
        let formData = {
            email,
            password1 : newPassword,
            password2 : confirmPassword,
            currentPassword : currentPassword,
            pin : pins
        }
        forgetPassword(formData);
    }

    return (
        <div className="password-change-container">
            
             <div className="transection-header less-index">
                <div className="transection-name">
                    Password Tracker 
                </div>
                <div className="t-sort-buttons">
                    <button className={''}
                         onClick={() => {navigator('/register/')}}>Password Rememberd? </button>
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
                    <button className={''}
                        onClick={() => {navigator('/register/')}}>Login
                    </button>
                </>
            )} 

            {/* reset password page  */}
           {!success &&  <form onSubmit={handleSubmit} className="password-change-form">
                {/* Current Password */}
                <div className="form-group relative">
                    <label htmlFor="currentPassword">Email</label>
                    <input
                        type="email"
                        id="currentPassword"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your Email"
                        required
                        disabled={emailConfirmed?? ''}
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
                {!success && !emailConfirmed &&
                <button type="submit" className="submit-button" onClick={() => {passwordForgetRequest({email})}}>
                    Confirm Your Email
                </button>}
            

             {/* insert pins here */}
             {insertPins && <PinsPage 
                toggleInsertPin={toggleInsertPin}
                insertPinAction = {confirmWithPins}
                digit={'5'}
            />}
        </div>
    );
};

export default ForgetPassword;
