import { createContext, useContext, useEffect, useRef, useState } from "react";
export const uiContext = createContext();

const UiContextProvider = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(!false) ;
    const [isLoading,setIsLoading] = useState(false) ;
    const [error,setError] = useState('') ;
    const [success,setSuccess] = useState('')
    const [airtimeOrData,setAirtimeOrData] = useState('');
    const [PoPPageAction,setPorPPageAction] = useState('');
    const [showBalance,setShowBalance] = useState(true);

    const toggleShowBalance = () => {
        setShowBalance(!showBalance) 
    }

    const [headerDD,setHeaderDD] = useState(false);
    const sideBarRef = useRef();
   
    const getFormattedDate = (rawDate) => {
        const date = new Date(rawDate);
        if (isNaN(date.getTime())) return null;
      
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
      
        let string = `${date.getDate()}-${date.toLocaleString('en-US', { month: 'short' })}-${date.getFullYear()} at ${date.toLocaleTimeString('en-US', options)}`
   
        return string;}

    const formatNaira  = (amount) =>   {
        const dig = Number(amount).toLocaleString('en-NG', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return "₦" + dig
    }
    
    const  greetUser = () =>  {
        const hour = new Date().getHours();
        let greeting;
        if (hour < 12) {
            greeting = "Good morning";
        } else if (hour < 18) {
            greeting = "Good afternoon";
        } else {
            greeting = "Good evening";
        }
        return `${greeting}!`;
        }

    const copyToClipboard = (text,message) => {
        navigator.clipboard.writeText(text);
        setSuccess(message);
    };

    return ( 

    <uiContext.Provider value={{
        isLoading,setIsLoading,error,setError,success,setSuccess,
        sideBarRef,isSidebarOpen, setIsSidebarOpen ,getFormattedDate,
        formatNaira,greetUser,copyToClipboard
    }}>
        {children}
    </uiContext.Provider> 
    );
}
 
export default UiContextProvider; 