// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useRef, useEffect } from "react";
// interface DateRange {
//   startDate: string;
//   endDate: string;
// }
const WithdrawalRequests = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [dateFilter, setDateFilter] = useState("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [rejectRequestId, setRejectRequestId] = useState("");
  const [acceptRequestId, setAcceptRequestId] = useState("");
  const [showAcceptAllModal, setShowAcceptAllModal] = useState(false);
  const [showRejectAllModal, setShowRejectAllModal] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: "",
    endDate: "",
  });
  const datePickerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event ) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target )
      ) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleDateRangeClick = () => {
    setShowDatePicker(!showDatePicker);
  };
  const handleDateSelect = (range) => {
    setSelectedRange(range);
    setShowDatePicker(false);
    setDateFilter("custom");
  };
  const getPresetDates = () => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    return {
      lastWeek: lastWeek.toISOString().split("T")[0],
      lastMonth: lastMonth.toISOString().split("T")[0],
      today: today.toISOString().split("T")[0],
    };
  };
  const pendingRequests = [
    {
      id: "WD-2310150001",
      name: "Sarah Johnson",
      amount: 2500,
      bankName: "Bank of America",
      accountNumber: "****4589",
      date: "Oct 15, 2023",
      status: "Pending",
    },
    {
      id: "WD-2310150002",
      name: "Michael Chen",
      amount: 1800,
      bankName: "Chase Bank",
      accountNumber: "****7623",
      date: "Oct 15, 2023",
      status: "Pending",
    },
    {
      id: "WD-2310150003",
      name: "Emily Wilson",
      amount: 3200,
      bankName: "Wells Fargo",
      accountNumber: "****9012",
      date: "Oct 15, 2023",
      status: "Pending",
    },
    {
      id: "WD-2310150004",
      name: "David Brown",
      amount: 1500,
      bankName: "Citibank",
      accountNumber: "****3456",
      date: "Oct 15, 2023",
      status: "Pending",
    },
  ];

  const acceptedRequests = [
    {
      id: "WD-2310140001",
      name: "Robert Smith",
      amount: 3500,
      bankName: "Wells Fargo",
      accountNumber: "****1234",
      date: "Oct 14, 2023",
      status: "Accepted",
    },
    {
      id: "WD-2310140002",
      name: "Lisa Anderson",
      amount: 2800,
      bankName: "Chase Bank",
      accountNumber: "****5678",
      date: "Oct 14, 2023",
      status: "Accepted",
    },
    {
      id: "WD-2310140003",
      name: "James Wilson",
      amount: 4200,
      bankName: "Bank of America",
      accountNumber: "****9012",
      date: "Oct 14, 2023",
      status: "Accepted",
    },
    {
      id: "WD-2310140004",
      name: "Emma Davis",
      amount: 1900,
      bankName: "Citibank",
      accountNumber: "****3456",
      date: "Oct 14, 2023",
      status: "Accepted",
    },
  ];
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handleDateFilterChange = (filter) => {
    setDateFilter(filter);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleAccept = (id) => {
    console.log(`Accepted request ${id}`);
  };
  const handleRejectClick = (id) => {
    setRejectRequestId(id);
    setShowRejectModal(true);
  };
  const handleRejectConfirm = () => {
    console.log(`Rejected request ${rejectRequestId}`);
    setShowRejectModal(false);
    setRejectRequestId("");
  };
  const handleRejectCancel = () => {
    setShowRejectModal(false);
    setRejectRequestId("");
  };
  return (
    <div className="min-h-screen bg-gray-50 w-full  relative ">
        
      {/* Header */}
      <header className="w-full   bg-white  shadow-sm sticky top-0 z-10 ">
        {/* Tabs */}
        <div className="border-b border-gray-200  overflow-x-hidden">
          <nav className="flex  justify-between">
            <button
              onClick={() => handleTabChange("pending")}
              className={` cursor-pointer py-2 px-2 border-b-2 font-medium text-sm ${
                activeTab === "pending"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Pending Requests{" "}
              <span className="ml-1.5 py-0.5 px-2 bg-gray-100 text-gray-600 rounded-full text-xs">
                12
              </span>
            </button>

            <button
              onClick={() => handleTabChange("accepted")}
              className={` cursor-pointer py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "accepted"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Accepted Requests{" "}
              <span className="ml-1.5 py-0.5 px-2 bg-gray-100 text-gray-600 rounded-full text-xs">
                45
              </span>
            </button>
            <button
              onClick={() => handleTabChange("rejected")}
              className={` cursor-pointer py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "rejected"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Rejected Requests{" "}
              <span className="ml-1.5 py-0.5 px-2 bg-gray-100 text-gray-600 rounded-full text-xs">
                8
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* Filters */}
      <div className="w-full px-2  py-4">
        <div className="flex flex-col sm:flex-row  bg-white rounded-lg shadow-sm p-2">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div className="flex space-x-2 mr-2">
              <button
                onClick={() => setShowAcceptAllModal(true)}
                className="!rounded-button whitespace-nowrap bg-blue-600 text-white px-4 py-2 text-sm rounded-md flex items-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <i className="fas fa-check-double mr-2"></i> Accept All
              </button>
              <button
                onClick={() => setShowRejectAllModal(true)}
                className="!rounded-button whitespace-nowrap bg-white text-red-600 px-4 py-2 text-sm border border-red-300 rounded-md flex items-center hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <i className="fas fa-times-circle mr-2"></i> Reject All
              </button>
            </div>

            <div className="relative">
              <div
                id="dateRangeSelector"
                className="flex items-center text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={handleDateRangeClick}
              >
                <i className="far fa-calendar-alt mr-2"></i>
                <span className="text-sm">
                  {selectedRange.startDate && selectedRange.endDate
                    ? `${selectedRange.startDate} - ${selectedRange.endDate}`
                    : "Select date range"}
                </span>
              </div>
              {showDatePicker && (
                <div
                  ref={datePickerRef}
                  className="absolute  top-full mt-2  bg-white rounded-lg shadow-lg p-4 w-80 z-50 left-1/2 transform  -translate-x-full"

                //   className="absolute top-full left-0  -translate-x-2  "
                >
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Date Range
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          Start Date
                        </label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                          value={selectedRange.startDate}
                          onChange={(e) =>
                            setSelectedRange({
                              ...selectedRange,
                              startDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">
                          End Date
                        </label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                          value={selectedRange.endDate}
                          onChange={(e) =>
                            setSelectedRange({
                              ...selectedRange,
                              endDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Preset Ranges
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className="text-sm px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-600"
                        onClick={() =>
                          handleDateSelect({
                            startDate: getPresetDates().lastWeek,
                            endDate: getPresetDates().today,
                          })
                        }
                      >
                        Last 7 days
                      </button>
                      <button
                        className="text-sm px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-600"
                        onClick={() =>
                          handleDateSelect({
                            startDate: getPresetDates().lastMonth,
                            endDate: getPresetDates().today,
                          })
                        }
                      >
                        Last 30 days
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      className="!rounded-button whitespace-nowrap px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                      onClick={() => setShowDatePicker(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="!rounded-button whitespace-nowrap px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                      onClick={() => handleDateSelect(selectedRange)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search by name or account"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {(activeTab === "pending" ? pendingRequests : acceptedRequests).map(
            (request) => (
              <div
                key={request.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-medium text-gray-900">
                      {request.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-gray-900 mb-3">
                    ${request.amount.toLocaleString()}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Bank Name</p>
                      <p className="text-sm font-medium text-gray-900">
                        {request.bankName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Account Number</p>
                      <p className="text-sm font-medium text-gray-900">
                        {request.accountNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Request Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {request.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Request ID</p>
                      <p className="text-sm font-medium text-gray-900">
                        {request.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    {request.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => handleAcceptClick(request.id)}
                          className="!rounded-button whitespace-nowrap cursor-pointer flex-1 bg-blue-600 text-white py-2 text-sm rounded-md flex justify-center items-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <i className="fas fa-check mr-2"></i> Accept
                        </button>
                        <button
                          onClick={() => handleRejectClick(request.id)}
                          className="!rounded-button whitespace-nowrap cursor-pointer flex-1 bg-white text-red-600 py-2 text-sm border border-red-300 rounded-md flex justify-center items-center hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <i className="fas fa-times mr-2"></i> Reject
                        </button>
                      </>
                    ) : (
                      <button
                        className="!rounded-button whitespace-nowrap cursor-pointer flex-1 bg-gray-100 text-gray-600 py-2 text-sm rounded-md flex justify-center items-center"
                        disabled
                      >
                        <i className="fas fa-check-circle mr-2"></i> Processed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
      {/* Accept Confirmation Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <i className="fas fa-check text-blue-600"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Confirm Acceptance
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to accept this withdrawal request?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAcceptConfirm}
                  className="!rounded-button whitespace-nowrap w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm Acceptance
                </button>
                <button
                  type="button"
                  onClick={handleAcceptCancel}
                  className="!rounded-button whitespace-nowrap mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Accept All Confirmation Modal */}
      {showAcceptAllModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <i className="fas fa-check-double text-blue-600"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Accept All Requests
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to accept all pending withdrawal
                        requests? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => {
                    console.log("Accepting all requests");
                    setShowAcceptAllModal(false);
                  }}
                  className="!rounded-button whitespace-nowrap w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  onClick={() => setShowAcceptAllModal(false)}
                  className="!rounded-button whitespace-nowrap mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Reject All Confirmation Modal */}
      {showRejectAllModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <i className="fas fa-times-circle text-red-600"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Reject All Requests
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to reject all pending withdrawal
                        requests? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => {
                    console.log("Rejecting all requests");
                    setShowRejectAllModal(false);
                  }}
                  className="!rounded-button whitespace-nowrap w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Reject All
                </button>
                <button
                  type="button"
                  onClick={() => setShowRejectAllModal(false)}
                  className="!rounded-button whitespace-nowrap mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Reject Confirmation Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <i className="fas fa-exclamation-triangle text-red-600"></i>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Confirm Rejection
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to reject this withdrawal request?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleRejectConfirm}
                  className="!rounded-button whitespace-nowrap w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm Rejection
                </button>
                <button
                  type="button"
                  onClick={handleRejectCancel}
                  className="!rounded-button whitespace-nowrap mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default WithdrawalRequests;
