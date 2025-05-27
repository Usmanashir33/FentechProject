import { useContext, useState } from "react";
import { uiContext } from "../customContexts/UiContext";
import config from "../customHooks/ConfigDetails";
import { authContext } from "../customContexts/AuthContext";


const useRegister = (setVerifiedDetails,setVerifiedEmail,
    setOTPSent,setCompleteRegister,fData,setFormErrors) => {

    const Aborter = new AbortController();
    const {getCurrentUser} = useContext(authContext) ;
    const [redirectUrl,setRedirectUrl] = useState('')
    const [email,setEmail] = useState('') // store user email temporarily for login
    const {setFormLoading} = useContext(uiContext);

    const applyErrors = (error) => {
        setFormErrors(error)
        setTimeout(() => {
            setFormErrors('')
        }, 1000);
    }

    const updateFormUI = (response) => {

        console.log('response: ', response);
        if (response.success === "only_email_verified"){
            setVerifiedEmail(true) ;
            applyErrors('wronge password')

        }else if (response.success === 'email_sent'){
            setEmail(response.user_email)
            setVerifiedEmail(true);
            setOTPSent(true);
            setVerifiedDetails(true) ;
            setRedirectUrl(response.redirect_to)

        }else if (response.success === 'login'){
            setEmail(response.user_email)
            setVerifiedEmail(true);
            setOTPSent(false);
            setVerifiedDetails(true) ;
            setRedirectUrl(response.redirect_to)
        } else if (response.success === 'confirm_email'){
            // register successful we need to confirm the email 
            setCompleteRegister(true);
            setRedirectUrl(response.redirect_to)

        } else if (response.success === 'accountCreated'){
            // register successful we need to confirm the email 
            setRedirectUrl(response.redirect_to)
            setEmail(response.user_email) // for login purpose
            setCompleteRegister(true);

            fData['otp'] = response.login_otp ;
            fData['email'] = response.user_email;
            fData['redirect_to'] = response.redirect_to;

            // login user here 
            login(fData,'autoLogin');
        }
    }

    const register = (formdata) => {
        setFormLoading(true);
        setTimeout(() => {
            fetch(`${config.BASE_URL}/authuser/register/`,{
                signal : Aborter.signal ,
                method:"POST",
                headers : {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(formdata)
            }).then((resp) => {
                if (resp.ok){
                    return resp.json();
                }
                setFormLoading(false);
            })
            .then((data) => {
                if (data.success){
                    updateFormUI(data)
                } else if (data.error){
                    applyErrors(data.error)
                }
                setFormLoading(false);
                // grab response here 

            }).catch((err) => {
                 //    show error here 
                setFormLoading(false);
                applyErrors(err.message)
            })
            .finally(() => {
                setTimeout(() => {
                    setFormLoading(false)
                }, 1000);
            })
            }, 500);
            return (() => {Aborter.abort()})
    }

    const login = (formdata,autoLogin='') => {
        !autoLogin ? (formdata['email'] = email) : null
        setFormLoading(true);
        setTimeout(() => {
            fetch(`${config.BASE_URL}${!autoLogin ? redirectUrl : formdata['redirect_to']}`,{
                signal : Aborter.signal ,
                method:"POST",
                headers : {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(formdata)
            }).then((resp) => {
                if (resp.ok){
                    return resp.json();
                }
                setFormLoading(false);
            })
            .then((data) => {
                console.log('data: ', data);
                // grab response here 
                if (!data){
                    applyErrors('invalid details or OTP')
                }else if (data.access){
                    localStorage.setItem('a_token',data.access);
                    localStorage.setItem('r_token',data.refresh);
                    getCurrentUser();
                    // setIsAuthenticated(true);
                }
                // setFormLoading(false);

            }).catch((err) => {
                //    show error here 
                applyErrors(err.message)
                setFormLoading(false);
            })
            .finally(() => {
                setTimeout(() => {
                    setFormLoading(false)
                }, 1000);
            })
            }, 500);
            return (() => {Aborter.abort()})
    }

    const verifyDetails = (formdata) => {
        setFormLoading(true);
        setTimeout(() => {
            fetch(`${config.BASE_URL}/authuser/loginRequest/`,{
                signal : Aborter.signal ,
                method:"POST",
                headers : {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(formdata)
            }).then((resp) => {
                if (resp.ok){
                    return resp.json();
                }
                setFormLoading(false);
            })
            .then((data) => {
                // grab response here 
                setFormLoading(false);
                if (data.success){
                    updateFormUI(data)
                }else if (data.error){
                    applyErrors(data.error)
                }
            }).catch((err) => {
                setFormLoading(false);
                // show error here 
                applyErrors(err.message)
            })
            .finally(() => {
                setTimeout(() => {
                    setFormLoading(false)
                }, 1000);
            })
            }, 500);
            return (() => {Aborter.abort()})
    }
    const completeRegisterAccount = (formdata) => {
        console.log('formdata: ', formdata);
        console.log('redirectUrl: ', redirectUrl);
        setFormLoading(true);
        setTimeout(() => {
            fetch(`${config.BASE_URL}${redirectUrl}`,{
                signal : Aborter.signal ,
                method:"POST",
                headers : {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(formdata)
            }).then((resp) => {
                if (resp.ok){
                    return resp.json();
                }
                setFormLoading(false);
            })
            .then((data) => {
                setFormLoading(false);
                if (!data){
                    applyErrors('invalid details or OTP')
                }
                if (data.success){
                    updateFormUI(data)
                }
                // grab response here 

            }).catch((err) => {
                setFormLoading(false);
            //    show error here 
            })
            .finally(() => {
                setTimeout(() => {
                    setFormLoading(false)
                }, 500);
            })
            }, 500);
            return (() => {Aborter.abort()})
    }
    
    return ({register,login,verifyDetails,completeRegisterAccount});
}
 
export default useRegister;