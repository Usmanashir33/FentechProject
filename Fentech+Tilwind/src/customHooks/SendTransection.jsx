import { useContext} from "react";
import { uiContext } from "../customContexts/UiContext";
import config from "../customHooks/ConfigDetails";
import { authContext } from "../customContexts/AuthContext";


const useSendTransection = () => {
    const Aborter = new AbortController(); 
    const {getToken} = useContext(authContext) ;
    const {setIsLoading,setError} = useContext(uiContext);
    const applyErrors = (error) => {
        setError(error)
        setTimeout(() => {
            setError('')
        }, 1000);
    }
    
    const sendTransectionRequest = async (url,method,formdata="",triggeredFunc,load=false) => {
        if (load){
            setIsLoading(true);
        }
        let token = await getToken()
        if (!token) {
            return setError('Try again later')
        }
        let options = {
            signal : Aborter.signal ,
            method:method,
            headers : {
                "Content-Type":"application/json",
                Authorization : `Bearer ${token}`
            }}
        if (method !== "GET"){
            options.body = JSON.stringify(formdata)
         }
        setTimeout(() => {
            fetch(`${config.BASE_URL}${url}`,options
        ).then((resp) => {
                if (resp.ok){
                    return resp.json();
                }
                setIsLoading(false);
            })
            .then((data) => {
                if (data?.error){
                    return setError(data?.error)
                }
                triggeredFunc(data)
                setIsLoading(false);
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
    return ({sendTransectionRequest})
}
 
export default useSendTransection;