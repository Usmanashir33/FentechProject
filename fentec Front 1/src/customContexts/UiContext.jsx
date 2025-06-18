import { createContext, useEffect, useRef, useState } from "react";
import useWebSocketHook from "../customHooks/WebSocketHook";
export const uiContext = createContext();

const UiContextProvider = ({children}) => {
    const [formLoading,setFormLoading] = useState(false) ;
    const [loading,setLoading] = useState(false) ;
    const [error,setError] = useState('') ;
    const [success,setSuccess] = useState('');
    const [airtimeOrData,setAirtimeOrData] = useState('');
    const [showLogOut,setShowLogOut] = useState('') ;
    const [PoPPageAction,setPorPPageAction] = useState('');
    const [showBalance,setShowBalance] = useState(true);

    const toggleShowBalance = () => {
        setShowBalance(!showBalance)
    }

    const [headerDD,setHeaderDD] = useState(false);
    const sideBarRef = useRef();
   
    const hideAllDD = () => {
          const dropChilderen = document.querySelectorAll('.dropdown');
          if (dropChilderen){
              dropChilderen.forEach((dropchild) => {
                dropchild.classList.add("hidden");
              });
          }
        };

    const showCardDD = (e,containerId) => {
        const dotContainer = document.querySelector(`#${containerId}`);
        hideAllDD();
        dotContainer.classList.remove("hidden");
        e.stopPropagation();
    }
    document.addEventListener('click',() => {
          hideAllDD();
          setShowLogOut('hidden');
    })
    
    const stopChildLinks = () => {
        document.querySelectorAll('.child-link').forEach((child) => {
          child.addEventListener("click",(event) => {
            console.log('child link clicked');
            event.stopPropagation();
          })
        })
      }

    useEffect(() => {
        stopChildLinks()
    })
    
    const getFormattedDate= (rawDate) => {
        const date = new Date(rawDate);
        if (isNaN(date.getTime())) return null;
      
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
      
        let string = `${date.getDate()}-${date.toLocaleString('en-US', { month: 'short' })}-${date.getFullYear()} at ${date.toLocaleTimeString('en-US', options)}`
        return string;}
      
    return ( 

    <uiContext.Provider value={{
        formLoading,setFormLoading,
        loading,setLoading,
        error,setError,success,setSuccess,
        airtimeOrData,setAirtimeOrData, 
        PoPPageAction,setPorPPageAction,sideBarRef,
        showBalance,toggleShowBalance,
        headerDD,setHeaderDD,getFormattedDate
    }}>
        {children}
    </uiContext.Provider> 
    );
}
 
export default UiContextProvider;