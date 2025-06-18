import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookDashed, Cog, CogIcon, Headset, Home, HomeIcon, LayoutDashboard, Lock, LucideHome, Repeat1, RepeatIcon, ReplaceAll, ShieldAlert, User, User2Icon, Users, Users2, WalletCards } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { authContext } from "../customContexts/AuthContext";
import { uiContext } from "../customContexts/UiContext";
import config from "../customHooks/ConfigDetails";

const Sidebar = () => {
    const {logout,currentUser} = useContext(authContext);
    const {sideBarRef,isSidebarOpen, setIsSidebarOpen,formatNaira} = useContext(uiContext);
    const navigate = useNavigate();
    const checkActive = (navPath) => {
        let current_location = document.location.pathname ;
        return navPath === current_location ? 
        `bg-blue-100 text-blue-700`
        :
         ''
    }
    const checkActiveIcon = (navPath) => {
        let current_location = document.location.pathname ;
        return navPath === current_location ? 
        `text-blue-600`
        :
         'text-gray-700'
    }
     // Typing animation effect
  const [animatedName, setAnimatedName] = useState("");
  const [fullname,setFullname] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
        setAnimatedName(fullname.slice(0, animatedName.length + 1));
      }, 200);
      return () => clearTimeout(timeout);
  }, [fullname,animatedName]);
  useEffect(() => {
    setFullname(`${currentUser?.first_name} ${currentUser?.last_name}`);
  }, [currentUser]);
    
    return ( 
        <div className={`fixed  inset-y-0 left-0 z-30 max-w-ma w-64 md:w-80 bg-white shadow-lg
         transform transition-transform duration-300 ease-in-out 
         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full '} 
         md:translate-x-0 md:static md:inset-auto md:h-screen `} ref={sideBarRef}>
          
        <div className="flex flex-col h-full">
          
          {/* User Profile Section */}
          <div className="p-4  border-b relative ">
            <div  className="flex items-center space-x-2  justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12  h-12 rounded-full overflow-hidden  ">
                  <img src={`${config.BASE_URL}${currentUser?.picture}`}
                  alt="Profile" className="w-full h-full object-cover" />
                </div> 
                <div className="">
                  <h2 className="text-lg font-semibold text-gray-800">{animatedName}</h2>
                  <p className="text-sm text-gray-500">{currentUser?.is_staff? "Premium Member" : ""}</p>
                </div>

              </div>
              <FontAwesomeIcon icon={faMultiply}
                onClick={() => {setIsSidebarOpen(false)}}
                className="md:hidden absolut right-0 text-xl mr-4 hover:bg-red-100 p-1 rounded-md  hover:text-yellow-600 transition-colors duration-200"
            />
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-600 ">
              <div>
                <p className="font-medium">Balance</p>
                <p className="text-gray-700">{formatNaira(currentUser?.account?.account_balance)}</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <span className="px-2 py-1 text-xs bg-green-200 text-green-1000 rounded-full">{currentUser?.account?.account_status}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <Link to={`/dashbord`} className={`${checkActive("/dashbord")} flex items-center px-3 py-2 text-gray-600 rounded-lg transition-all duration-300 hover:border-blue-500 hover:shadow-md group`}>
              <LayoutDashboard className={`${checkActiveIcon('/dashbord') } mr-2 w-5`} />
              <span className="font-medium text-sm text-sm ">Dashboard</span>
            </Link>
            <Link to="/home" className={`${checkActive("/home")} flex items-center px-3 py-2 text-gray-600 rounded-lg transition-all duration-300 hover:border-blue-500 hover:shadow-md group` }>
              <Home className={`${checkActiveIcon('/home') } mr-2 w-5`}/>
              <span className="font-medium text-sm">Home</span>
            </Link>
            <Link to="/wallet" className={`${checkActive("/wallet")} flex items-center px-3 py-2 text-gray-600 rounded-lg transition-all duration-300 hover:border-blue-500 hover:shadow-md group` }>
              <WalletCards className={`${checkActiveIcon('/wallet') } mr-2 w-5`}/>
              <span className="font-medium text-sm">Wallet</span>
            </Link>
            
            <Link to={`/transections`} className={`${checkActive("/transections")} flex items-center px-3 py-2 text-gray-600 rounded-lg transition-all duration-300 hover:border-blue-500 hover:shadow-md group`}>
              <RepeatIcon className={`${checkActiveIcon('/transections') } mr-2 w-5`}/>
              <span className="font-medium text-sm">Transactions</span>
            </Link>
            <Link to={`/profile`} className={`${checkActive("/profile")} flex items-center px-3 py-2 text-gray-600 rounded-lg transition-all duration-300 hover:border-blue-500 hover:shadow-md group`}>
              <User2Icon className={`${checkActiveIcon('/profile') } mr-2 w-5`}/>
              <span className="font-medium text-sm">Profile</span>
            </Link>
            
            <Link  to={"#"} className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <Users className={`${checkActiveIcon('/dashbord') } mr-2 w-5`}/>
              <span className="font-medium text-sm">Refarrels</span>
            </Link>
            <Link to="/help-center" className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <Headset className={`${checkActiveIcon('/dashbord') } mr-2 w-5`}/>
              <span className="font-medium text-sm">Support</span>
            </Link>
            <Link to="/settings" className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <Cog className={`${checkActiveIcon('/dashbord') } mr-2 w-5`}/>
              <span className="font-medium text-sm">Settings</span>
            </Link>
          </nav>
          {/* Footer */}
          <div className="p-2 border-t-2">
            <div onClick={() => {logout()}} className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <i className="fas fa-sign-out-alt mr-2 w-5 text-gray-700"></i>
              <span className="font-medium text-sm">Logout</span>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default Sidebar;