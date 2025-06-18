import { useContext, useEffect, useState } from "react";
import useRequest from "../customHooks/RequestHook";
import { authContext } from "../customContexts/AuthContext";
import { uiContext } from "../customContexts/UiContext";
import Pins from "./PinsPage";

const PinPasswordManger = ({mode='Change',name='PIN',closeModal,grabSuccess=() => {}}) => {
    const NAME = name;
    const [emailConfirmed,setEmailConfirmed] = useState(false);
    const [showPins,setShowPins] = useState(false);
    const [redirectUrl,setRedirectUrl] = useState('');
    const {currentUser} = useContext(authContext);
    const {setSuccess} = useContext(uiContext);
    const {sendArbitRequest} = useRequest();
    const [pinError, setPinError] = useState("");

    const [otp,setOtp] = useState({
      otp1:'',otp2:'',otp3:'',otp4:'',otp5:'',
    })
    const [pinForm, setPinForm] = useState({
        currentCodes: "",
        redirect_to: name ==='PIN'? "pin-change" : 'password-change',
        email:'',
        mode: mode.toLowerCase(),
        codes1: "",
        codes2: "",
        verificationCode: "",
        payment_pin: "",
      });
      const handleAddOtp = (e) => {
        const {name,value} = e.target
          setOtp((prev) => ({
            ...prev,
            [name]:value
          }))
      }
      const handlePinChange = (e) => {
        let maxNumber = NAME === 'PIN'? 4 : 25
        const { name, value } = e.target;
        // Only allow numbers and limit to 4 digits
        // if (value.length <= maxNumber && /^\d*$/.test(value)) {
        if (value.length <= maxNumber) {
          setPinForm((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
      };
      const checkOtpSent = (data) => {
        const {success,redirect_to} = data
        if (success){
          if(!redirect_to){ // if no redirect url is provided, we set it to pin-change
            closeModal(false);
            setPinForm({})
            setSuccess(success);
            grabSuccess(success);
            return;
          }
          setEmailConfirmed(true);
          setRedirectUrl(redirect_to); 
          setShowPins(false);
        }

      }
      const handlePinsAction = (pins) => {
        pinForm.payment_pin = pins;
        sendArbitRequest(`/authuser/${name=='PIN' ? 'pin-change' : 'password-change'}/`,
          'POST',pinForm,checkOtpSent,true)
        }
        useEffect(() => { // delete pins on close 
            pinForm.payment_pin = '';
        },[showPins])
      const handlePinSubmit = (e) => {
        e?.target ? e.preventDefault() : null
        setPinError("");
        if (!pinForm.codes1 || !pinForm.codes2 ) {
          setPinError("All fields are required");
          return;
        }
        if (!pinForm.currentCodes && mode.toLowerCase() === 'change') {
          setPinError("current Pin is required");
          return;
        }

        if ( pinForm.codes1 !== pinForm.codes2){
          setPinError("New Pins must be thesame");
          return;
        }
        if (pinForm.codes1.length < 4) {
          setPinError(`${name} must be 4+ digits`);
          return;
        }
        pinForm.email = currentUser?.email 
        
        setPinError("");
        // Here you would typically make an API call to update the PIN
        if (emailConfirmed){ // we olredy obtain the otp
            if (!pinForm.verificationCode.length == 5 ) {
              setPinError("OTP is  required");
              return;
            }
            // set otp 
            pinForm.verificationCode = Object.values(otp).join('')
            sendArbitRequest(`${redirectUrl}`,'POST',pinForm,checkOtpSent,true)
            return 
        }
        // if mode is change we just call the change pin endpoint
        if (mode.toLowerCase() === 'change') {
          pinForm.verificationCode = Object.values(otp).join('')
          if(!pinForm.payment_pin && name !=='PIN'){
            // set payment pin here 
            setShowPins(true);
            return 
          }
          sendArbitRequest(`/authuser/${name=='PIN' ? 'pin-change' : 'password-change'}/`,
            'POST',pinForm,checkOtpSent,true)
          return
        }
        sendArbitRequest('/authuser/email-verif-code/','POST',pinForm,checkOtpSent,true)
      };
    return ( 
        <div className="fixed h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className=" bg-white  rounded-xl p-4 w-full max-w-md mx-4 transform transition-all max-h-max  overflow-y-aut">
                  <div className=" flex justify-between items-center mb-4 ">
                    <h3 className="text-xl font-semibold text-gray-800">
                     {mode} {name}
                    </h3>
                    <button
                      onClick={() => {
                        closeModal(false);
                        setPinForm({
                          currentCodes: "",
                          codes1: "",
                          confirmPin: "",
                        });
                        setPinError("");
                      }}
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  {/* manger form  */}

                  <form onSubmit={handlePinSubmit} className="">
                    { mode.toLowerCase() === 'change' && <div className=" mb-2 ">
                      <label
                        htmlFor="currentCodes"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Current {name}
                      </label>
                      <input
                        id="currentCodes"
                        type="password"
                        name="currentCodes"
                        value={pinForm.currentCodes}
                        onChange={handlePinChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder={`Enter current ${name}`}
                      />
                    </div>}

                    <div className=" mb-2">
                      <label
                        htmlFor="codes1"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                         New {name}
                      </label>
                      <input
                        id="codes1"
                        disabled ={emailConfirmed}
                        type="password"
                        name="codes1"
                        value={pinForm.codes1}
                        onChange={handlePinChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder={`Enter new ${name}`}
                      />
                    </div>

                    <div className=" mb-2">
                      <label
                        htmlFor="codes1"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Confirm New {name} 
                      </label>
                      <input
                        id="newPin2"
                        disabled ={emailConfirmed}
                        type="password"
                        name="codes2"
                        value={pinForm.codes2}
                        onChange={handlePinChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder={`Enter new ${name} again `}
                      />
                    </div>

                    {emailConfirmed &&  <div className="">
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center text-blue-700">
                          <i className="fas fa-info-circle mr-2"></i>
                          <p className="text-sm">
                            A verification code has been sent to your email
                            address ({`${pinForm?.email}`})
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
                            name={`otp${index}`}
                            value={otp[`otp${index}`]}
                            maxLength={1}
                            className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                            onKeyUp={(e) => {
                              if (e.key !== "Backspace" && index < 5) {
                                handleAddOtp(e)
                                const next = e.target.nextElementSibling;
                                if (next && e.target.value) next.focus();
                              }
                              if (e.key === "Backspace" && index > 1) {
                                handleAddOtp(e)
                                const prev = e.target.previousElementSibling;
                                if (prev) prev.focus();
                              }
                            }}
                            onChange={(e) => {
                              handleAddOtp(e)
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
                    </div>}

                    {pinError && (
                      <div className="text-red-500 text-sm">{pinError}</div>
                    )}

                    <div className="flex gap-3 mt-6 justify-center">
                      <button
                        type="submit"
                        className="flex-1 px-2 py-2 bg-indigo-600 max-w-xs text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 !rounded-button whitespace-nowrap cursor-pointer"
                      >
                        {emailConfirmed ? `${mode} ${name}` : `Request for ${mode}`}
                      </button>
                    </div>
                  </form>
          </div>
                  { showPins && 
                    <Pins close={setShowPins} triggerFunc={handlePinsAction}/>
                  }
          
        </div>
    );
}
 
export default PinPasswordManger;