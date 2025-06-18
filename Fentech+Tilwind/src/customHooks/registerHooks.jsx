import { useContext, useState } from "react";
import { uiContext } from "../customContexts/UiContext";
import config from "../customHooks/ConfigDetails";
import { authContext } from "../customContexts/AuthContext";


const useRegister = (setOTPSent,registerOtpSent,setRedirectUrl) => {

    const Aborter = new AbortController();
    const {setCurrentUser,setIsAuthenticated} = useContext(authContext) ;
    const {isLoading,setIsLoading,setError,setSuccess} = useContext(uiContext);

    const applyErrors = (error) => {
        setTimeout(() => {
        }, 1000);
    }

    const updateFormUI = (response) => {

        console.log('response: ', response);
        if (response.success === "confirm_email"){
            // user exist we need to verify Email
            registerOtpSent(true) ;
            setRedirectUrl(response.redirect_to)

        }else if (response.success === 'otp_sent'){
            registerOtpSent(true) ;
            setRedirectUrl(response.redirect_to)
        }else if (response.success === 'accountCreated'){
            setCurrentUser(response.data?.user)
            localStorage.setItem('a_token',response.data?.tokens?.access);
            localStorage.setItem('r_token',response.data?.tokens?.refresh);
            setIsAuthenticated(true);
        }
    }

    const register = (formdata) => {
        setIsLoading(true);
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
            })
            .then((data) => {
                setIsLoading(false);
                if (data.success){
                    updateFormUI(data)
                } else if (data.error){
                    setError(data.error)
                }
            }).catch((err) => {
                 //    show error here 
                setIsLoading(false);
                applyErrors(err.message)
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
            })
            }, 500);
            return (() => {Aborter.abort()})
    }

    const login = (formdata,url) => {
        setIsLoading(true);
        setTimeout(() => {
            fetch(`${config.BASE_URL}${url}`,{
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
            })
            .then((data) => {
                // grab response here 
                setIsLoading(false);
                if (data.error ){
                    return setError(data.error)
                }
                if (data.success && data.success !== "otp_sent"){
                    setSuccess(data.success)
                    setCurrentUser(data.data?.user)
                    localStorage.setItem('a_token',data.data?.tokens?.access);
                    localStorage.setItem('r_token',data.data?.tokens?.refresh);
                    setIsAuthenticated(true);
                }else{ // its otp reqiest
                    setOTPSent(true)
                }

            }).catch((err) => {
                setIsLoading(false);
                setError(err.message)
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
            })
            }, 500);
            return (() => {Aborter.abort()})
    }

    
    const completeRegisterAccount = (formdata,redirectUrl) => {
        setIsLoading(true);
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
            })
            .then((data) => {
                setIsLoading(false);
                if (data.error ){
                    setError(data.error)
                }
                if (data.success){
                    updateFormUI(data)
                }

            }).catch((err) => {
                setIsLoading(false);
                //    show error here 
                setError(err.message)
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false)
                }, 500);
            })
            }, 500);
            return (() => {Aborter.abort()})
    }
    
    return ({register,login,completeRegisterAccount,});
}
 
export default useRegister;