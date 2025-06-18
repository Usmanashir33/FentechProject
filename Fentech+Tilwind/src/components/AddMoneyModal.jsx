import { useContext } from "react";
import { uiContext } from "../customContexts/UiContext";
import { authContext } from "../customContexts/AuthContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AddMoneyModal = ({toggleModal}) => {
    const {formatNaira,copyToClipboard} = useContext(uiContext);
    const {currentUser} = useContext(authContext)
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Add Money</h3>
            <button onClick={toggleModal} className="text-gray-500">
              <i className="fas fa-times"></i>
            </button> 
          </div>

          <div className="space-y-4">
             <div className="bg-gray-50 rounded-xl p-2 flex items-center cursor-pointer hover:bg-gray-100 transition-colors relative ">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-university text-green-600"></i>
              </div>
              <div>
                <h4 className="font-medium">Bank Transfer</h4>
                <p className="text-sm text-gray-500">
                  Transfer from your bank account
                </p>
                <div className="flex gap-5">
                  <span className="text-xs text-gray-400 mt-1"
                    onClick={() => {
                copyToClipboard(`${currentUser?.account?.accountnumbers[0]?.account_number || 'null'}`,
                    'account number copied')}}
                  >
                    Acc Number: {currentUser?.account?.accountnumbers[0]?.account_number}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    Bank: {currentUser?.account?.accountnumbers[0]?.bank_name}
                  </span>

                </div>
              </div>
              <ChevronRight className="ml-auto text-gray-400 hover:text-black"
               onClick={() => {
                copyToClipboard(`
                    Acc Number: ${currentUser?.account?.accountnumbers[0]?.account_number || 'null'}
                    Bank Name: ${currentUser?.account?.accountnumbers[0]?.bank_name || 'null'}
                    `,
                    'account details copied')}
              }/>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex items-center cursor-pointer hover:bg-gray-100 transition-colors relative ">
              <span className="absolute top-0 text-xs  text-red-900 bg-red-200 font-medium rounded-full px-2 p-0">Not Available </span>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-credit-card text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-medium">Bank Card</h4>
                <p className="text-sm text-gray-500">
                  Add money using your debit/credit card
                </p>
              </div>
              <i className="fas fa-chevron-right ml-auto text-gray-400"></i>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex items-center cursor-pointer hover:bg-gray-100 transition-colors relative ">
              <span className="absolute top-0 text-xs  text-red-900 bg-red-200 font-medium rounded-full px-2 p-0">Not Available </span>
              
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-qrcode text-purple-600"></i>
              </div>
              <div>
                <h4 className="font-medium">QR Code</h4>
                <p className="text-sm text-gray-500">
                  Scan QR code to add money
                </p>
              </div>
              <i className="fas fa-chevron-right ml-auto text-gray-400"></i>
            </div>

          </div>

        </div>
      </div>
    );
  };

export default AddMoneyModal ;