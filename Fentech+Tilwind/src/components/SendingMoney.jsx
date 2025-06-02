import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  ArrowLeft, CheckCircle,HandCoins,  } from "lucide-react";
import { useState } from "react";
// import { useNavigation } from "react-router";
import { useNavigate } from 'react-router-dom';

const SendingMoney = () => {
    const navigate = useNavigate()
    const [showReceipients,setShowReciepient ] = useState(false)
    const [receiver,setReceiver] = useState({})
    const [transMode,setTransMode] = useState('sending')
    const toggleShowrecipients = () => {
        setShowReciepient(!showReceipients)
    }
    const selectReceipient = (parson) => {
        setReceiver(parson)
        toggleShowrecipients()
    }
    return ( 
         <div className=" ">
          {/* Make a Transaction */}
          <div className="bg-white rounded-md shadow-md  px-4 py-2 ">
            <div className="flex justify-between items-center mb-2 border-b">
                <ArrowLeft
                onClick={() => navigate(-1)}
                 className="text-xl mb-4  hover:text-yellow-600 transition-colors duration-200"
                />
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                Make a Transaction
                </h3>
            </div>
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setTransMode('sending')}
               className={`flex-1 ${transMode=== 'sending'? "bg-indigo-600 text-white ":'bg-gray-100 text-gray-800'} py-2 px-4 rounded-lg !rounded-button whitespace-nowrap`}>
                Send
              </button>
              <button
                onClick={() => setTransMode('requesting')}
               className={`flex-1 ${transMode=== 'requesting'? "bg-indigo-600 text-white ":'bg-gray-100 text-gray-800'} py-2 px-4 rounded-lg !rounded-button whitespace-nowrap`}>
                Request 
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  <span className="flex items-center gap-2">
                    {Object.keys(receiver).length > 0   && <CheckCircle className="w-4 h-4 text-green-600" />}
                    <span>Recipient</span>
                  </span>
                </label>
                <div className="relative">
                  <input
                  value={receiver.name}
                    type="text"
                    placeholder="Search by name or username"
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm pr-32 bg-gray-50"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  ></i>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                    {/* <Users2/> */}
                    <button type="button"
                    onClick={toggleShowrecipients}
                     className=" text-blue-400 hover:text-indigo-600 transition-colors duration-200">
                      <i className="fas fa-users"></i>
                    </button>
                  </div>
                </div>

                {/* Recent Recipients */}
                {showReceipients && <div className=" mt-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="p-3 border-b border-gray-100">
                    <span className="flex justify-between ">
                        <h4 className="text-sm font-medium text-gray-700">
                        Recent Recipients
                        </h4>
                        <FontAwesomeIcon icon={faMultiply}
                        onClick={toggleShowrecipients}
                            className="text-xl mb-4 text-gray-700 hover:text-yellow-600 transition-colors duration-200"
                    />
                    </span>
                  </div>
                  <div className="divide-y divide-gray-100  overflow-y-auto h-50">
                    <div
                        onClick={() => {
                            selectReceipient({
                                name:'usman'
                            })
                        }}
                     className="p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                      <div className="flex items-center space-x-3">
                        <img
                          src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20Nigerian%20businessman%20in%20formal%20attire%2C%20high%20quality%20portrait&width=40&height=40&seq=3&orientation=squarish"
                          alt="User"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            Oluwaseun Adebayo
                          </p>
                          <p className="text-xs text-gray-500">@seun_adebayo</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        Last sent: 2 days ago
                      </span>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                      <div className="flex items-center space-x-3">
                        <img
                          src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20Nigerian%20businesswoman%20with%20natural%20hair%20in%20corporate%20attire%2C%20high%20quality%20portrait&width=40&height=40&seq=4&orientation=squarish"
                          alt="User"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            Chioma Okonkwo
                          </p>
                          <p className="text-xs text-gray-500">@chioma_ok</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        Last sent: 5 days ago
                      </span>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                      <div className="flex items-center space-x-3">
                        <img
                          src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle%20aged%20Nigerian%20man%20in%20traditional%20attire%2C%20high%20quality%20portrait&width=40&height=40&seq=5&orientation=squarish"
                          alt="User"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            Babatunde Olatunji
                          </p>
                          <p className="text-xs text-gray-500">@baba_t</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        Last sent: 1 week ago
                      </span>
                    </div>
                  </div>
                </div>}

              </div>
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
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Note (Optional)
                </label>
                <div className="relative">
                  <textarea
                    placeholder="Add a note about this transaction"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50 pr-10"
                  ></textarea>
                  <i className="fas fa-sticky-note absolute right-3 top-3 text-gray-400"></i>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Maximum 100 characters
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 !rounded-button whitespace-nowrap"
              >
                {transMode === 'sending' ?
                    (<div>
                         <i className="fas fa-paper-plane"></i>
                        <span>Send Money</span>
                    </div>)
                :

                (<div className="flex ">
                    < HandCoins/>
                    <span>Request Money</span>
                </div>)
                }
               
              </button>
            </form>
          </div>
        </div>
    );
}
 
export default SendingMoney;