import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const ConfirmTrx = ({close ,confirmWithpins, trxDetails,mode='Transfer'}) => {
  const handleConfirm = () => {
    // pns toggler //
    confirmWithpins();
  };
  return (
    <div className="absolute bg-gray-50 flex  justify-center w-full top-0 min-h-full z-20">
      <div className=" relative w-full  bg-white rounded-lg shadow-md  px-6 w-full ">
        <span 
        onClick={close}
        className="text-blue-600 flex gap-2 items-center  mx-auto cursor-pointer !rounded-button whitespace-nowrap">
            <ArrowLeft  />
            Back
        </span>
        <div className="sticky  top-0 flex flex-col justify-between items-center mb-3">
          <h1 className="text-xl font-semibold text-gray-800">
            Confirm Your {mode}
          </h1>
          <div className="flex items-center text-green-500 opacity-90">
            <i className="fas fa-lock mr-2"></i>
            <span className="text-sm">Secure Transaction</span>
          </div>
        </div>

        <div className="space-y-4 mb-3 ">
          {trxDetails && Object.entries(trxDetails).map(([key,value],index) => 
              <div className="flex justify-between py-1" key={index}>
                <span className="text-gray-600">{key}</span>
                <span className={`font-medium ${key == 'Amount'? 'text-blue-600':''}`}>{key == "Amount"? `₦ ${value}` : value}</span>
              </div>
          )}
        </div>

       
          <div className="space-y-3">
            <button
              onClick={handleConfirm}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 !rounded-button cursor-pointer whitespace-nowrap"
            >
              Proceed
            </button>
          </div>
      </div>
    </div>
  );
};

export default ConfirmTrx;
