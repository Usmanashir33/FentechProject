import { useContext, useState } from "react";
import { uiContext } from "../customContexts/UiContext";
import config from "../customHooks/ConfigDetails";
import { authContext } from "../customContexts/AuthContext";


const useAlterSetting = (setError,setSuccess,setEmailConfirmed) => {

    const Aborter = new AbortController();
    const {getCurrentUser,getToken} = useContext(authContext) ;
    const [redirectUrl,setRedirectUrl] = useState('')

    const {setLoading} = useContext(uiContext);

    const applyErrors = (error) => {
        setError(error)
        setTimeout(() => {
            setError('');
        }, 1000);
    }

    const acceptSuccessResp = (response) => {
        if (response.success === 'confirm_email'){
            setRedirectUrl(response.redirect_to);
            setEmailConfirmed(true);

        } else {
            setSuccess(response.success) ;
        }
    }

    const changePassword = async (formdata) => {
        setLoading(true);
        let token = await getToken()
        if (!token) {
            return setError('Try again later')
        }
        setTimeout(() => {
            fetch(`${config.BASE_URL}/authuser/password-change/`,{
                signal : Aborter.signal,
                method:"POST",
                headers : {
                    "Content-Type":"application/json",
                    Authorization : `Bearer ${token}`
                },
                body:JSON.stringify(formdata)
            }).then((resp) => {
                if (resp.ok){
                    return resp.json();
                }
                setLoading(false);
            })
            .then((data) => {
                if (data.success){
                    acceptSuccessResp(data)
                } else if (data.error){
                    applyErrors(data.error)
                }
                setLoading(false);

            }).catch((err) => {
                 //    show error here 
                setLoading(false);
                applyErrors(err.message)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
            }, 500);
            return (() => {Aborter.abort()})
    }
    const passwordResetRequest = async (formdata,initialCall = true) => {
        setLoading(true);
        let token = await getToken()
        if (!token) {
            return setError('Try again later')
        }
        setTimeout(() => {
            fetch(`${config.BASE_URL}${initialCall? '/authuser/password-reset-request/':redirectUrl}`,{
                signal : Aborter.signal,
                method:"POST",
                headers : {
                    "Content-Type":"application/json",
                    Authorization : `Bearer ${token}`
                },
                body:JSON.stringify(formdata)
            }).then((resp) => {
                if (resp.ok){
                    return resp.json();
                }
                setLoading(false);
            })
            .then((data) => {
                if (data.success){
                    acceptSuccessResp(data)
                } else if (data.error){
                    applyErrors(data.error)
                }
                setLoading(false);

            }).catch((err) => {
                 //    show error here 
                setLoading(false);
                applyErrors(err.message)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
            }, 500);
            return (() => {Aborter.abort()})
    }


    const forgetPassword = (formdata) => {
        setLoading(true);
        setTimeout(() => {
            fetch(`${config.BASE_URL}/authuser/password-forget/`,{
                signal : Aborter.signal,
                method:"POST",
                headers : {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(formdata)
            }).then((resp) => {
                if (resp.ok){
                    return resp.json();
                }
                setLoading(false);
            })
            .then((data) => {
                if (data.success){
                    acceptSuccessResp(data)
                } else if (data.error){
                    applyErrors(data.error)
                }
                setLoading(false);

            }).catch((err) => {
                 //    show error here 
                setLoading(false);
                applyErrors(err.message)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
            }, 500);
            return (() => {Aborter.abort()})
    }
    const passwordForgetRequest = (formdata,initialCall = true) => {
        setLoading(true);
        setTimeout(() => {
            fetch(`${config.BASE_URL}${initialCall? '/authuser/password-forget-request/':redirectUrl}`,{
                signal : Aborter.signal,
                method:"POST",
                headers : {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(formdata)
            }).then((resp) => {
                if (resp.ok){
                    return resp.json();
                }
                setLoading(false);
            })
            .then((data) => {
                if (data.success){
                    acceptSuccessResp(data)
                } else if (data.error){
                    applyErrors(data.error)
                }
                setLoading(false);

            }).catch((err) => {
                 //    show error here 
                setLoading(false);
                applyErrors(err.message)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
            }, 500);
            return (() => {Aborter.abort()})
    }
    const changePin = (formdata) => {
        setLoading(true);
        let token = await getToken()
        if (!token) {
            return setError('Try again later')
        }
        setTimeout(() => {
            fetch(`${config.BASE_URL}/authuser/pin-change/`,{
                signal : Aborter.signal,
                method:"POST",
                headers : {
                    "Content-Type":"application/json",
                    Authorization : `Bearer ${getToken()}`
                },
                body:JSON.stringify(formdata)
            }).then((resp) => {
                if (resp.ok){
                    return resp.json();
                }
                setLoading(false);
            })
            .then((data) => {
                if (data.success){
                    acceptSuccessResp(data)
                } else if (data.error){
                    applyErrors(data.error)
                }
                setLoading(false);

            }).catch((err) => {
                 //    show error here 
                setLoading(false);
                applyErrors(err.message)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
            }, 500);
            return (() => {Aborter.abort()})
    }
    const pinResetRequest = (formdata,initialCall = true) => {
        setLoading(true);
        setTimeout(() => {
            fetch(`${config.BASE_URL}${initialCall? '/authuser/pin-reset-request/':redirectUrl}`,{
                signal : Aborter.signal,
                method:"POST",
                headers : {
                    "Content-Type":"application/json",
                    Authorization : `Bearer ${getToken()}`
                },
                body:JSON.stringify(formdata)
            }).then((resp) => {
                if (resp.ok){
                    return resp.json();
                }
                setLoading(false);
            })
            .then((data) => {
                if (data.success){
                    acceptSuccessResp(data)
                } else if (data.error){
                    applyErrors(data.error)
                }
                setLoading(false);

            }).catch((err) => {
                 //    show error here 
                setLoading(false);
                applyErrors(err.message)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
            }, 500);
            return (() => {Aborter.abort()})
    }

   
    return ({
        changePassword,passwordResetRequest,
        changePin,pinResetRequest,
        forgetPassword,passwordForgetRequest
    });
}
 
export default useAlterSetting;