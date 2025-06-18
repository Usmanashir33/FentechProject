import { PlusCircleIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AddNewBankModal from "./AddNewBankModal";
import useRequest from "../customHooks/RequestHook";
import useExRequest from "../customHooks/ExternalRequestHook";
import Pins from "./PinsPage";
import { uiContext } from "../customContexts/UiContext";

const PaymentMethods = () => {
    const navigate = useNavigate();
    const {sendArbitRequest} = useRequest();
    const {setSuccess} = useContext(uiContext);
    const {sendExRequest} = useExRequest();
    const [banks,setBanks] = useState([]);
    const [showPinModal, setShowPinModal] = useState(false);
    const [editingAccountId, setEditingAccId] = useState(null);
    const [editingMode,setEditingmode] = useState('deleting')
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const [addnewBank ,setAddNewBank] = useState(false);
  const toggleAddnewBank = () => {
    setAddNewBank(!addnewBank)
  }
  const [showAddModal, setShowAddModal] = useState(false);

  
  // Handle setting default payment method
  const handleSetDefaultBank = (id) => {
    setEditingAccId(id);
    setEditingmode("edit")
    setShowPinModal(true);
  };

  const handleEditAccResponse = (data) => {
    const {success,id,defaulting} = data ;
    setShowPinModal(false);
    setSuccess(success);
    if (defaulting){ // its default response 
      setBanks(banks.map((bank) => {
        if (bank.id == id){
          bank.is_default = true;
        }else{
          bank.is_default = false;
        }
        return bank ;
        
      }))
      const defaultBank = banks?.find((bank) => bank.is_default);
      setBanks([defaultBank,...banks?.filter((bank) => !bank.is_default)]);

      return ; // to close the function 
    
    }
    setBanks(banks.filter((method) => method.id !== id));
  }
const handleAddNewBank = (data) => {
    const {new_account} = data;
    setBanks((prevBanks) => [new_account, ...prevBanks]);
  }
  const handlePinsResp = (payment_pin) => {
    let formdata = {
      'payment_pin': payment_pin,
    }
    const url = `/account/edit_withdrowal_acc/${editingAccountId}/`
    if(editingAccountId){
      sendExRequest(url,`${editingMode == "deleting"? "DELETE" : "PUT"}`,formdata,handleEditAccResponse)
    }
  }
  const handleDelete = (id) => {
    // Handle delete payment method
    // lets call pins to confirm delation 
    setEditingmode("deleting")
    setEditingAccId(id);
    setShowPinModal(true); 
  };
  
  const grabBankData = (data) => {
        const defaultBank = data?.accounts?.find((bank) => bank.is_default);
        const banks = data?.accounts;
        setBanks([defaultBank,...banks.filter((bank) => !bank.is_default)]);
  }
   useEffect(() => {
      // tetch banks data
      const url = '/account/getting_withdrowal_acc/'
      sendArbitRequest(url,"GET",null,grabBankData)
    },[])

  // Get card icon based on type
  const getCardIcon = (type) => {
    switch (type) {
      case "visa":
        return <i className="fab fa-cc-visa text-blue-700 text-2xl"></i>;
      case "mastercard":
        return <i className="fab fa-cc-mastercard text-red-500 text-2xl"></i>;
      case "amex":
        return <i className="fab fa-cc-amex text-blue-500 text-2xl"></i>;
      case "bank":
        return <i className="fas fa-university text-green-700 text-2xl"></i>;
      default:
        return <i className="fas fa-credit-card text-gray-700 text-2xl"></i>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center relative">
      <div className="w-full bg-white shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="p-4">

          {/* Withdrawal Account List  */}
          <div className=" mb-6">
            <span className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Saved Withdrawal Accounts
              </h3>
              <PlusCircleIcon 
                className="hover:bg-gray-100 hover:py-2 p-1 rounded-sm text-green-400"
                onClick={toggleAddnewBank}
                />

            </span>

            {banks.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <i className="fas fa-credit-card text-gray-400 text-4xl mb-3"></i>
                <p className="text-gray-500">No withdrawal account  added yet</p>
              </div>
            ) : (
              <div className="space-y-3 ">
                {banks && banks.map((method) => (
                  <div
                    key={method?.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {getCardIcon('bank')}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium text-gray-800">
                              {`${method?.bank_name} ••••
                                ${
                                    method?.account_number?.slice(-4)
                                }`}
                            </span>
                          </div>
                          
                          <div className="text-sm text-gray-500 font-medium">
                            {method?.account_name}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setShowDeleteConfirm(method.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                          aria-label="Delete payment method"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center">
                      <div
                        onClick={() => handleSetDefaultBank(method.id)}
                        className={`w-4 h-4 hover:bg-blue-500 rounded-md border cursor-pointer  ${
                          method?.is_default
                            ? " hidden"
                            : "border-blue-500 flex items-center justify-center "
                        }`}
                        
                      >
                        
                      </div>
                      <span
                        className={`ml-2 text-sm ${
                          method?.is_default
                            ? "text-blue-500 "
                            : "text-gray-700"
                        } cursor-pointer`}
                      >
                        {method?.is_default
                          ? "Default withdrawal account"
                          : "Set as default"}
                      </span>
                    </div>

                    {/* Delete Confirmation */}
                    {showDeleteConfirm === method?.id && (
                      <div className="mt-3 pt-3 border-t border-gray-100 animate-fadeIn">
                        <p className="text-sm text-gray-700 mb-2">
                          Are you sure you want to remove it ?
                        </p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDelete(method?.id)}
                            className="px-3 py-1 bg-red-500 text-white text-sm rounded !rounded-button whitespace-nowrap cursor-pointer hover:bg-red-600 transition-colors duration-200"
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded !rounded-button whitespace-nowrap cursor-pointer hover:bg-gray-300 transition-colors duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

         

          {/* Add Payment Method Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
              <div className="bg-white rounded-xl w-full max-w-md p-6 transform transition-all duration-300 scale-100 opacity-100 animate-scaleIn">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Add Payment Method
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Add new payment method logic would go here
                    setShowAddModal(false);
                  }}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="flex items-center mt-4">
                      <div className="w-5 h-5 rounded-full border border-blue-500 bg-blue-500 flex items-center justify-center cursor-pointer">
                        <i className="fas fa-check text-white text-xs"></i>
                      </div>
                      <span className="ml-2 text-sm">
                        Set as default payment method
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 rounded-lg !rounded-button hover:bg-blue-700 transition-colors duration-200 font-medium mt-4 whitespace-nowrap cursor-pointer"
                    >
                      Add Payment Method
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
        </div>
        {addnewBank && <AddNewBankModal closeModal={toggleAddnewBank} getNewAccount={handleAddNewBank}/>}
      </div>
      {showPinModal &&  <Pins close={setShowPinModal} triggerFunc={handlePinsResp}  />}
        
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default PaymentMethods;
