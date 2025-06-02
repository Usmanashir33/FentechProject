import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookDashed, Cog, CogIcon, Headset, Home, HomeIcon, LayoutDashboard, Lock, LucideHome, Repeat1, RepeatIcon, ReplaceAll, ShieldAlert, User, User2Icon, Users, Users2, WalletCards } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Sidebar = ({hidden,toggleHidden}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const checkActive = (navPath) => {
        let current_location = document.location.pathname ;
        return navPath === current_location ? 
        `bg-blue-200 text-blue-700`
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
    
    return ( 
        <div className={`fixed  inset-y-0 left-0 z-30 max-w-max w-64 md:w-80 bg-white shadow-lg
         transform transition-transform duration-300 ease-in-out 
         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full '} 
         md:translate-x-0 md:static md:inset-auto md:h-screen `}>
          
        <div className="flex flex-col h-full">
          
          {/* User Profile Section */}
          <div className="p-4  border-b relative  ">
            <FontAwesomeIcon icon={faMultiply}
            onClick={() => {setIsSidebarOpen(false)}}
              className="md:hidden absolute right-0 text-xl mr-4 hover:bg-red-100 p-1 rounded-md  hover:text-yellow-600 transition-colors duration-200"
            />
            <div className="flex items-center space-x-4 ">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20business%20man%20with%20short%20hair%20and%20subtle%20smile%2C%20high%20quality%20portrait%20photo%2C%20neutral%20background%2C%20professional%20lighting&width=100&height=100&seq=avatar1&orientation=squarish" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Usman Ashir Muhammad</h2>
                <p className="text-sm text-gray-500">Premium Member</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <div>
                <p className="font-medium">Balance</p>
                <p className="text-gray-700">$24,563.00</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <span className="px-2 py-1 text-xs bg-green-200 text-green-1000 rounded-full">Active</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <Link to={`/dashbord`} className={`${checkActive("/dashbord")} flex items-center px-3 py-2 text-gray-600 rounded-lg transition-all duration-300 hover:bg-blue-100 group`}>
              <LayoutDashboard className={`${checkActiveIcon('/dashbord') } mr-3`} />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link to="/home" className={`${checkActive("/home")} flex items-center px-3 py-2 text-gray-600 rounded-lg transition-all duration-300 hover:bg-blue-100 group` }>
              <Home className={`${checkActiveIcon('/home') } mr-3`}/>
              <span className="font-medium">Home</span>
            </Link>
            <Link to="/wallet" className={`${checkActive("/wallet")} flex items-center px-3 py-2 text-gray-600 rounded-lg transition-all duration-300 hover:bg-blue-100 group` }>
              <WalletCards className={`${checkActiveIcon('/wallet') } mr-3`}/>
              <span className="font-medium">Wallet</span>
            </Link>
            
            <Link to={`/transections`} className={`${checkActive("/transections")} flex items-center px-3 py-2 text-gray-600 rounded-lg transition-all duration-300 hover:bg-blue-100 group`}>
              <RepeatIcon className={`${checkActiveIcon('/transections') } mr-3`}/>
              <span className="font-medium">Transactions</span>
            </Link>
            <Link to={`/profile`} className={`${checkActive("/profile")} flex items-center px-3 py-2 text-gray-600 rounded-lg transition-all duration-300 hover:bg-blue-100 group`}>
              <User2Icon className={`${checkActiveIcon('/profile') } mr-3`}/>
              <span className="font-medium">Profile</span>
            </Link>
            
            <Link  to={"#"} className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <Users className={`${checkActiveIcon('/dashbord') } mr-3`}/>
              <span className="font-medium">Refarrels</span>
            </Link>
            <Link to="/help-center" className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <Headset className={`${checkActiveIcon('/dashbord') } mr-3`}/>
              <span className="font-medium">Support</span>
            </Link>
            <Link to="/settings" className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <Cog className={`${checkActiveIcon('/dashbord') } mr-3`}/>
              <span className="font-medium">Settings</span>
            </Link>
          </nav>
          {/* Footer */}
          <div className="p-2 border-t-2">
            <a href="#" className="flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <i className="fas fa-sign-out-alt mr-3 text-gray-700"></i>
              <span className="font-medium">Logout</span>
            </a>
          </div>
        </div>
      </div>
    );
}
 
export default Sidebar;