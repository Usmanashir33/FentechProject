import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import PreProtectedRoute from './componenetProtecters/PreProtectedRoute';
// import ProtectedRoute from './componenetProtecters/ProtectedRoute';
import MainDashbord from './components/MainDashbord';
import Guides from './components/GuidesPage';
import Register from './components/Register';
import WithdrawalRequests from './components/WithdrawalRequets';
// import DisplayOverAll from './components/DisplayOverAll';
// import Register from './components/Register';
// import AuthContextProvider from './customContexts/AuthContext';
// import UiContextProvider from './customContexts/UiContext';
// import ForgetPassword from './components/SettingsFiles/ForgetPasword';
// import LiveContextProvider from './customContexts/LiveContext.jsx';

function App() {
  return (
    <div className="">
      {/* <UiContextProvider> */}
        {/* <AuthContextProvider> */}
          {/* <LiveContextProvider> */}
            <Router>
              {/* for loading icons */}
              {/* <DisplayOverAll /> */}
              
              <Routes>
                <Route 
                exact path='/'
                element ={
                  <Navigate to = "/dashbord/" replace/>
                }/>
                  
                {/* For Register route with pre-protection */}
                {/* <Route 
                  path='/register' 
                  element={
                    <PreProtectedRoute>
                      <Register />
                    </PreProtectedRoute>
                  } 
                /> */}
                
                {/* For forget Password  route with pre-protection */}
                {/* <Route 
                  path='/password-manager/' 
                  element={
                    <PreProtectedRoute>
                      <ForgetPassword />
                    </PreProtectedRoute>
                  } 
                /> */}

                {/* For Dashboard route with protection */}
                <Route 
                  path='/dashbord/*' 
                  element={
                    // <ProtectedRoute>
                      <MainDashbord />
                    // {/* </ProtectedRoute> */}
                  } 
                />
                <Route 
                  path='/site-guides/' 
                  element={
                    // <ProtectedRoute>
                      <Guides />
                    // {/* </ProtectedRoute> */}
                  } 
                />
                
                <Route 
                  path='/auth/' 
                  element={
                    // <ProtectedRoute>
                      <Register />
                    // {/* </ProtectedRoute> */}
                  } 
                />
                <Route 
                  path='*' 
                  element={
                    // <ProtectedRoute>
                    // </ProtectedRoute>
                      <MainDashbord />
                  } 
                />
              </Routes>
              
              {/* <Footer/> */}
            </Router>
          {/* </LiveContextProvider> */}
        {/* </AuthContextProvider> */}
      {/* </UiContextProvider> */}
    </div>
  );
}

export default App;
