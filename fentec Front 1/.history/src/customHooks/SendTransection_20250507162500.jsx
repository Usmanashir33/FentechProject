import { useContext} from "react";
import { uiContext } from "../customContexts/UiContext";
import config from "../customHooks/ConfigDetails";
import { authContext } from "../customContexts/AuthContext";


const useSendTransection = () => {
    const Aborter = new AbortController();
    const {getToken} = useContext(authContext) ;
    const {setLoading,setError} = useContext(uiContext);
    const applyErrors = (error) => {
        setError(error)
        setTimeout(() => {
            setError('')
        }, 1000);
    }
    
    const sendTransectionRequest = (url,method,formdata="",triggeredFunc,load=false) => {
        if (load){
            setLoading(true);
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
                setLoading(false);
            })
            .then((data) => {
                triggeredFunc(data)
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
    return ({sendTransectionRequest})
}
 
export default useSendTransection;