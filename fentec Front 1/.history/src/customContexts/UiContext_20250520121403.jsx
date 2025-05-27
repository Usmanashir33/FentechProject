import { createContext, useEffect, useRef, useState } from "react";
import useWebSocketHook from "../customHooks/WebSocketHook";
import { faSearch, faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";
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

    const handleDateSelection =(range,data,setData) => {
            setSelctedDate(range)

            // also calender selecetion 
            let calenderDate = new Date(range)
            let next_day = new Date(calenderDate)
            next_day.setDate(calenderDate.getDate() + 1)

            if (calenderDate !== 'Invalid Date'){
                let calender_data = data.filter(item => {
                    const itemDate = new Date(item.trx_date);
                    if (itemDate < next_day && itemDate >= calenderDate){
                        return item
                        
                    }
                })
                setData(calender_data);
            }
            const now = new Date();
            const Today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            
            const Yesterday = new Date(Today);
            Yesterday.setDate(Yesterday.getDate() - 1);

            const ThisWeek = new Date(Today);
            ThisWeek.setDate(ThisWeek.getDate() - 7);

            const LastWeek = new Date(Today);
            LastWeek.setDate(LastWeek.getDate() - 14);

            const LastMonth = new Date(Today);
            LastMonth.setMonth(LastMonth.getMonth() - 1);
            setDisplayFilter(false);
            
              switch (range) {
                case 'today':
                  return setData(data.filter(item => {
                    const itemDate = new Date (item.trx_date);
                    return itemDate >= Today ? item : null ;
                  }))

                case 'yesterday':
                    return setData(data.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        return (itemDate >= Yesterday && itemDate < Today)? item : null ;
                      }))

                case 'thisWeek':
                    let this_weekly = data.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if (itemDate >= ThisWeek){
                            return item
                        }});
                    return setData(this_weekly);

                case 'lastWeek':
                    let weekly = data.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if (itemDate >= LastWeek && itemDate < ThisWeek){
                            return item
                        }});
                    return setData(weekly);

                case 'thisMonth':
                    let this_month = data.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if ((itemDate.getMonth() -1) === Today.getMonth()-1){
                            return item
                        }
                    })
                    return setData(this_month);
                case 'lastMonth':
                    let last_month = data.filter(item => {
                        const itemDate = new Date(item.trx_date);
                        if ((itemDate.getMonth() -1) === Today.getMonth()-2){
                            return item
                        }
                    })
                    return setData(last_month);
                case 'clear':
                    setData(data)
                    setSelctedDate('All')

                default:
                    setDisplayFilter(false);
                    return true; // no filter
                }
            
    }

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
        formLoading,setFormLoading,handleDateSelection,
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