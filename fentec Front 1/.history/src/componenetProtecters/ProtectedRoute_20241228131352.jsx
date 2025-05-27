import { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
// import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { authContext } from "../customContexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {isAuthenticated,getToken,refreshToken} = useContext(authContext);
    const [allow,setAllow] = useState(true);

    const allow_access = async () => {

        if (isAuthenticated){
            let token = localStorage.getItem('a_token')
            if (token){
                let decoded = jwtDecode(token)
                if (!decoded.exp < Math.floor(Date.now() / 1000)){
                    setAllow(true);
                }else{
                    // triger finding another token 
                    refreshed = await refreshToken()
                    return refreshed?  setAllow(true) : allow_access()
                    // return refreshToken();
                }
            }else{setAllow(false)};
        }else{
            setAllow(false);
        }
    }
    useEffect(() => {
        allow_access()
    },[isAuthenticated])
    return allow? children : <Navigate to='/register' replace/>;
}
 
export default ProtectedRoute;