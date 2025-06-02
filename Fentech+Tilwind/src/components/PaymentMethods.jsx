import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import AddNewBankModal from "./AddNewBankModal";

const PaymentMethods = () => {
    const navigate = useNavigate();
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(
    null,
  );
  const [addnewBank ,setAddNewBank] = useState(false);
  const toggleAddnewBank = () => {
    setAddNewBank(!addnewBank)
  }
  const [showEditModal, setShowEditModal] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Payment methods data
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 0,
      type: "visa",
      last4: "4242",
      expMonth: "09",
      expYear: "2026",
      name: "John Doe",
    },
    {
      id: 1,
      type: "mastercard",
      last4: "5678",
      expMonth: "12",
      expYear: "2025",
      name: "John Doe",
    },
    {
      id: 2,
      type: "bank",
      last4: "9012",
      name: "John Doe",
      bankName: "Chase Bank",
    },
  ]);
  const [withdrawalAccounts, setWithdrawalAccounts] = useState([
    {
      id: 2,
      type: "bank",
      last4: "9012",
      name: "Usman Ashir",
      bankName: "Opay",
    },
    {
      id: 2,
      type: "bank",
      last4: "9012",
      name: "Usman Ashir Muhammad ",
      bankName: "Sterling ",
    },
    {
      id: 2,
      type: "bank",
      last4: "9012",
      name: "Usman Muhamad ",
      bankName: "Palmpay ",
    },
  ]);

  // Handle setting default payment method
  const handleSetDefault = () => {
    setDefaultPaymentMethod(id);
  };

  // Handle delete payment method
  const handleDelete = () => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    setShowDeleteConfirm(null);
    if (defaultPaymentMethod === id && paymentMethods.length > 1) {
      setDefaultPaymentMethod(
        paymentMethods.find((method) => method.id !== id)?.id || 0,
      );
    }
  };

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
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full bg-white shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div
            onClick={() => {navigate(-1)}}
              className="text-blue-600 flex items-center cursor-pointer transition-colors duration-200 hover:text-blue-700"
            >
              <i className="fas fa-chevron-left mr-2 transition-transform duration-200 hover:-translate-x-1"></i>
              <span className="font-medium">Back </span>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">
              Payment Methods
            </h1>
            <div className="w-8"></div> {/* Spacer for balance */}
          </div>


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

            {withdrawalAccounts.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <i className="fas fa-credit-card text-gray-400 text-4xl mb-3"></i>
                <p className="text-gray-500">No withdrawal account  added yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {withdrawalAccounts.map((method) => (
                  <div
                    key={method.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {getCardIcon(method.type)}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium text-gray-800">
                              {method.type === "bank"
                                ? `${method.bankName} ••••${method.last4}`
                                : `•••• •••• •••• ${method.last4}`}
                            </span>
                          </div>
                          {method.type !== "bank" && (
                            <div className="text-sm text-gray-500">
                              Expires {method.expMonth}/{method.expYear}
                            </div>
                          )}
                          <div className="text-sm text-gray-500">
                            {method.name}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setShowEditModal(method.id)}
                          className="text-gray-400 hover:text-blue-500 transition-colors duration-200 cursor-pointer"
                          aria-label="Edit payment method"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
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
                        className={`w-5 h-5 rounded-full border cursor-pointer flex items-center justify-center ${
                          defaultPaymentMethod === method.id
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleSetDefault(method.id)}
                      >
                        {defaultPaymentMethod === method.id && (
                          <i className="fas fa-check text-white text-xs"></i>
                        )}
                      </div>
                      <span
                        className="ml-2 text-sm cursor-pointer"
                        onClick={() => handleSetDefault(method.id)}
                      >
                        {defaultPaymentMethod === method.id
                          ? "Default payment method"
                          : "Set as default"}
                      </span>
                    </div>

                    {/* Delete Confirmation */}
                    {showDeleteConfirm === method.id && (
                      <div className="mt-3 pt-3 border-t border-gray-100 animate-fadeIn">
                        <p className="text-sm text-gray-700 mb-2">
                          Are you sure you want to remove this payment method?
                        </p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDelete(method.id)}
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

          {/* Payment Methods List */}
          <div className=" mb-6 bg-gray-50">
            <span className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Saved Payment Methods
              </h3>
              <PlusCircleIcon 
                className="hover:bg-gray-100 hover:py-2 p-1 rounded-sm text-green-400"
                onClick={() => setShowAddModal(true)}
                />

            </span>

            {paymentMethods.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <i className="fas fa-credit-card text-gray-400 text-4xl mb-3"></i>
                <p className="text-gray-500">No payment methods added yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {getCardIcon(method.type)}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium text-gray-800">
                              {method.type === "bank"
                                ? `${method.bankName} ••••${method.last4}`
                                : `•••• •••• •••• ${method.last4}`}
                            </span>
                          </div>
                          {method.type !== "bank" && (
                            <div className="text-sm text-gray-500">
                              Expires {method.expMonth}/{method.expYear}
                            </div>
                          )}
                          <div className="text-sm text-gray-500">
                            {method.name}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setShowEditModal(method.id)}
                          className="text-gray-400 hover:text-blue-500 transition-colors duration-200 cursor-pointer"
                          aria-label="Edit payment method"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
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
                        className={`w-5 h-5 rounded-full border cursor-pointer flex items-center justify-center ${
                          defaultPaymentMethod === method.id
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleSetDefault(method.id)}
                      >
                        {defaultPaymentMethod === method.id && (
                          <i className="fas fa-check text-white text-xs"></i>
                        )}
                      </div>
                      <span
                        className="ml-2 text-sm cursor-pointer"
                        onClick={() => handleSetDefault(method.id)}
                      >
                        {defaultPaymentMethod === method.id
                          ? "Default payment method"
                          : "Set as default"}
                      </span>
                    </div>

                    {/* Delete Confirmation */}
                    {showDeleteConfirm === method.id && (
                      <div className="mt-3 pt-3 border-t border-gray-100 animate-fadeIn">
                        <p className="text-sm text-gray-700 mb-2">
                          Are you sure you want to remove this payment method?
                        </p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDelete(method.id)}
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

          {/* Add New Payment Method Button */}
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

          {/* Edit Payment Method Modal */}
          {showEditModal !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
              <div className="bg-white rounded-xl w-full max-w-md p-6 transform transition-all duration-300 scale-100 opacity-100 animate-scaleIn">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Edit Payment Method
                  </h3>
                  <button
                    onClick={() => setShowEditModal(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Edit payment method logic would go here
                    setShowEditModal(null);
                  }}
                >
                  <div className="space-y-4">
                    {/* For a card, show card fields */}
                    {paymentMethods.find((m) => m.id === showEditModal)
                      ?.type !== "bank" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="MM/YY"
                            defaultValue={`${paymentMethods.find((m) => m.id === showEditModal)?.expMonth || ""}/${paymentMethods.find((m) => m.id === showEditModal)?.expYear || ""}`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="John Doe"
                            defaultValue={
                              paymentMethods.find((m) => m.id === showEditModal)
                                ?.name || ""
                            }
                          />
                        </div>
                      </>
                    )}

                    {/* For a bank account */}
                    {paymentMethods.find((m) => m.id === showEditModal)
                      ?.type === "bank" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="John Doe"
                          defaultValue={
                            paymentMethods.find((m) => m.id === showEditModal)
                              ?.name || ""
                          }
                        />
                      </div>
                    )}

                    <div className="flex items-center mt-4">
                      <div
                        className={`w-5 h-5 rounded-full border cursor-pointer flex items-center justify-center ${
                          defaultPaymentMethod === showEditModal
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                        onClick={() => handleSetDefault(showEditModal)}
                      >
                        {defaultPaymentMethod === showEditModal && (
                          <i className="fas fa-check text-white text-xs"></i>
                        )}
                      </div>
                      <span
                        className="ml-2 text-sm cursor-pointer"
                        onClick={() => handleSetDefault(showEditModal)}
                      >
                        {defaultPaymentMethod === showEditModal
                          ? "Default payment method"
                          : "Set as default"}
                      </span>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg !rounded-button hover:bg-blue-700 transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEditModal(null)}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg !rounded-button hover:bg-gray-300 transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        {addnewBank && <AddNewBankModal closeModal={toggleAddnewBank}/>}
      </div>

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
