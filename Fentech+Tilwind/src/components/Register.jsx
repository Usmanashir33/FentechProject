import React, { useState } from "react";
import useRegister from "../customHooks/registerHooks";
const Register = () => {
  const [registerRedirectUrl,setRegisterRedirectUrl] = useState('') 
  const [logindetails,setLoginDetails] = useState({
    username_field:'',
    password:'',
    otp:''
  })
  const [registerDetails,setRegisterDetails] = useState({
    email:'',
    phone_number :'',
    firstName:'',
    lastName:'',
    password:"",
    password2:'',
    refarrel_code :'',
    otp:"",
  })
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationSentReg, setVerificationSentReg] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // custom hooks config 
  const {login,register,completeRegisterAccount} = useRegister(setVerificationSent,setVerificationSentReg,setRegisterRedirectUrl);
  const handleLogin = () => {
    if (logindetails.username_field && logindetails.password.length >= 8) {
      login(logindetails,'/authuser/loginRequest/')
    }
  }
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
      const params = {
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        redirect_uri: `${window.location.origin}/auth/google/callback`,
        response_type: "code",
        scope: "email profile",
        access_type: "offline",
        prompt: "consent",
      };
      const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
      const authUrl = `${googleAuthUrl}?${queryString}`;
      window.location.href = authUrl;
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleShowForm = (tab) => {
    setActiveTab(tab);
    setShowForm(true);
  };
  return (
    <div
      className="min-h-screen w-full flex flex-col bg-blue-600 pb-12 relative "
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20fintech%20abstract%20background%20with%20soft%20blue%20gradient%20and%20subtle%20geometric%20patterns%2C%20financial%20technology%20concept%20with%20flowing%20digital%20elements%2C%20clean%20professional%20design%20with%20light%20particle%20effects&width=1440&height=1024&seq=1&orientation=landscape')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <header className=" sticky z-40 top-0 w-full px-8 py-2  mb-4 flex justify-between items-center bg-blue-900 bg-opacity-90  backdrop-blur-md">
        <div className="flex items-center">
          <i className="fas fa-shield-alt text-white text-3xl mr-3"></i>
          <h1 className="text-2xl font-bold text-white">FineTech</h1>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => handleShowForm("login")}
            className="  bg-white text-blue-600 bg-opacity-20 hover:bg-blue-400 hover:text-white  px-6 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap !rounded-button"
          >
            Login
          </button>
          <button
            onClick={() => handleShowForm("register")}
            className="bg-blue-400  hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap !rounded-button"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center ">
        {!showForm ? (
          <div className="text-center text-white max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">
              Secure Your Financial Future
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Access your digital wallet with confidence. Industry-leading
              security for your peace of mind.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleShowForm("login")}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap !rounded-button"
              >
                Get Started
              </button>
              <button className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap !rounded-button">
                Learn More
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md mx-auto">
            <div className="bg-blue-900 bg-opacity-60 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-black/20 pointer-events-none"></div>
                <div className="relative">
                  {/* Form Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white bg-opacity-60 backdrop-blur-md mb-4">
                      <i className="fas fa-shield-alt text-blue-600 text-2xl"></i>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-1">
                      Welcome to FineTech
                    </h1>
                    <p className="text-blue-100">
                      Secure access to your wallet
                    </p>
                  </div>
                  {/* Tab Switcher */}
                  <div className="flex mb-3 gap-5 border  bg-opacity-10 rounded-lg p-1">
                    <button
                      onClick={() => setActiveTab("login")}
                      className={` hover:bg-blue-600  hover:text-white flex-1 py-2 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap !rounded-button ${activeTab === "login" ? "bg-white text-blue-600" : "text-white"}`}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setActiveTab("register")}
                      className={`flex-1 py-2 hover:bg-blue-600 hover:text-white  rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap !rounded-button ${activeTab === "register" ? "bg-white text-blue-600" : "text-white"}`}
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Login Form */}
                  {activeTab === "login" && (
                    <div className="space-y-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i className="fas fa-envelope text-blue-400"></i>
                        </div>
                        <input
                        disabled={verificationSent}
                        value={logindetails.username_field}
                        onChange={(e) => {
                          setLoginDetails((prev) => ({
                             ...prev,
                             username_field: e.target.value
                           }));
                          }}
                          type="text"
                          className="w-full  bg-opacity-20 border-none text-blue-900 placeholder-blue-00 pl-10 pr-2 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm font-medium"
                          placeholder="Email or Username or phone number "
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i className="fas fa-lock text-blue-400"></i>
                        </div>
                        <input
                        disabled={verificationSent}
                        value={logindetails.password}
                        onChange={(e) => setLoginDetails((prev) => ({
                          ...prev,password:e.target.value
                        }))}
                        maxLength={'15'}
                        minLength={'8'}
                          type={showPassword ? "text" : "password"}
                          className="w-full  bg-opacity-20 border-none text-blue-900 placeholder-blue-00 pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm font-medium"

                          placeholder="Password"
                        />
                        <div
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i
                            className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-blue-400`}
                          ></i>
                        </div>
                      </div>
                      {verificationSent && (
                        <div className="space-y-2">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <i className="fas fa-key text-blue-400"></i>
                            </div>
                            <input
                             value={logindetails.otp}
                              onChange={(e) => setLoginDetails((prev) => ({
                                ...prev,otp:e.target.value
                              }))}
                              maxLength={'15'}
                              minLength={'8'}
                              type="text"
                              className="w-full bg-white bg-opacity-25 border-none font-medium pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                              placeholder="Enter Email Verification Code Sent"
                            />
                          </div>
                          <p className="text-xs text-blue-100">
                            Verification code has been sent to your email.
                          </p>
                        </div>
                      )}
                      <div className="text-right">
                        <button
                          onClick={() => setShowForgotPassword(true)}
                          className="text-sm text-blue-100 hover:text-white transition-colors"
                        >
                          Forgot Password?
                        </button>
                      </div>

                      {showForgotPassword && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                          <div className="bg-white rounded-lg p-6 w-96 relative">
                            <button
                              onClick={() => setShowForgotPassword(false)}
                              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                              Reset Password
                            </h3>
                            <p className="text-gray-600 mb-4">
                              Enter your registered email address and we'll send you a link
                              to reset your password. Check your spam folder if you did not receive the link 
                            </p>
                            <div className="relative mb-4">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-envelope text-gray-400"></i>
                              </div>
                              <input
                                type="email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Enter your email"
                              />
                            </div>
                            <button
                              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors !rounded-button"
                              onClick={() => {
                                alert(
                                  "Password reset link sent to your email!",
                                );
                                setShowForgotPassword(false);
                              }}
                            >
                              Send Reset Link
                            </button>
                          </div>
                        </div>
                      )}
                      <button 
                      onClick={handleLogin}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors cursor-pointer whitespace-nowrap !rounded-button">
                        Login
                      </button>
                      <div className="relative flex items-center justify-center my-6">
                        <div className="border-t border-blue-200 border-opacity-30 absolute w-full"></div>
                        <span className="bg-blue-500 bg-opacity-50 text-blue-100 text-xs px-3 relative rounded-lg">
                          Or continue with
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          id="googleLoginBtn"
                          onClick={handleGoogleLogin}
                          className="flex items-center justify-center bg-gray-900 bg-opacity-40 border backdrop-blur-md hover:bg-opacity-20 text-white py-2 px-4 rounded-lg transition-all cursor-pointer whitespace-nowrap !rounded-button"
                        >
                          <i className="fab fa-google mr-2"></i>
                          Google
                        </button>
                        <button className="flex items-center justify-center  border bg-opacity-10 hover:bg-opacity-20 text-white py-2 px-4 rounded-lg transition-all cursor-pointer whitespace-nowrap !rounded-button">
                          <i className="fab fa-apple mr-2"></i>
                          Apple
                        </button>
                      </div>
                    </div>
                  )}
                  {/* Register Form */}
                  {activeTab === "register" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-user text-blue-400"></i>
                          </div>
                          <input
                          value={registerDetails.firstName}
                          disabled={verificationSentReg}
                          onChange={(e) => {setRegisterDetails((prev) => ({
                            ...prev,firstName:e.target.value
                          }))}}
                            type="text"
                          className="w-full border-none pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm font-medium"

                            placeholder="First Name"
                          />
                        </div>
                        <div className="relative">
                          <div 
                          
                          className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                          >
                            <i className="fas fa-user text-blue-400"></i>
                          </div>
                          <input
                          value={registerDetails.lastName}
                          disabled={verificationSentReg}
                          onChange={(e) => {setRegisterDetails((prev) => ({
                            ...prev,lastName:e.target.value
                          }))}}
                            type="text"
                            className="w-full font-medium  bg-opacity-25 border-none  pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i className="fas fa-phone text-blue-400"></i>
                        </div>
                        <input
                        value={registerDetails.phone_number}
                        disabled={verificationSentReg}
                          onChange={(e) => {setRegisterDetails((prev) => ({
                            ...prev,phone_number:e.target.value
                          }))}}
                          type="tel"
                          className="w-full font-medium bg-opacity-25 border-none font-medium pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                          placeholder="Phone Number"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i className="fas fa-envelope text-blue-400"></i>
                        </div>
                        <input
                        value={registerDetails.email}
                        disabled={verificationSentReg}
                          onChange={(e) => {setRegisterDetails((prev) => ({
                            ...prev,email:e.target.value
                          }))}}
                          type="email"
                          className="w-full bg-white bg-opacity-25 border-none font-medium pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                          placeholder="Email Address"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i className="fas fa-user-circle text-blue-400"></i>
                        </div>
                        <input
                        value={registerDetails.username}
                        disabled={verificationSentReg}
                          onChange={(e) => {setRegisterDetails((prev) => ({
                            ...prev,username:e.target.value
                          }))}}
                          type="text"
                          className="w-full bg-white bg-opacity-25 border-none font-medium pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                          placeholder="Username"
                        />
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i className="fas fa-lock text-blue-400"></i>
                        </div>
                        <input
                        value={registerDetails.password}
                        disabled={verificationSentReg}
                          onChange={(e) => {setRegisterDetails((prev) => ({
                            ...prev,password:e.target.value
                          }))}}
                          type={showPassword ? "text" : "password"}
                          className="w-full font-medium  bg-opacity-10 border-none  pl-10 pr-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                          placeholder="Password"
                        />
                        <div
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i
                            className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-blue-400`}
                          ></i>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <i className="fas fa-lock text-blue-400"></i>
                        </div>
                        <input
                        value={registerDetails.password2}
                        disabled={verificationSentReg}
                          onChange={(e) => {setRegisterDetails((prev) => ({
                            ...prev,password2:e.target.value
                          }))}}
                          type={showConfirmPassword ? "text" : "password"}
                          className="w-full font-medium bg-opacity-10 border-noneplaceholder-blue-200 pl-10 pr-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                          placeholder="Confirm Password"
                        />
                        <div
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          <i
                            className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} text-blue-400`}
                          ></i>
                        </div>
                      </div>
                        {verificationSentReg && (
                        <div className="space-y-2">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <i className="fas fa-key text-blue-400"></i>
                            </div>
                            <input
                              value={registerDetails.otp} 
                              onChange={(e) => {setRegisterDetails((prev) => ({
                                ...prev,otp:e.target.value
                              }))}}
                              type="text"
                              className="w-full bg-white bg-opacity-25 border-none font-medium pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                              placeholder="Enter Email Verification Code"
                            />
                          </div>
                          <p className="text-xs text-blue-100">
                            Verification code has been sent to your email.
                          </p>
                        </div>
                      )}

                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="terms"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor="terms"
                            className="ml-2 text-sm text-blue-100"
                          >
                            I accept the{" "}
                            <a
                              href="#"
                              className="text-blue-300 hover:text-white"
                            >
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                              href="#"
                              className="text-blue-300 hover:text-white"
                            >
                              Privacy Policy
                            </a>
                          </label>
                        </div>
                        {!registerRedirectUrl && <button
                          id="signUpButton"
                          onClick={async () => {
                            if (!acceptedTerms) return;

                            setIsLoading(true);
                            const firstName = (
                              document.querySelector(
                                'input[placeholder="First Name"]',
                              ) 
                            )?.value;
                            const lastName = (
                              document.querySelector(
                                'input[placeholder="Last Name"]',
                              )
                            )?.value;
                            const phone = (
                              document.querySelector(
                                'input[placeholder="Phone Number"]',
                              )
                            )?.value;
                            const email = (
                              document.querySelector(
                                'input[placeholder="Email Address"]',
                              ) 
                            )?.value;
                            const username = (
                              document.querySelector(
                                'input[placeholder="Username"]',
                              )
                            )?.value;
                            const password = (
                              document.querySelector(
                                'input[placeholder="Password"]',
                              ) 
                            )?.value;
                            const confirmPassword = (
                              document.querySelector(
                                'input[placeholder="Confirm Password"]',
                              ) 
                            )?.value;

                            // Validation
                            const errors = [];
                            if (!firstName)
                              errors.push("First Name is required");
                            if (!lastName) errors.push("Last Name is required");
                            if (!phone) errors.push("Phone Number is required");
                            if (!email)
                              errors.push("Email Address is required");
                            if (!username) errors.push("Username is required");
                            if (!password) errors.push("Password is required");
                            if (password !== confirmPassword)
                              errors.push("Passwords do not match");
                            if (password && password.length < 8)
                              errors.push(
                                "Password must be at least 8 characters",
                              );
                            if (
                              email &&
                              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                            )
                              errors.push("Invalid email format");

                            if (errors.length > 0) {
                              const errorMessage = errors.join("\n");
                              const errorDiv = document.createElement("div");
                              errorDiv.className =
                                "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
                              errorDiv.textContent = errorMessage;
                              document.body.appendChild(errorDiv);
                              setTimeout(() => errorDiv.remove(), 2000);
                              setIsLoading(false);
                              return;
                            }

                            try {
                              // Simulate API call
                              // register 
                              register(registerDetails);
                            } catch (error) {
                              console.error("Registration error:", error);
                            } finally {
                              setIsLoading(false);
                            }
                          }}
                          className={`w-full ${acceptedTerms ? "bg-blue-500 border hover:bg-blue-600" : "bg-blue-900 cursor-not-allowed"} text-white font-medium py-3 px-4 rounded-lg transition-colors whitespace-nowrap !rounded-button relative`}
                          disabled={!acceptedTerms || isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center ">
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                              Processing...
                            </div>
                          ) : (
                            "Sign Up"
                          )}
                        </button>}

                        {registerRedirectUrl && <button
                          id="signUpButton"
                          onClick={() => {completeRegisterAccount(registerDetails,registerRedirectUrl),console.log(registerRedirectUrl);}}
                          className={`bbd w-full ${acceptedTerms ? "bg-blue-500 border hover:bg-blue-600" : "bg-blue-900 cursor-not-allowed"} text-white font-medium py-3 px-4 rounded-lg transition-colors whitespace-nowrap !rounded-button relative`}
                          disabled={!acceptedTerms || isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center ">
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                              Processing...
                            </div>
                          ) : (
                            "Complete Registration"
                          )}
                        </button>}
                      </div>
                    </div>
                  )}
                  {/* Footer */}
                  <div className="mt-8 text-center">
                    <div className="flex items-center justify-center mb-2 text-xs text-blue-100">
                      <i className="fas fa-shield-alt mr-1"></i>
                      <span>Protected by 256-bit encryption</span>
                    </div>
                    <div className="text-xs text-blue-200">
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Privacy Policy
                      </a>
                      <span className="mx-1">•</span>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        Terms of Service
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
export default Register;
