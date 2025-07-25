import {LucideEyeClosed } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { liveContext } from "../customContexts/LiveContext";
import TrxCard from "./TrxCard";


const Transections = ({title='',isRecent=false}) => {
    const {transections,sendRequest} = useContext(liveContext);
    const [filteredTrxs,setFilteredTrxs] = useState([]);
    const transectionsRef = useRef(null);

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
    useEffect(() => {
       if (transections){
        if (isRecent){
          return (setFilteredTrxs(transections?.results.slice(0,3)))
        }
        setFilteredTrxs(transections?.results)
        }
    },[transections,isRecent])
    useEffect(() => {
        if (!transections?.results.length){
            sendRequest('/account/trxs/','GET','',)
        }
    },[])
    return ( 
        <div className="bg-white rounded-lg shadow-sm pb-1">
              {!isRecent && <div className=" sticky top-0 px-4 py-5 border-b  z-20 bg-white">
                <div className="flex items-center justify-between">
                  {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
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
                        className="px-3 py-2  text-sm text-gray-600 border rounded-lg hover:bg-gray-50 focus:outline-none focus:border-blue-500 flex items-center space-x-2 !rounded-button whitespace-nowrap"
                      >
                        <i className="fas fa-filter text-gray-500"></i>
                        <span>Filter</span>
                      </button>
                      
                      {isFilterOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50 border">
                          <div className="p-4">
                            <div className="flex justify-between items-center">
                                <h4 className="text-sm font-medium text-gray-900 mb-3">Filter Transactions</h4>
                                <LucideEyeClosed onClick={toggleFilter}  className="hover:bg-gray-200 p-1 hover:p-1 rounded-md text-red-900" />
                            </div>
                            
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
              </div>}
              {/* <!-- transection cards  --> */}
              <div ref={transectionsRef} className=" ">
                  {filteredTrxs?.length > 0 ? (
                      filteredTrxs.map((trx,index) => (
                       <TrxCard trx ={trx} key={trx.id}/>
                      ))
                    ) : (
                      <div className="flex w-full justify-center items-center font-medium text-gray-500 mt-5">
                        <p>No Transection Found Yet!</p>
                      </div>
                  )}
                  {/* <div className="end" ref={nextPageRef} onClick={() => {''}}>---The End----</div> */}
              </div>

            </div>
    );
}
 
export default Transections;