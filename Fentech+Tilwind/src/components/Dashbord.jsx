import { useContext, useState } from "react";
import Transections from "./Transections";
import { authContext } from "../customContexts/AuthContext";
import { uiContext } from "../customContexts/UiContext";

const Dashboard = () => {
    const {currentUser} = useContext(authContext);
    const {formatNaira} = useContext(uiContext);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [transactionType, setTransactionType] = useState('');
    const [amountRange, setAmountRange] = useState({ min: '', max: '' });
    const [statusFilters, setStatusFilters] = useState({
        success: false,
        pending: false,
        failed: false
      });
    const resetFilters = () => {
        setDateRange({ start: '', end: '' });
        setTransactionType('');
        setAmountRange({ min: '', max: '' });
        setStatusFilters({
        success: false,
        pending: false,
        failed: false
        });
    };
    const handleStatusChange = (status) => {
    setStatusFilters({
      ...statusFilters,
    //   [status]: !statusFilters[status as keyof typeof statusFilters]
    });
  };
    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };
    return ( 
        <>
            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4 mb-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* Account Balance */}
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Account Balance</p>
                    <p className="md:text-2xl font-bold text-gray-900">{formatNaira(currentUser?.account?.account_balance)}</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-full">
                    <i className="fas fa-dollar-sign text-blue-500"></i>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="ml-2 text-sm text-gray-500">current spendable balance </span>
                </div>
              </div>
              {/* Income */}
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Income</p>
                    <p className="md:text-2xl font-bold text-gray-900">$8,350.00</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-full">
                    <i className="fas fa-chart-line text-green-500"></i>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="flex items-center text-sm text-green-500">
                    <i className="fas fa-arrow-up mr-1"></i>
                    <span>5.2%</span>
                  </span>
                  <span className="ml-2 text-sm text-gray-500">from last month</span>
                </div>
              </div>
              {/* Expenses */}
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Expenses</p>
                    <p className="md:text-2xl font-bold text-gray-900">$4,890.00</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-full">
                    <i className="fas fa-receipt text-red-500"></i>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="flex items-center text-sm text-red-500">
                    <i className="fas fa-arrow-up mr-1"></i>
                    <span>2.8%</span>
                  </span>
                  <span className="ml-2 text-sm text-gray-500">from last month</span>
                </div>
              </div>
              {/* Savings */}
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Savings</p>
                    <p className="md:text-2xl font-bold text-gray-900">$3,460.00</p>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-full">
                    <i className="fas fa-piggy-bank text-indigo-500"></i>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">65%</span>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <Transections title="Resent transections "/>
        </>
    );
}
 
export default Dashboard ;