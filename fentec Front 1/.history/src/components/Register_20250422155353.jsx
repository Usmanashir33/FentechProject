import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/register.css'
import '../css/airtimePage.css'
import {useEffect, useRef, useState } from "react";

import googleImage from  '../assets/google2.png'
import fentech from  '../assets/fentech.png'
import {faArrowRight, faCancel, faCheck, faEye, faEyeSlash, faLock, faMailBulk, faMultiply, faPhone, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import useRegister from '../customHooks/registerHooks';
import { Link } from 'react-router-dom';

const Register = () => {
    // const history = useHistory()
    const pwd1 = useRef('');
    const pwd2 = useRef('');
    const pwd3 = useRef('');
    const pwd4 = useRef('');
    const pwd5 = useRef('');
    const pwds =[ pwd1,pwd2,pwd3,pwd4,pwd5 ]
    const erorContainer = useRef(null)
    const [formErrors,setFormErrors] = useState('')


    const [password1Vis,setPassword1Vis] = useState(false);
    const [password2Vis,setPassword2Vis] = useState(false);
    const [ password2Incorrect,setPassword2Incorrect]= useState('')
    const [haveaccount,setHaveAccount] = useState(true);

    const [verifiedDetails,setVerifiedDetails] = useState(false);
    const [verifiedEmail,setVerifiedEmail] = useState(false);
    const [OTPSent,setOTPSent]= useState(false);
    const [completeRegister,setCompleteRegister] = useState(false);

    // const {logging,failed,login} = useLogin(resetForm);
    // const {registered,failedR,register} = useRegister(setHaveAccount);
    const [formDetails,setFormDetails] = useState({
        'username' : '','email':'','password':'','username_field' :'',
        'password2':'','refarrel_code':'','phone_number':'','otp':''
    })
    const {register,login,verifyDetails,completeRegisterAccount} = useRegister(
        setVerifiedDetails,setVerifiedEmail,setOTPSent,setCompleteRegister,formDetails,setFormErrors
    );

    const pinClicked = (e) => { 
        let pwd = e.target
        let num = e.target.value ;
        e.target.value = '' ; // store the value and empty the field to place it dynamically
        let empty_pwds = []
        const onlyDigitReg = /[1234567890]/ig;
        const numPressed = num.match(onlyDigitReg)
        if (numPressed){
            pwds.forEach((p) => {
                if(!p.current.value){
                    empty_pwds.push(p)
                }
            })
            if (empty_pwds.length > 1){
                empty_pwds[0].current.value = num
                empty_pwds[1].current.focus()
            }else {
                empty_pwds[0].current.value = num
            }
            formDetails['otp'] = `${pwd1.current.value}${pwd2.current.value}${pwd3.current.value}${pwd4.current.value}${pwd5.current.value}`
        }
    }
    
    const pinClearAll = () => {
        pwds.forEach((pwd) => {
            pwd.current? pwd.current.value = '' : null;
        })
    }
    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace'){
                pinClearAll()
            }
        })
        return document.removeEventListener('keydown', (e) => {})
    },[])
   
    const checkPassword = (e) => {
        if(formDetails['password'].length == e.target.value.length){
            if (formDetails['password'] !== e.target.value){
                setPassword2Incorrect('password miss matched');
            }
        }
        if (formDetails['password'] === e.target.value && !haveaccount){
            setPassword2Incorrect('');
        }
    }

    const handleSubmit = (e,action) => {
        e.preventDefault();
        const formdata = formDetails ;
        if (haveaccount  && !verifiedDetails && ! completeRegister){ // verify details
            verifyDetails(formdata);
        }
        else if (haveaccount  && verifiedDetails && ! completeRegister){ // login
            login(formdata);
        }
        else if (!haveaccount  && ! completeRegister){
            register(formdata)
        }
        else if (completeRegister){
            completeRegisterAccount(formdata);
        }
    }
    
    return ( 
         <div className="register custom-overflow relative">
            <div className="form-space custom-overflow relative">
                <div className="form-body ">
               {formErrors && <div className="form-errors flex" ref={erorContainer}>
                    <div>{formErrors}</div>
                    <FontAwesomeIcon icon={faMultiply} title="Password field" className="google-icon" onClick={
                        (e) => {erorContainer.current.classList.add('hidden'),console.log(document.querySelector('.form-errors'));}
                    }/>
                </div>}
                <div className="appnanme">Fentech</div>
                <div className=" app-welcome">Wellcome to the Latest Fentach</div>
                <span className="form-info">
                    Join our fentech app  to enjoy the seamless and efficient features
                </span>

                <form  className="register-form"  onSubmit={(e) => {handleSubmit(e,'verify')}}>
                {/* <form  className="register-form"> */}
                    {haveaccount &&  <label>
                        <FontAwesomeIcon icon={faUser} title="Password field" className="google-icon" />
                        <input type="text" required name="username_field" className="username"
                            disabled ={OTPSent? true : false}
                            onChange={(e) => {
                            setFormDetails(formDetails,formDetails['username_field'] = e.target.value)
                        }}
                        placeholder="username, email or phone number"/>
                        {/* <span className="google-icon">&#10003;</span> */}
                       {verifiedEmail && <FontAwesomeIcon icon={faCheck} title="verified email" className="google-icon-tick"
                        />}
                    </label>}

                    { !haveaccount && <label>
                        <FontAwesomeIcon icon={faUser} title="username field" className="google-icon"  />
                        <input type="text" required name="username" className="username"
                        disabled ={(OTPSent || completeRegister)? true : false}
                         onChange={(e) => {
                            setFormDetails(formDetails,formDetails['username'] = e.target.value)
                        }}
                        placeholder="username (e.g coinermk)"/>
                    </label>}

                    { !haveaccount && <label>
                        <FontAwesomeIcon icon={faMailBulk} title="Password field" className="google-icon" />
                        <input type="email" required name="email" className="email"
                        disabled ={(OTPSent || completeRegister)? true : false}
                         onChange={(e) => {
                            setFormDetails(formDetails,formDetails['email'] = e.target.value)
                        }}
                        placeholder="email (e.g coinermk@gmail.com)"/>
                    </label>}
                    { !haveaccount && !completeRegister && <label>
                        <FontAwesomeIcon icon={faPhone} title="Password field" className="google-icon" />
                        <input type="text" required name="phone_number" className="phone_number"
                         onChange={(e) => {
                            setFormDetails(formDetails,formDetails['phone_number'] = e.target.value)
                        }}
                        placeholder="phone number (e.g 816697172)"/>
                    </label>}
                    { !haveaccount && !completeRegister && <label>
                        <FontAwesomeIcon icon={faUserFriends} title="Password field" className="google-icon" />

                        <input type="text" name="refarrel_code" className="refarrel_code"
                         onChange={(e) => {
                            setFormDetails(formDetails,formDetails['refarrel_code'] = e.target.value)
                        }}
                        placeholder="invitation code (optional)"/>
                    </label>}

                    {(haveaccount || !completeRegister) && <label>
                        <FontAwesomeIcon icon={faLock} title="Password field" className="google-icon" />
                        <input type={password1Vis? 'text': 'password'} required 
                        onChange={(e) => {
                            setFormDetails(formDetails,formDetails['password'] = e.target.value)
                        }}
                        name="password" maxLength="14"
                        disabled ={OTPSent? true : false}
                        className="password" placeholder="password (alphanumeric)"/>
                        <FontAwesomeIcon icon={password1Vis? faEye : faEyeSlash } title="show password" className="google-icon"
                                onClick={(e) => {setPassword1Vis(!password1Vis)}}
                        />
                    </label>}
                    { !haveaccount && !completeRegister && <label>
                        <FontAwesomeIcon icon={faLock} title="Password field" className="google-icon" />

                        <input type={password2Vis? 'text': 'password'} required name="password" maxLength="14"
                            onChange={(e) => {
                                setFormDetails(formDetails,formDetails['password2'] = e.target.value)
                                checkPassword(e);
                            }}
                            className="password" placeholder="password again (alphanumeric)"/>
                            <FontAwesomeIcon icon={password2Vis? faEye : faEyeSlash } title="show password" className="google-icon"
                                onClick={(e) => {setPassword2Vis(!password2Vis)}}
                            />
                    </label>}

                    {(OTPSent )  && <div className="provide-pwd" style={{textAlign:'center'}}>
                        Write the OTP sent
                    </div>}
                    { (completeRegister )  && <div className="provide-pwd" style={{textAlign:'center'}}>
                        verify email with otp sent to the email
                    </div>}
                    
                    {(OTPSent  || completeRegister) && <div className=" select-account show-pin flex">
                            <input type="password" className ="pin-dis" id="pin-dig-1" maxLength="1"  ref={pwd1} autoFocus 
                                onChange={(e) => {
                                    pinClicked(e);
                        }}
                            />
                            <input type="password" className ="pin-dis" id="pin-dig-2" maxLength="1" ref={pwd2} 
                                onChange={(e) => {
                                    pinClicked(e);
                        }}
                            />
                            <input type="password" className ="pin-dis" id="pin-dig-3" maxLength="1" ref={pwd3} 
                                onChange={(e) => {
                                    pinClicked(e);
                        }}
                            />
                            <input type="password" className ="pin-dis" id="pin-dig-4" maxLength="1" ref={pwd4} 
                                onChange={(e) => {
                                    pinClicked(e);
                        }}
                            />
                            <input type="password" className ="pin-dis" id="pin-dig-5" maxLength="1" ref={pwd5} 
                                onChange={(e) => {
                                    pinClicked(e);
                        }}
                            />
                    </div>}
                    { password2Incorrect && <span className='pwd-miss'>
                        {password2Incorrect}
                    </span>}
                    
                    {(haveaccount  && !verifiedDetails && !completeRegister) && <button type="submit" className="login-btn"  >verify details </button>}
                    {!haveaccount && !completeRegister &&<button type="submit" className="login-btn">register</button>}
                    {completeRegister &&<button type="submit" className="login-btn">Complete Registration</button>}
                    {(haveaccount && verifiedDetails) && <button type="submit" className="login-btn" >login</button>}
                </form>

                <div className="or">
                    <div></div>
                    or
                    <div></div>
                </div>
                <label>
                    <button type="button" className="sign-with-google">
                        <img src={googleImage} alt="ggl" className="google-icon"/>
                        { haveaccount && <span> Signin with Google</span>}
                        { !haveaccount && <span> Signup with Google</span>}
                    </button>
                </label>

                {!haveaccount  && !OTPSent  && <div className="already-have-account">
                    Already have account? 
                    <span className="span-text" onClick={(e) => {setHaveAccount(true)}} >login</span>
                </div>}

                { haveaccount  && !OTPSent   && <div className="dont-have-account">
                    <Link to='/password-manager/' className="span-text">
                        forget password?
                    </Link>
                    <div>
                        Don't have account? 
                        <span className="span-text"  onClick={(e) => {setHaveAccount(false)}}>signup </span>
                    </div>
                </div>}

                </div>
                    <div className="join-with ">
                        <div className="pics">
                            <img src={googleImage} alt="ggl" className="google-icon"/>
                            <img src={googleImage} alt="ggl" className="google-icon"/>
                            <img src={googleImage} alt="ggl" className="google-icon"/>
                        </div>
                        <div className="join-t">
                            <span>Join With Many Users!</span> 
                            <span>Let's enjoy together</span> 
                        </div>
                        <div className="arrow-space">
                            <FontAwesomeIcon icon={faArrowRight} title="join us" className="arrow-icon" />
                        </div>
                    </div>
                </div>
            <div className="image-space">
                <img src={fentech} alt="ggl" className=""/>
            </div>
        </div>
    );
}
 
export default Register;