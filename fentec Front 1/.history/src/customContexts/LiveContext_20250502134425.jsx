import { createContext, useContext, useEffect, useRef, useState } from "react";
import useWebSocketHook from "../customHooks/WebSocketHook";
import { authContext } from "./AuthContext";
import { uiContext } from "./UiContext";
import useRequest from "../customHooks/RequestHook";
import moneySound from "../assets/sounds/money_in_sound.wav";
// import moneySound2 from "/money_in_sound.wav";

export const liveContext = createContext();

const LiveContextProvider = ({children}) => {
    const {setError} = useContext(uiContext) ;
    const {setCurrentUser} = useContext(authContext) ;
    const {trx,notif,with_trx} = useWebSocketHook();

    const [transections,setTransections] = useState([]);
    const [notifications,setNotifications] = useState([]);
    const [withdrawalRequests,setWithdrawalRequests] = useState([]);
    const [unreadNotif,setUnreadNotif] = useState([]);
    const [unReadRequests,setUnra]

    
    const {sendRequest} = useRequest(
        setTransections,setNotifications,notifications
    )
    useEffect(() => {
       if (trx){ // signal come 
        let user = trx.user
        setCurrentUser(user);
        setTransections([trx.trx,...transections])
       }
    },[trx,])

    useEffect(() => {
       if (notif){ // notification signal come  
        setNotifications([notif.notif,...notifications])
        PlayMoneyIn()
       }
    },[notif,])
    useEffect(() => {
       if (with_trx){ // notification signal come  
        setWithdrawalRequests([...withdrawalRequests,with_trx.trx])
        PlayMoneyIn()
       }
    },[with_trx,])

    useEffect(() => {
        if(notifications){  // if notification changed count the unread ones 
            let unread = notifications.filter(({viewed}) => viewed === false).length
            setUnreadNotif(unread)
        }
    },[notifications])
     
    useEffect(() => {
        sendRequest('/account/notif/','GET','')
    },[])
    
    const PlayMoneyIn = () => {
        let sound = new Audio(moneySound)
        sound.play()
    }
    return ( 
        <liveContext.Provider value={{
            transections,setTransections,
            notifications,setNotifications,
            withdrawalRequests,setWithdrawalRequests,
            unreadNotif,sendRequest
            
        }}>
            {children}
        </liveContext.Provider> 
    );
}
 
export default LiveContextProvider;