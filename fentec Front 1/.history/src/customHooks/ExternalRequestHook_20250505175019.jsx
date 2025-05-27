import { useContext} from "react";
import { uiContext } from "../customContexts/UiContext";
import config from "../customHooks/ConfigDetails";
import { authContext } from "../customContexts/AuthContext";


const useExRequest = () => {
    const Aborter = new AbortController();
    const {getToken} = useContext(authContext) ;
    const {setLoading,setError} = useContext(uiContext);
    const applyErrors = (error) => {
        setError(error)
        setTimeout(() => {
            setError('')
        }, 1000);
    }
    
    const sendExRequest = (url,method,formdata="",triggeredFunc,formDataForm=alse) => {
        setLoading(true);
         let options = {
            signal : Aborter.signal ,
            method:method,
            headers : {
                "Content-Type":"application/json",
                Authorization : `Bearer ${getToken()}`
            }}
        if (method !== "GET"){
            options.body = JSON.stringify(formdata)
         }

        setTimeout(() => {
            // print('ikon Allah')
            fetch(`${config.BASE_URL}${url}`,options
        ).then((resp) => {
                if (resp.ok){
                    return resp.json();
                }
                setLoading(false);
            })
            .then((data) => {
                if (!data.error){
                    // grab response here 
                    triggeredFunc(data)
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
    return ({sendExRequest})
}
 
export default useExRequest;