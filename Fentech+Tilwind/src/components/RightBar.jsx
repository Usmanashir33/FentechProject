import { useNavigate } from "react-router";

const Rightbar = () => {
    const navigate = useNavigate();
    const checkActive = (navPath) => {
        let current_location = document.location.pathname ;
        return navPath === current_location ? "active" : ''
    }
    return ( 
        <>
          <div className="p-5  border-b sticky top-0 z-20 bg-white">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
          </div>
          <div className="divide-y">
            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <i className="fas fa-money-bill text-blue-500"></i>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">New Payment Received</p>
                  <p className="text-sm text-gray-500">You received $350.00 from Alex Johnson</p>
                  <p className="mt-1 text-xs text-gray-400">2 minutes ago</p>
                </div>
              </div>
            </div>
            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <i className="fas fa-bell text-yellow-500"></i>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">Account Alert</p>
                  <p className="text-sm text-gray-500">Your account balance is below $1000</p>
                  <p className="mt-1 text-xs text-gray-400">1 hour ago</p>
                </div>
              </div>
            </div>
            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <i className="fas fa-check text-green-500"></i>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">Transfer Complete</p>
                  <p className="text-sm text-gray-500">Transfer to savings account completed</p>
                  <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <i className="fas fa-check text-green-500"></i>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">Transfer Complete</p>
                  <p className="text-sm text-gray-500">Transfer to savings account completed</p>
                  <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <i className="fas fa-check text-green-500"></i>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">Transfer Complete</p>
                  <p className="text-sm text-gray-500">Transfer to savings account completed</p>
                  <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
            </div>
            
          </div>
        </>
     );
}
 
export default Rightbar;