// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import { useContext, useEffect } from "react";
import { uiContext } from "../customContexts/UiContext";

const Floaters = () => {
  const {isLoading,setIsLoading,error,setError,success,setSuccess} = useContext(uiContext)
  
  useEffect(() => {
    if (error || success){
      setTimeout(() => {
        setError('')
        setSuccess('')
      }, 2000);
    }
  },[success,error])
  return (
    <div className=" fixed w-max z-50 flex justify-center w-full ">
      
      {/* Floating Message Container System */}
      <div className="fixed top-4 rounded-lg right-4 z-50 flex-col justify-center w-max  max-w-sm  pointer-events-none">
            {success && <button className=" flex  gap-4 justify-between items-center rounded-md  bg-green-500 hover:bg-green-600 text-white px-4 py-1 !rounded-button whitespace-nowrap cursor-pointer transition-colors duration-300">
            <i className="fas fa-check-circle text-white text-xl"></i>
              {success}
            <button onClick={() =>  setSuccess("")}
              className="ml-3 text-white hover:text-gray-200 cursor-pointer">
              <i className="fas fa-times"></i>
            </button>
            </button>}

            {/* error  */}
            {error && <button className="  flex gap-4 items-center justify-between  rounded-md  bg-red-500 hover:bg-red-600 text-white px-4 py-1 !rounded-button whitespace-nowrap cursor-pointer transition-colors duration-300">
            <i className="fas fa-exclamation-circle text-white text-xl"></i>
              {error}
            <button 
              className="ml-3 text-white hover:text-gray-200 cursor-pointer">
              <i onClick={() => {setError('error contain')}}  className="fas fa-times"></i>
            </button>
            </button>}
      </div>

      {/* Loading Overlay */}
      {isLoading  && (
          <div className=" fixed top-5 bg-white opacity-90 p-2 rounded-md  shadow-lg flex flex-col items-center">
            <div className="animate-spin text-blue-500 mb-">
              <i className="fas fa-spinner fa-2x"></i>
            </div>
            <span className="text-gray-700 font-normal">Loading</span>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        @media (max-width: 768px) {
          .fixed.top-4.right-4 {
            left: 1rem;
            right: 1rem;
            max-width: calc(100% - 2rem);
          }
        }
      `}</style>
    </div>
  );
};

export default Floaters;
