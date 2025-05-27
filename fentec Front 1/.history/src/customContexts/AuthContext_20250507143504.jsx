import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState,useHistory, useContext } from "react";
import { uiContext } from "./UiContext";
import config from "../customHooks/ConfigDetails";
export const authContext = createContext();

const AuthContextProvider = ({children}) => {
    const Aborter = new AbortController();
    const [currentUser,setCurrentUser] = useState({});
    const {setError,setFormLoading} = useContext(uiContext);
    
    const [isAuthenticated,setIsAuthenticated] = useState(
        localStorage.getItem("a_token")? true : false
    );

    useEffect(() => {
        // if the currrent user fetch faied so we need to trigger it here 
        if (isAuthenticated && !currentUser.value){
            getCurrentUser() ;
        }
    },[isAuthenticated])

    const  getCurrentUser = () => {
        fetch(`${config.BASE_URL}/authuser/current-user/`,{
            signal : Aborter.signal ,
            method : "GET",
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        }).then ((resp) => {
            if (resp.ok){
                return resp.json();
            }
            throw Error("failed to fetch user")
        }).then((data) => {
            console.log('current_User ', data);
            if (!data.error){
                setCurrentUser(data);
                setIsAuthenticated(true);
            }else{
                setError(data.error)
                // setCurrentUser({});
            }
        })
        .catch((err) => {
            setError(err.message);
        })
        return (() => {Aborter.abort()})
    }
    
    const refreshToken = () => {
        const RToken = localStorage.getItem('r_token');
        if (RToken && isAuthenticated){
             return(
                fetch(`${config.BASE_URL}/authuser/api/token/refresh/`,{
                method:"POST",
                headers:{ "Content-Type":"application/json" },
                body : JSON.stringify({"refresh":RToken})
            })
            .then((resp) => {return resp.json()})
            .then((data) => {
                if (data.access){
                    localStorage.setItem('a_token',data.access);
                    console.log('token refreshed');
                    return data ;
                }
            })
        )}
        else{
            // log user out 
            setIsAuthenticated(false);
            localStorage.removeItem('a_token');
            localStorage.removeItem('r_token');
            return Promise.reject("your logged out ")
        }
    }
    
    const getToken = () => {
        try {
            const token = localStorage.getItem("a_token");
            if ( token ) {
                const decoded = jwtDecode(token);
                // Check if token is expired
                if (decoded.exp < Math.floor(Date.now() / 1000)) {
                    // Obtain a new token
                    const newToken =  refreshToken(); // this is async funtion 

                    if (newToken?.access) {
                        return Promise.resolve(newToken.access); // Return new token
                    } else {
                        console.error("Failed to refresh token");
                        return Promise.reject(null); // Return null if refreshing failed
                    }
                }
                // Return the existing valid token
                return Promise.resolve( token);
            }

            // Return null if token is not present or not authenticated
            return Promise.reject(null);
        } catch (error) {
            console.error("Error in getToken:", error);
            return Promise.reject(null); // Return null in case of an error
        }
    };

    const logOut = () => {
        setFormLoading(true);
        setTimeout(() => {
            setIsAuthenticated(false);
            setCurrentUser({});
            localStorage.removeItem('a_token');
            localStorage.removeItem('r_token');
            setFormLoading(false);
        }, 700);
    }
   
    return ( 
        <authContext.Provider value={{
            currentUser,setCurrentUser,getCurrentUser,getToken,refreshToken,
            isAuthenticated,setIsAuthenticated,logOut
        }} >
            {children}
        </authContext.Provider>
     );
}
 
export default AuthContextProvider;