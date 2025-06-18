import React, { useContext, useState } from "react";
import { uiContext } from "../../customContexts/UiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PinsPage from "../PinsPage";
import useAlterSetting from "../../customHooks/settingHook";

const PaymentSettings = () => { 
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
    const {changePin,pinResetRequest} = useAlterSetting(setError,setSuccess,setEmailConfirmed);


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
        if (PoPPageAction === 'changePin'){
            changePin(formData);
        }else{
            pinResetRequest(formData,false);
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
        // Validation: Check if new pin and confirm pin match
        if (newPassword !== confirmPassword) {
            setError("New pin and confirm pin do not match.");
            setSuccess(false);
        } else if (newPassword.length < 4) {
            setError("New pin must be at least 4 characters long.");
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
                    Manage Payment Pins
                </div>
                <div className="t-sort-buttons">
                    <button className={`${checkActiveButton('changePin')}`}
                         onClick={() => {setPorPPageAction('changePin'),setDone()}}>Change pin</button>
                    <button className={`${checkActiveButton('resetPin')}`}
                         onClick={() => {setPorPPageAction('resetPin'),setDone()}}>Reset pin</button>
                </div>
            </div>
            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Success Message */}
            {success && (
                <>
                    <FontAwesomeIcon icon={faCircleCheck} shake title="show pin" className="action-succssfull"
                    />
                    <div className="success-message">
                    {success}
                    </div>
                </>
            )} 

           {!success && (PoPPageAction === 'changePin') &&  <form onSubmit={handleSubmit} className="password-change-form">
                    {/* Current pin */}
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current pin</label>
                        <input maxLength={4}
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter current pin"
                            required
                        />
                    </div>

                    {/* New pin */}
                    <div className="form-group relative">
                            <label htmlFor="newPassword">New pin</label>
                            <input maxLength={4}
                                type={password1Vis? 'text': 'password'}
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new pin"
                                required
                            />
                            <FontAwesomeIcon icon={password1Vis? faEye : faEyeSlash } title="show pin" className="pp-icon"
                                    onClick={(e) => {setPassword1Vis(!password1Vis)}}
                            />
                    </div>

                    {/* Confirm New pin */}
                    <div className="form-group relative">
                        <label htmlFor="confirmPassword">Confirm New pin</label>
                        <input maxLength={4}
                            type={password2Vis? 'text': 'password'} 
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new pin"
                            required
                        />
                         <FontAwesomeIcon icon={password2Vis? faEye : faEyeSlash } title="show pin" className="pp-icon"
                                onClick={(e) => {setPassword2Vis(!password2Vis)}}
                        />
                    </div>

                

                {/* Submit Button */}
                <button type="submit" className="submit-button">
                    Change pin
                </button>
            </form>}


            {/* reset pin page  */}
           {!success && (PoPPageAction === 'resetPin') &&  <form onSubmit={handleSubmit} className="password-change-form">
                {/* Current pin */}
                <div className="form-group relative">
                    <label htmlFor="currentPassword">Email</label>
                    <input
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
                    {/* New pin */}
                    <div className="form-group relative">
                        <label htmlFor="newPassword">New pin</label>
                        <input maxLength={4}
                            type={password1Vis? 'text': 'password'}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new pin"
                            required
                        />
                         <FontAwesomeIcon icon={password1Vis? faEye : faEyeSlash } title="show pin" className="pp-icon"
                                onClick={(e) => {setPassword1Vis(!password1Vis)}}
                        />
                    </div>

                    {/* Confirm New pin */}
                    <div className="form-group relative">
                        <label htmlFor="confirmPassword">Confirm New pin</label>
                        <input maxLength={4}
                            type={password2Vis? 'text': 'password'}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Enter new pin"
                            required
                        />
                         <FontAwesomeIcon icon={password2Vis? faEye : faEyeSlash } title="show pin" className="pp-icon"
                                onClick={(e) => {setPassword2Vis(!password2Vis)}}
                        />
                    </div>
                </>}

                {/* Submit Button */}
                {emailConfirmed && <button type="submit" className="submit-button">
                    Reset pin
                </button>}
            </form>}
                {!success && (!emailConfirmed && PoPPageAction === 'resetPin') && 
                <button type="submit" className="submit-button" onClick={() => {pinResetRequest({email})}}>
                    Confirm Your Email
                </button>}

             {/* insert pins here */}
             {insertPins && <PinsPage 
                toggleInsertPin={toggleInsertPin}
                insertPinAction = {confirmWithPins}
                digit={PoPPageAction === 'changePin' ? '4':'5'}
            />}

        </div>
    );
};

export default PaymentSettings;
