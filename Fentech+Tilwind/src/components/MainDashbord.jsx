// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import { BrowserRouter as Router, Route, Routes,  useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Home from './Home';
import Sidebar from './Sidebar';
import Dashboard from './Dashbord';
import Rightbar from './RightBar';
import Profile from './Profile';
import SendingMoney from './SendingMoney';
import Withdrawal from './Withdrawal';
import Transections from './Transections';
import Wallet from './Wallet';
import Settings from './Settings';
import PaymentMethods from './PaymentMethods';
import { BanknoteArrowUp, Bell,  MessageSquare } from 'lucide-react';
import HelpCenterPage from './HelpCenter';
import WithdrawalRequests from './WithdrawalRequets';
import { uiContext } from '../customContexts/UiContext';
import { authContext } from '../customContexts/AuthContext';
import config from '../customHooks/ConfigDetails';
import { liveContext } from '../customContexts/LiveContext';

const MainDashbord = () => {
  const navigate = useNavigate()
  const {currentUser} = useContext(authContext);
  const {unreadNotif,withdrawalRequests} = useContext(liveContext);
  
  const {isSidebarOpen, setIsSidebarOpen,greetUser} = useContext(uiContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  };
  const readNotifi =(unreads) => {
     if ( unreads > 99 ){
      return "99+"
     }
     return  unreads ;
  }
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden w-full">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      {<div className="flex-1 flex ">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navbar */}
          { <header className="bg-white shadow-sm z-10">
            <div className="flex items-center justify-between h-16 px-6">

              <div className="flex items-center">
                <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none md:hidden cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-bars text-lg"></i>
                </button>
                <h2 className="ml-4 text-lg font-medium text-green-900 md:ml-0">{greetUser()}</h2>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <button 
                  onClick={() => {navigate('/notif')}}
                  className=" lg:hidden relative text-gray-600 hover:text-gray-900 cursor-pointer !rounded-button whitespace-nowrap">
                    {/* <i className="fas fa-bell text-xl"></i> */}
                    <Bell/>
                    {unreadNotif > 0  && <span className="absolute -top-1  -right-1 w-max text-xs px-1 rounded-lg font-medium bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {readNotifi(unreadNotif)}

                    </span>} 
                  </button>
                  <button className="relative text-gray-600 hover:text-gray-900 cursor-pointer !rounded-button whitespace-nowrap">
                    <MessageSquare className="w-6 h-6 text-gray-600 text-xl " />
                    <span className="absolute -top-1 -right-1 w-max text-xs px-1 rounded-lg font-mediumanimate-pulse bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
                  </button>
                 {currentUser?.is_staff &&  <button 
                  onClick={() => {navigate('/with-requests')}}
                  className="relative text-gray-600 hover:text-gray-900 cursor-pointer !rounded-button whitespace-nowrap">
                    <BanknoteArrowUp className="text-gray-600 text-xl " />
                    
                    <span className="absolute -top-1  -right-1  bg-green-500 text-white w-max text-xs px-1 rounded-lg font-medium  flex items-center justify-center ">
                      {/* {readNotifi(200)} */}
                      {withdrawalRequests.filter((trx) => trx.status == 'pending').length > 0  && 
                      readNotifi(withdrawalRequests.filter((trx) => trx.status == 'pending').length)
                      }

                    </span>
                  </button>}
                </div>
                <div className="relative">
                  <button className="flex items-center text-gray-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                    <span className="mr-2 text-sm">@{currentUser?.username}</span>
                    <div className="w-8 h-8 overflow-hidden rounded-full bg-gray-200">
                      <img
                      src={`${config.BASE_URL}${currentUser?.picture}`}
                        alt="User Avatar"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <i className="fas fa-chevron-down ml-1 text-xs text-gray-400"></i>
                  </button>
                </div>
              </div>
            </div>
          </header>}

           <Routes>
            <Route 
              path='' 
                  element={
                      <main className="flex-1 overflow-y-auto px-2 bg-gray-50">
                           {/* <!-- main content area  --> */}
                          <Dashboard/>
                      </main>
                  } 
              />
                                             
              <Route 
                  path='home' 
                  element={
                    <main className="flex-1 overflow-y-auto p-2 bg-gray-50">
                      <Home/>
                    </main>
                  } 
              />
              <Route 
                  path='Wallet' 
                  element={
                    <main className="flex-1 overflow-y-auto p-2 bg-gray-50">
                      <Wallet/>
                    </main>
                  } 
              />
              <Route 
                  path='/with-requests/' 
                  element={
                    <main className="flex-1 overflow-y-auto px-2 pt-0 bg-gray-50">
                      <WithdrawalRequests />
                    </main>
                  }
                />
              <Route 
                  path='profile' 
                  element={
                    <main className="flex-1 overflow-y-auto px-2 bg-gray-50 ">
                      <Profile/>
                    </main>
                  } 
              />
              <Route 
                  path='notif' 
                  element={
                    <main className="flex-1 overflow-y-auto px-2 bg-gray-50 ">
                      <Rightbar/>
                    </main>
                  } 
              />
              <Route 
                  path='internal-trns' 
                  element={
                    <main className="flex-1 overflow-y-auto px-2 bg-gray-50 ">
                      <SendingMoney/>
                    </main>
                  } 
              />
              <Route 
                  path='transections' 
                  element={
                    <main className="flex-1 overflow-y-auto px-2 bg-gray-50 ">
                      <Transections/>
                    </main>
                  } 
              />
              <Route 
                  path='withdraw' 
                  element={
                    <main className="flex-1 overflow-y-auto px-2 bg-gray-50 ">
                      <Withdrawal/>
                    </main>
                  } 
              />
              <Route 
                  path='settings' 
                  element={
                    <main className="flex-1 overflow-y-auto px-2 bg-gray-50  ">
                      <Settings/>
                    </main>
                  } 
              />
              <Route 
                  path='payment-meth' 
                  element={
                    <main className="flex-1 overflow-y-auto px-2 bg-gray-50 ">
                      <PaymentMethods/>
                    </main>
                  } 
              />
              <Route 
                  path='help-center' 
                  element={
                    <main className="flex-1 overflow-y-auto px-2 bg-gray-50 ">
                      <HelpCenterPage/>
                    </main>
                  } 
              />
          </Routes>
        </div>


        {/* Notifications Panel */}
        <div className="hidden lg:block 0 bg-white border-l overflow-y-auto w-1/3  ">
           <Rightbar/>
        </div>
      </div>}

    </div>
  );
};

export default MainDashbord;
