import { ArrowLeft } from "lucide-react";

const AddNewBankModal = ({closeModal}) => {
    return ( 
        <div className="fixed inset-0 bg-black bg-opacity-50 max-w-m flex items-center justify-center z-50">
            {/* Mobile Form Overlay */}
            <div className="bg-opacity-50  text-white px-4 py-2 rounded-lg shadow-2xl bg-gray-50
                    overflow-y-auto shadow-2xl  transition-all duration-500 ease-in-out scale-100 ">
                    <div className="">
                    <h3 className=" flex items-center gap-5 py-2 text-lg font-medium text-gray-800">
                        <ArrowLeft onClick={closeModal} 
                        className="hover:bg-gray-100 hover:py-2  rounded-sm cursor-pointer"  
                            />
                        Add New Bank Account
                    </h3>
                    
                    </div>

                    <form className="space-y-4">
                    <div className="relative">
                        <label className=" block text-sm font-medium text-gray-600 mb-1">
                        Bank Name
                        </label>
                        <div className="relative">
                        <input
                            type="text"
                            placeholder="Select your bank"
                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50 cursor-pointer"
                            readOnly
                            onClick={() =>
                            document
                                .getElementById("bankList")
                                .classList.toggle("hidden")
                            }
                        />
                        <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>

                        {/* Nigerian Banks Dropdown */}
                        <div
                        id="bankList"
                        className="hidden absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                        >
                        <div className="p-2 space-y-1">
                            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <i className="fas fa-university text-indigo-600"></i>
                            <span>Access Bank</span>
                            </div>
                            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <i className="fas fa-university text-green-600"></i>
                            <span>First Bank</span>
                            </div>
                            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <i className="fas fa-university text-red-600"></i>
                            <span>UBA</span>
                            </div>
                            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <i className="fas fa-university text-yellow-600"></i>
                            <span>GTBank</span>
                            </div>
                            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <i className="fas fa-university text-blue-600"></i>
                            <span>Zenith Bank</span>
                            </div>
                            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <i className="fas fa-university text-purple-600"></i>
                            <span>Fidelity Bank</span>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                        Account Holder Name
                        </label>
                        <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter account holder name"
                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50"
                        />
                        <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                        Account Number
                        </label>
                        <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter account number"
                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50"
                            maxLength="10"
                            pattern="\d*"
                        />
                        <i className="fas fa-hashtag absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                        Enter your 10-digit account number
                        </p>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                        Bank Verification Number (BVN)
                        </label>
                        <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter your BVN"
                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50"
                            maxLength="11"
                            pattern="\d*"
                        />
                        <i className="fas fa-shield-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                        Enter your 11-digit BVN number
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="defaultAccount"
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                            htmlFor="defaultAccount"
                            className="text-sm text-gray-600"
                        >
                            Set as default account
                        </label>
                        </div>
                        <button
                        type="button"
                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                        >
                        <i className="fas fa-question-circle mr-1"></i>
                        What's this?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 !rounded-button whitespace-nowrap"
                    >
                        <i className="fas fa-plus"></i>
                        <span>Link Bank Account</span>
                    </button>

                    <p className="text-center text-xs text-gray-500 mt-4">
                        <i className="fas fa-lock mr-1"></i>
                        Your banking information is encrypted and secure
                    </p>
                    </form>
            </div>
        </div>
     );
}
 
export default AddNewBankModal;