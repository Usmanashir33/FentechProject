// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [transactionType, setTransactionType] = useState('');
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [statusFilters, setStatusFilters] = useState({
    success: false,
    pending: false,
    failed: false
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilters({
      ...statusFilters,
      [status]: !statusFilters[status as keyof typeof statusFilters]
    });
  };

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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-auto md:h-screen`}>
        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20business%20man%20with%20short%20hair%20and%20subtle%20smile%2C%20high%20quality%20portrait%20photo%2C%20neutral%20background%2C%20professional%20lighting&width=100&height=100&seq=avatar1&orientation=squarish" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">John Doe</h2>
                <p className="text-sm text-gray-500">Premium Member</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <div>
                <p className="font-medium">Balance</p>
                <p className="text-blue-600">$24,563.00</p>
              </div>
              <div>
                <p className="font-medium">Status</p>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
              </div>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            <a href="#" className="flex items-center px-4 py-3 text-gray-700 bg-blue-100 rounded-lg group transition-all duration-300 hover:bg-blue-200">
              <i className="fas fa-chart-pie mr-3 text-blue-600"></i>
              <span className="font-medium">Dashboard</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 rounded-lg transition-all duration-300 hover:bg-blue-100 focus:bg-blue-200 focus:text-blue-700 group">
              <i className="fas fa-wallet mr-3 text-gray-500"></i>
              <span className="font-medium">Wallet</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <i className="fas fa-exchange-alt mr-3 text-gray-500"></i>
              <span className="font-medium">Transactions</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <i className="fas fa-chart-line mr-3 text-gray-500"></i>
              <span className="font-medium">Analytics</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <i className="fas fa-bell mr-3 text-gray-500"></i>
              <span className="font-medium">Notifications</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <i className="fas fa-user mr-3 text-gray-500"></i>
              <span className="font-medium">Profile</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <i className="fas fa-credit-card mr-3 text-gray-500"></i>
              <span className="font-medium">Cards</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <i className="fas fa-money-bill-transfer mr-3 text-gray-500"></i>
              <span className="font-medium">Transfers</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <i className="fas fa-piggy-bank mr-3 text-gray-500"></i>
              <span className="font-medium">Savings</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <i className="fas fa-hand-holding-dollar mr-3 text-gray-500"></i>
              <span className="font-medium">Investments</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <i className="fas fa-file-invoice-dollar mr-3 text-gray-500"></i>
              <span className="font-medium">Bills & Utilities</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <i className="fas fa-users mr-3 text-gray-500"></i>
              <span className="font-medium">Beneficiaries</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <i className="fas fa-shield-halved mr-3 text-gray-500"></i>
              <span className="font-medium">Security</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <i className="fas fa-headset mr-3 text-gray-500"></i>
              <span className="font-medium">Support</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <i className="fas fa-cog mr-3 text-gray-500"></i>
              <span className="font-medium">Settings</span>
            </a>
          </nav>
          {/* Footer */}
          <div className="p-4 border-t">
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 group">
              <i className="fas fa-sign-out-alt mr-3 text-gray-500"></i>
              <span className="font-medium">Logout</span>
            </a>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navbar */}
          <header className="bg-white shadow-sm z-10">
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
                    <i className="fas fa-bell text-xl"></i>
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                  </button>
                  <button className="relative text-gray-600 hover:text-gray-900 cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-envelope text-xl"></i>
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
                  </button>
                  <button className="relative text-gray-600 hover:text-gray-900 cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-money-bill-transfer text-xl"></i>
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">1</span>
                  </button>
                </div>
                <div className="relative">
                  <button className="flex items-center text-gray-700 focus:outline-none cursor-pointer !rounded-button whitespace-nowrap">
                    <span className="mr-2 text-sm">John Doe</span>
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
          </header>
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {/* Stats Section */}
            <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Account Balance */}
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Account Balance</p>
                    <p className="text-2xl font-bold text-gray-900">$24,563.00</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-full">
                    <i className="fas fa-dollar-sign text-blue-500"></i>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="flex items-center text-sm text-green-500">
                    <i className="fas fa-arrow-up mr-1"></i>
                    <span>3.5%</span>
                  </span>
                  <span className="ml-2 text-sm text-gray-500">from last month</span>
                </div>
              </div>
              {/* Income */}
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Income</p>
                    <p className="text-2xl font-bold text-gray-900">$8,350.00</p>
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
                    <p className="text-2xl font-bold text-gray-900">$4,890.00</p>
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
                    <p className="text-2xl font-bold text-gray-900">$3,460.00</p>
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
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-5 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                      <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                    <div className="relative">
                      <button 
                        id="filterButton"
                        onClick={toggleFilter} 
                        className="px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50 focus:outline-none focus:border-blue-500 flex items-center space-x-2 !rounded-button whitespace-nowrap"
                      >
                        <i className="fas fa-filter text-gray-500"></i>
                        <span>Filter</span>
                      </button>
                      
                      {isFilterOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50 border">
                          <div className="p-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Filter Transactions</h4>
                            
                            {/* Date Range */}
                            <div className="mb-4">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Date Range</label>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">From</label>
                                  <input 
                                    type="date" 
                                    className="w-full text-xs border rounded p-2"
                                    value={dateRange.start}
                                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">To</label>
                                  <input 
                                    type="date" 
                                    className="w-full text-xs border rounded p-2"
                                    value={dateRange.end}
                                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                                  />
                                </div>
                              </div>
                            </div>
                            
                            {/* Transaction Type */}
                            <div className="mb-4">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Transaction Type</label>
                              <div className="relative">
                                <select 
                                  className="w-full text-xs border rounded p-2 pr-8 appearance-none bg-white"
                                  value={transactionType}
                                  onChange={(e) => setTransactionType(e.target.value)}
                                >
                                  <option value="">All Types</option>
                                  <option value="deposit">Deposit</option>
                                  <option value="withdrawal">Withdrawal</option>
                                  <option value="transfer">Transfer</option>
                                  <option value="payment">Payment</option>
                                  <option value="purchase">Purchase</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                  <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
                                </div>
                              </div>
                            </div>
                            
                            {/* Amount Range */}
                            <div className="mb-4">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Amount Range</label>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Min ($)</label>
                                  <input 
                                    type="number" 
                                    className="w-full text-xs border rounded p-2"
                                    placeholder="0"
                                    value={amountRange.min}
                                    onChange={(e) => setAmountRange({...amountRange, min: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Max ($)</label>
                                  <input 
                                    type="number" 
                                    className="w-full text-xs border rounded p-2"
                                    placeholder="1000"
                                    value={amountRange.max}
                                    onChange={(e) => setAmountRange({...amountRange, max: e.target.value})}
                                  />
                                </div>
                              </div>
                            </div>
                            
                            {/* Status */}
                            <div className="mb-4">
                              <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
                              <div className="space-y-2">
                                <label className="flex items-center">
                                  <input 
                                    type="checkbox" 
                                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                                    checked={statusFilters.success}
                                    onChange={() => handleStatusChange('success')}
                                  />
                                  <span className="ml-2 text-xs text-gray-700">Success</span>
                                </label>
                                <label className="flex items-center">
                                  <input 
                                    type="checkbox" 
                                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                                    checked={statusFilters.pending}
                                    onChange={() => handleStatusChange('pending')}
                                  />
                                  <span className="ml-2 text-xs text-gray-700">Pending</span>
                                </label>
                                <label className="flex items-center">
                                  <input 
                                    type="checkbox" 
                                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                                    checked={statusFilters.failed}
                                    onChange={() => handleStatusChange('failed')}
                                  />
                                  <span className="ml-2 text-xs text-gray-700">Failed</span>
                                </label>
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex justify-between pt-2 border-t">
                              <button 
                                onClick={resetFilters}
                                className="px-3 py-1.5 text-xs text-gray-600 border rounded hover:bg-gray-50 !rounded-button whitespace-nowrap"
                              >
                                Reset
                              </button>
                              <button 
                                onClick={toggleFilter}
                                className="px-3 py-1.5 text-xs text-white bg-blue-600 rounded hover:bg-blue-700 !rounded-button whitespace-nowrap"
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 gap-4">
                {/* Money In Transaction */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer transform transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                  <div className="flex items-center space-x-4 w-full">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <i className="fas fa-arrow-down text-green-500 text-lg"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Money In</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">From: John Smith</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">May 27, 2025</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">+$500.00</div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Success</span>
                  </div>
                </div>
                {/* Deposit Transaction */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer transform transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <i className="fas fa-piggy-bank text-blue-500 text-lg"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Bank Deposit</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">To: Savings Account</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">May 27, 2025</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-blue-600">+$1,000.00</div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                  </div>
                </div>
                {/* Withdrawal Transaction */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer transform transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                      <i className="fas fa-arrow-up text-red-500 text-lg"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Withdrawal</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">ATM Withdrawal</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">May 26, 2025</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-red-600">-$200.00</div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Success</span>
                  </div>
                </div>
                {/* Airtime Purchase */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer transform transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <i className="fas fa-phone text-purple-500 text-lg"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Airtime Purchase</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">Phone: +1234567890</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">May 26, 2025</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-red-600">-$20.00</div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Failed</span>
                  </div>
                </div>
                {/* Data Purchase */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer transform transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <i className="fas fa-wifi text-indigo-500 text-lg"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Data Purchase</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">5GB Data Plan</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">May 25, 2025</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-red-600">-$30.00</div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Success</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        {/* Notifications Panel */}
        <div className="w-80 bg-white border-l overflow-y-auto">
          <div className="p-6 border-b">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
