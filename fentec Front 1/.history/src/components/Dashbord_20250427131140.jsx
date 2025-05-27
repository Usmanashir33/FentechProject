import "../css/dashbord.css"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { FaBeer } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from "react";
import { authContext } from "../customContexts/AuthContext";
import DashebordSidebar from "./DashbordSidebar";
import ProfilePage from './ProfilePage';

import DashboardHeader from "./DashbordHeader";
import Transections from "./Transections";
import DashbordUserCard from "./DashbordCard";
import DashbordUserSpendings from "./DashbordUserSpendings";
import AirtimePurchase from "./AirtimePurchase";
import Wallet from "./Wallet";
import SendMoneyPage from "./SendMoney";
import WithdrawalPage from "./WithdrawalPage";
import DepositePage from "./DepositePage";
import SecurityCenter from "./SettingsFiles/SecurityCenter";
import LoggingSettings from "./SettingsFiles/LoggingSettings";
import PaymentSettings from "./SettingsFiles/PaymentSettings";
import Support from "./SupportPage";
import HomePage from "./HomePage";
import NotificationPage from "./Notifications";
import MessagesPage from "./MessagesPage";
import Footer from "./Footer";
import SettingsPage from "./SettingsFiles/Settings";


const Dashbord = () => {
    return ( 
        <div className="dashbord relative">
            {/* <!-- side bar  --> */}
            <DashebordSidebar/>

            {/* <!-- the main space that contains header  min-height: 100%; --> */}
            <div className="main ">

                {/* <!-- header  --> */}
                <DashboardHeader/>
                
                <div className="dashbord-spaces">
                    <div className="main-space custom-overflow ">
                        <Routes>
                            <Route 
                                path='' 
                                element={
                                    <>
                                        <DashbordUserSpendings/>
                                         {/* <!-- account overview  --> */}
                                        <div className="overview">
                                                over view section
                                        </div>
                                        <Transections/>
                                    </>
                                } 
                            />
                            
                            <Route 
                                path='home' 
                                element={
                                    <>
                                    <HomePage/>
                                    </>
                                } 
                            />
                            <Route 
                                path='settings/' 
                                element={
                                    <>
                                    <SettingsPage/>
                                    </>
                                } 
                            />
                            <Route 
                                path='trans/' 
                                element={
                                    <>
                                    <Transections/>
                                    </>
                                } 
                            />
                            <Route 
                                path='notif/' 
                                element={
                                    <>
                                    <NotificationPage/>
                                    </>
                                } 
                            />
                            <Route 
                                path='mssg/' 
                                element={
                                    <>
                                    <MessagesPage/>
                                    </>
                                } 
                            />
                            <Route 
                                path='wallet/' 
                                element={
                                    <Wallet/>
                                    // <Transections/>
                                } 
                            />
                            <Route 
                                path='sendMoney/' 
                                element={
                                    <SendMoneyPage/>
                                }
                            />
                            <Route 
                                path='withdraw/' 
                                element={
                                    <WithdrawalPage/>
                                } 
                            />
                            <Route 
                                path='withdrawalRequests/' 
                                element={
                                    <WithdrawalRequestsPage/>
                                } 
                            />
                            <Route 
                                path='deposite/' 
                                element={
                                    <DepositePage/>
                                } 
                            />
                            <Route 
                                path='secSet/' 
                                element={
                                    <SecurityCenter/>
                                } 
                            />
                            <Route 
                                path='logSet/' 
                                element={
                                    <LoggingSettings/>
                                } 
                            />
                            <Route 
                                path='paySet/' 
                                element={
                                    <PaymentSettings/>
                                } 
                            />
                            <Route 
                                path='profile/' 
                                element={
                                    <>
                                    <ProfilePage />
                                    </>
                                } 
                            />
                            
                            <Route 
                                path='airtime/' 
                                element={
                                    <>
                                    <AirtimePurchase/>
                                    </>
                                } 
                            />
                            <Route 
                                path='support/' 
                                element={
                                    <>
                                    <Support/>
                                    </>
                                } 
                            />
                        </Routes>
                        {/* transections  */}
                        {/* <Transections/> */}
                    </div>

                    {/* <!-- user card  dash bord  --> */}
                    <div  className="user-info-space" >
                        <DashbordUserCard/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
 
export default Dashbord;