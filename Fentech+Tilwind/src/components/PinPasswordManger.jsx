import { useState } from "react";

const PinPasswordManger = ({mode='Change',name='PIN',closeModal}) => {
    const [showPinModal, setShowPinModal] = useState(false);

    const [pinForm, setPinForm] = useState({
        currentPin: "",
        newPin: "",
        verificationCode: ["", "", "", "", ""],
      });
      const [pinError, setPinError] = useState("");
      const handlePinChange = (e) => {
        const { name, value } = e.target;
        // Only allow numbers and limit to 4 digits
        if (value.length <= 4 && /^\d*$/.test(value)) {
          setPinForm((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
      };
      const handlePinSubmit = (e) => {
        e.preventDefault();
        setPinError("");
        if (
          !pinForm.currentPin ||
          !pinForm.newPin ||
          pinForm.verificationCode.some((code) => !code)
        ) {
          setPinError("All fields are required");
          return;
        }
        if (pinForm.newPin.length !== 4) {
          setPinError(`${name} must be 4+ digits`);
          return;
        }
        // Here you would typically make an API call to update the PIN
        // For demo purposes, we'll just show a success message
        setPinError("");
        setShowPinModal(false);
        setPinForm({
          currentPin: "",
          newPin: "",
          verificationCode: ["", "", "", "", ""],
        });
      };
    return ( 
        <div className="fixed h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className=" bg-white  rounded-xl p-4 w-full max-w-md mx-4 transform transition-all max-h-max  overflow-y-aut">
                  <div className=" flex justify-between items-center mb-4 ">
                    <h3 className="text-xl font-semibold text-gray-800">
                     {mode} {name}
                    </h3>
                    <button
                      onClick={() => {
                        closeModal(false);
                        setPinForm({
                          currentPin: "",
                          newPin: "",
                          confirmPin: "",
                        });
                        setPinError("");
                      }}
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <form onSubmit={handlePinSubmit} className="">
                    <div className=" mb-2">
                      <label
                        htmlFor="currentPin"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Current {name}
                      </label>
                      <input
                        id="currentPin"
                        type="password"
                        name="currentPin"
                        value={pinForm.currentPin}
                        onChange={handlePinChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder={`Enter current ${name}`}
                      />
                    </div>
                    <div className=" mb-2">
                      <label
                        htmlFor="newPin"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                         New {name}
                      </label>
                      <input
                        id="newPin"
                        type="password"
                        name="newPin"
                        value={pinForm.newPin}
                        onChange={handlePinChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder={`Enter new ${name}`}
                      />
                    </div>
                    <div className=" mb-2">
                      <label
                        htmlFor="newPin"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Confirm New {name}
                      </label>
                      <input
                        id="newPin2"
                        type="password"
                        name="newPin"
                        value={pinForm.newPin}
                        onChange={handlePinChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder={`Enter new ${name}`}
                      />
                    </div>
                    <div>
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center text-blue-700">
                          <i className="fas fa-info-circle mr-2"></i>
                          <p className="text-sm">
                            A verification code has been sent to your email
                            address (j***n@gmail.com)
                          </p>
                        </div>
                      </div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Verification Code
                      </label>
                      <div className="flex justify-between gap-2">
                        {[1, 2, 3, 4, 5].map((index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                            onKeyUp={(e) => {
                              if (e.key !== "Backspace" && index < 5) {
                                const next = e.target.nextElementSibling;
                                if (next && e.target.value) next.focus();
                              }
                              if (e.key === "Backspace" && index > 1) {
                                const prev = e.target.previousElementSibling;
                                if (prev) prev.focus();
                              }
                            }}
                            onChange={(e) => {
                              if (e.target.value.length > 1) {
                                e.target.value = e.target.value.slice(0, 1);
                              }
                              if (!/^\d*$/.test(e.target.value)) {
                                e.target.value = "";
                              }
                            }}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Enter the verification code sent to your email
                      </p>
                    </div>
                    {pinError && (
                      <div className="text-red-500 text-sm">{pinError}</div>
                    )}
                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          closeModal(false);
                          setPinForm({
                            currentPin: "",
                            newPin: "",
                            confirmPin: "",
                          });
                          setPinError("");
                        }}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer"
                      >
                        {mode} {name}
                      </button>
                    </div>
                  </form>
          </div>
        </div>
    );
}
 
export default PinPasswordManger;