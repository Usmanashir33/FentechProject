import { createContext, useContext, useEffect, useRef, useState } from "react";
import useWebSocketHook from "../customHooks/WebSocketHook";
import { authContext } from "./AuthContext";
import { uiContext } from "./UiContext";
import useRequest from "../customHooks/RequestHook";
// import moneySound from "../assets/sounds/money_in_sound.wav";
import moneySound from "../assets/sounds/money_in_sound.mp3";
import moneySound from "../assets/sounds/money_request_sound.m";

export const liveContext = createContext();

const LiveContextProvider = ({children}) => {
    const {setError} = useContext(uiContext) ;
    const {setCurrentUser} = useContext(authContext) ;
    const {trx,notif,with_trx} = useWebSocketHook();

    const [transections,setTransections] = useState([]);
    const [notifications,setNotifications] = useState([]);
    const [withdrawalRequests,setWithdrawalRequests] = useState([]);
    const [unreadNotif,setUnreadNotif] = useState([]);
    const [unReadRequests,setUnreadRequests] = useState([]);

    
    const {sendRequest} = useRequest(
        setTransections,setNotifications,notifications
    )
    useEffect(() => {
       if (trx){ // moey trx signal come 
            let user = trx.user
            setCurrentUser(user);
            // set new trx 
            setTransections([trx.trx,...transections])

            if (trx?.updated_trx){ // if the trx is refund and comes with two trxs refunding and status updating
                setTransections([trx?.trx,
                    ...transections.map((trans) => {
                        return (trans.id == (trx.updated_trx?.id))? (trx.updated_trx) : trans
                    })])
            }
       }
    },[trx,])

    useEffect(() => {
       if (notif){ // notification signal come  
        setNotifications([notif.notif,...notifications])
        PlaySound(moneySound)
       }
    },[notif,])

    useEffect(() => {
       if (with_trx){ // with drawal notification signal come  
        setWithdrawalRequests([with_trx.trx,...withdrawalRequests])
        PlaySound()
       }
    },[with_trx,])

    useEffect(() => {
        if(notifications){  // if notification changed count the unread ones 
            let unread = notifications.filter(({viewed}) => viewed === false).length
            setUnreadNotif(unread)
        }
    },[notifications])

    useEffect(() => {
        // this is usefull only for a withdrawal request approver 
        if(withdrawalRequests){  // if withdrawalRequests changed count the unread ones 
            let unread = withdrawalRequests.filter(({read_by_approver,status}) => (read_by_approver === false && status === 'pending')).length
            setUnreadRequests(unread)
        }
    },[withdrawalRequests])
     
    useEffect(() => {
        sendRequest('/account/notif/','GET','')
    },[])
    
    const PlaySound = (sound) => {
        let sound = new Audio(sound)
        sound.play()
    }
    return ( 
        <liveContext.Provider value={{
            transections,setTransections,
            notifications,setNotifications,
            withdrawalRequests,setWithdrawalRequests,
            unreadNotif,unReadRequests,
            sendRequest,
            
        }}>
            {children}
        </liveContext.Provider> 
    );
}
 
export default LiveContextProvider;