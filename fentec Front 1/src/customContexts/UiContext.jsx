import { createContext, useEffect, useRef, useState } from "react";
import useWebSocketHook from "../customHooks/WebSocketHook";
export const uiContext = createContext();

const UiContextProvider = ({children}) => {
    const [formLoading,setFormLoading] = useState(false) ;
    const [loading,setLoading] = useState(false) ;
    const [error,setError] = useState('') ;
    const [success,setSuccess] = useState('')
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

    const themes = {
        "light" : {
            "bgColor" : "#fffdfd",
            "bgColor2" : "#f2fcfe",

            "iconColor" : "#3ca4cc",
            "iconColor2" : "#3ca4cc",
            "color" : "#000506",
            "color2" : "#4d3f5a",
        },
        "dark" : {
            "bgColor" : "#1d1e1d",
            "bgColor2" : "#090001",

            "iconColor" : "#4af5c9",
            "iconColor2" : "#6ab866",
            "color" : "#e9e7e8",
            "color2" : "#fffdfd",
        },
        "blank" : {
            "bgColor":"",
            "bgColor2":"",
            "iconColor":"",
            "color":"",
        },
    }
    const [theme,setTheme]= useState(() => 
        localStorage.getItem("currentTheme")? JSON.parse(localStorage.getItem("currentTheme")) : themes['light']
    )
    const chooseTheme = (choice) => {
        let choosed = themes[choice]
        setTheme(choosed) 
        if (choosed) {
            localStorage.setItem("currentTheme",JSON.stringify(choosed))
        }
    }
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