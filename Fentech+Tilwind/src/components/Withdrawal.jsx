import { ArrowLeft, LucideBanknoteArrowDown, PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Withdrawal = () => {
    const navigate = useNavigate()
    const [showAvailableBanks,setShowAvailbleBanks ]= useState(!false);
    const [addnewBank,setAddnewBank] = useState(false)
    const toggleAvailableBanks = () => {
        setShowAvailbleBanks(!showAvailableBanks)
    }

    return ( 
        // {/* Add New Bank Account */}
        <div className="">
          <div className="flex-col bg-white rounded-2xl shadow-md p-2 items-center ">
            {/* header  */}
            <div className="bg-white sticky top-0 z-50 border-b w-full   ">
                    <div className=" flex justify-between items-center ">
                        <ArrowLeft
                        onClick={() => navigate(-1)}
                        className="text-xl mb-4  hover:text-yellow-600 transition-colors duration-200"
                        />
                        <h3 className="text-lg font-medium text-gray-800 mb-4">
                        Withdraw Money
                        </h3>
                    </div>

            </div>
            {/* main */}
            <div className="p-2">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                            Amount
                            </label>
                            <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                ₦
                            </span>
                            <input
                                type="number"
                                placeholder="0.00"
                                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                                NGN
                            </span>
                            </div>
                        </div>

                        <div className="mt-2 bg-white rounded-2xl shadow-md px-2 py-2 transform transition-all duration-300 ease-in-out hover:shadow-lg">
                            <div className="text-lg font-medium text-gray-800 mb-2 flex justify-between">
                                <span>Withdrawal Bank </span>
                                <PlusCircleIcon 
                                className="hover:bg-gray-100 hover:py-2 p-1 rounded-sm text-green-400"
                                onClick={() => navigate('/payment-meth')}
                                />
                            </div>
                            {/* selected bank  */}
                            <div className="border px-3 rounded-lg relative ">
                                <div className="flex  justify-between items-center  rounded-md">
                                    <span className=" flex items-center text-green-600">
                                         <i className="fas fa-check-circle mr-1"></i>
                                        <span className="text-sm">Verified</span>
                                    </span>
                                    <p className="text-gray-700 font-medium">{'Usman Ashir Muhammad'.toLocaleUpperCase()}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <label className="text-sm text-gray-500">Bank Name</label>
                                            <p className="text-gray-700 font-medium">{'Opay'}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <label className="text-sm text-gray-500">
                                                Account Number
                                            </label>
                                            <p className="text-gray-700 font-medium">{'7046008523'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="w-full bg-purple-500 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 !rounded-button whitespace-nowrap"
                        >
                            <div className="flex gap-2">
                                < LucideBanknoteArrowDown/>
                                <span>Withdraw</span>
                            </div>
                        
                        </button>
                    </form>
                 {/* available banks  */}
                        {showAvailableBanks &&  <div className="mt-2 bg-white rounded-2xl shadow-md px-6 pt-2 pb-4 transform transition-all duration-300 ease-in-out hover:shadow-lg">
                            <div className="text-lg font-medium text-gray-800 mb-2 flex justify-between">
                                <span>Available Banks  </span>
                                <PlusCircleIcon 
                                onClick={() => {setAddnewBank(!addnewBank)}}
                                className="hover:bg-gray-100 hover:py-2 p-1 rounded-sm text-green-400"/>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <label className="text-sm text-gray-500">Bank Name</label>
                                    <p className="text-gray-800 font-medium">{'bankName'}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <div>
                                <label className="text-sm text-gray-500">
                                    Account Number
                                </label>
                                <p className="text-gray-800 font-medium">{'accountNumber'}</p>
                                </div>
                                
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                <label className="text-sm text-gray-500 mr-2">
                                    KYC Status
                                </label>
                                <span className="flex items-center text-green-600">
                                    <i className="fas fa-check-circle mr-1"></i>
                                    <span className="text-sm">Verified</span>
                                </span>
                                </div>
                                <button className="text-indigo-600 hover:text-indigo-800 transition-all duration-200 flex items-center cursor-pointer">
                                <i className="fas fa-file-alt mr-1"></i>
                                <span className="text-sm">Update KYC</span>
                                </button>
                            </div>
                        </div>}
                
            </div>
            </div>
        </div>
    );
}
 
export default Withdrawal;