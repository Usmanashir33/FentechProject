import { ArrowLeft } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import useExRequest from "../customHooks/ExternalRequestHook";
import { uiContext } from "../customContexts/UiContext";
import Pins from "./PinsPage";

const AddNewBankModal = ({closeModal,getNewAccount}) => {
    const url = '/account/setting_withdrowal_acc/'
    const {setError,setSuccess} = useContext(uiContext);
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");
    const [selectedBank, setSelectedBank] = useState(null);
    const[is_default, setIsDefault] = useState(false);
    const [bankSearch, setBankSearch] = useState("");
    const [banks, setBanks] = useState([]);
    const [refetchBanks, setRefetchBanks] = useState(false);
    const {sendExRequest} = useExRequest();
    const [pinModel,setPinModel] = useState(false);
    const [form,setForm] = useState({})

    const serverresponse = (data) => {
        getNewAccount(data);
        if(data?.success){
            setSuccess(data?.success);
            closeModal();
            setPinModel(false);
        }
    }
    const handleConfirmSaveWithPins = (Pinss) => {
        form.payment_pin = Pinss
        sendExRequest(url,"POST",form,serverresponse) 
    }
    const handleSaveNewAccount = (e) => {
    e.preventDefault();
    if (accountNumber && selectedBank && accountName){
        setForm({
            action :"saveBank",
            account_number: accountNumber,
            account_name : accountName,
            bank_code: selectedBank.code,
            bank_name: selectedBank.name,
            is_default:is_default
        });
        setPinModel(true);
        return ;
    }
    setError("Please enter valid account.");
    }

    const banksObtained = (data) => {
      let banks = JSON.parse(data.banks);
      setBanks(banks.data);
    }
    const filteredBanks = banks?.filter((bank) => 
      bank.name.toLowerCase().includes(bankSearch.toLowerCase())
    );

    const verifyAccountObtained = (data) => {
      let resp = JSON.parse(data?.account_fetched);
      setAccountName(resp?.data?.account_name);
      if (resp?.status === "error"){
        setError(resp?.message || "Account verification failed. Please check your details.");
      } else {  
        // setErrorAccount(false);
      }
    }
    
    useEffect(() => {
      if (accountNumber.length >= 10 && selectedBank) {
        if (accountNumber.length > 10) {setError("Account number must be 10 digits."); return;}
        let formdata = {
          action: 'verifyBank',
          account_number: accountNumber,
          bank_code: selectedBank.code,
          bank_name: selectedBank.name,
        };
        sendExRequest(url,"POST",formdata,verifyAccountObtained);
      }
    },[accountNumber, selectedBank])
    
    useEffect(() => {
      sendExRequest(url,"POST",{'action':'fetchBanks'},banksObtained)
    },[refetchBanks])
    return ( 
        <div className="fixed inset-0 bg-black bg-opacity-50 max-w-m flex items-center justify-center z-20 ">
           
            {/* Mobile Form Overlay */}
            <div className=" bg-opacity-50  text-white px-4 py-2 rounded-lg shadow-2xl bg-gray-50
                    overflow-y-auto shadow-2xl  transition-all duration-500 ease-in-out scale-100 ">
                    <div className="">
                    <h3 className=" flex items-center gap-5 py-2 text-lg font-medium text-gray-800">
                        <ArrowLeft onClick={closeModal} 
                        className="hover:bg-gray-100 hover:py-2  rounded-sm cursor-pointer"  
                            />
                        Add New Bank Account 
                    </h3>
                    
                    </div>

                    <form className="space-y-4 "onSubmit={(e) => {handleSaveNewAccount(e)}}  >
                    <div className="relative">
                        <label className=" block text-sm font-medium text-gray-600 mb-1">
                        Bank Name
                        </label>
                        <div className="relative">
                        <input
                            type="text"
                            value={bankSearch}
                            required
                            placeholder="Select your bank"
                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50 text-gray-700 "
                            onChange={(e) => {setBankSearch(e.target.value);
                            const bankList = document.getElementById('bankList');
                            bankList.classList.remove('hidden');}
                            }
                            
                        />
                        <i 
                        onClick={() => {
                            const bankList = document.getElementById('bankList');
                            bankList.classList.toggle('hidden');
                            if(!banks.length){
                                setRefetchBanks(!refetchBanks);
                            }
                        }}
                        className="fas fa-chevron-down cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>

                        {/* Nigerian Banks Dropdown */}
                        <div
                        id="bankList"
                        className="hidden absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                        >
                        <div className="p-2 space-y-1  ">
                            {filteredBanks.length > 0 ? filteredBanks?.map(({code,id,name}) => 
                                <div 
                                key={id}
                                onClick={() => {
                                    setAccountName('');
                                    setSelectedBank({code,id,name});
                                    setBankSearch(name);
                                    setAccountNumber(""); // Reset account number when bank is selected
                                    const bankList = document.getElementById('bankList');
                                    bankList.classList.add('hidden');
                                }}
                                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                <i className="fas fa-university text-indigo-600"></i>
                                <span className="text-gray-500 text-sm">{name}</span>
                                </div>
                            ) : (
                                <>
                                    {banks.length && <div className="p-2 text-gray-500 text-center text-sm">
                                        bank not  found!
                                    </div>}
                                    {!banks.length && <div 
                                        onClick={() => {sendExRequest(url,"POST",{'action':'fetchBanks'},banksObtained)}}
                                        className="p-2 text-indigo-500 text-center text-sm cursor-pointer">
                                        No banks available. Please try again later.
                                    </div>}

                                </>
                            )}
                        </div>
                        </div>

                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                        Account Number
                        </label>
                        <div className="relative">
                        <input
                            type="number"
                            value={accountNumber}
                            required
                            onChange={(e) => {setAccountNumber(e.target.value);setAccountName("");}}
                            placeholder="Enter account number"
                            className="w-full px-4 py-2 pl-10 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50"
                            maxLength="10"
                            minLength="10"
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
                        Account Holder Name
                        </label>
                        <div className="relative">
                        <input
                            type="text"
                            value={accountName}
                            readOnly
                            required
                            placeholder="Validated Name"
                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg text-gray-900 text-md font-mediu bg-gray-50"
                        />
                        <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>

                   

                    {/* <div className="relative ">
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
                    </div> */}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="defaultAccount"
                            onClick={(e) => setIsDefault(e.target.checked)}
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
                        onClick={() => {
                            const title = document.getElementById('thisTitle');
                            title.classList.toggle('hidden');
                        }}
                        type="button"
                        className=" text-indigo-600 hover:text-indigo-800 text-sm"
                        >
                        <i className="fas fa-question-circle mr-1"></i>
                        What's this?
                        </button>
                    </div>
                        {<span id="thisTitle" className=" hidden text-xs text-gray-500">
                            The default account will be used for all withdrawals unless specified otherwise.
                        </span>}

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
            {pinModel && <div className="absolute w-full  max-w-md flex justify-center items-center top-1   rounded-md left-50% h-full z-30">
                {<Pins close={setPinModel} triggerFunc={handleConfirmSaveWithPins}/>}
            </div>}
            

        </div>
     );
}
 
export default AddNewBankModal;