// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
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
import { BanknoteArrowUp, BellDot, HandCoins, MessageSquare, MessageSquareDiff, Wallet2 } from 'lucide-react';
import HelpCenterPage from './HelpCenter';
import WithdrawalRequests from './WithdrawalRequets';

const MainDashbord = () => {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
//   const handleStatusChange = (status: string) => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden ">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      {<div className="flex-1 flex">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navbar */}
          { <header className="bg-white shadow-sm z-10">
            <div className="flex items-center justify-between h-16 px-6">

              <div className="flex items-center">
                <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none md:hidden cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-bars text-lg"></i>
                </button>
                <h2 className="ml-4 text-lg font-medium text-gray-800 md:ml-0">Financial Dashboard</h2>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <button className="relative text-gray-600 hover:text-gray-900 cursor-pointer !rounded-button whitespace-nowrap">
                    {/* <i className="fas fa-bell text-xl"></i> */}
                    <BellDot/>
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                  </button>
                  <button className="relative text-gray-600 hover:text-gray-900 cursor-pointer !rounded-button whitespace-nowrap">
                    <MessageSquare className="w-6 h-6 text-gray-600 text-xl " />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
                  </button>
                  <button 
                  onClick={() => {navigate('/with-requests')}}
                  className="relative text-gray-600 hover:text-gray-900 cursor-pointer !rounded-button whitespace-nowrap">
                    <BanknoteArrowUp className="text-gray-600 text-xl " />
                    
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">1</span>
                  </button>
                </div>
                <div className="relative">
                  <button className="flex items-center text-gray-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                    <span className="mr-2 text-sm">Coinermk</span>
                    <div className="w-8 h-8 overflow-hidden rounded-full bg-gray-200">
                      <img
                        src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20business%20man%20with%20short%20hair%20and%20subtle%20smile%2C%20high%20quality%20portrait%20photo%2C%20neutral%20background%2C%20professional%20lighting&width=100&height=100&seq=avatar1&orientation=squarish"
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
        <div className=" hidden md:block w-80 bg-white border-l overflow-y-auto">
           <Rightbar/>
        </div>
      </div>}

    </div>
  );
};

export default MainDashbord;
