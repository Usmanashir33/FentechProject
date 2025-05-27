// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       ikon Allah sai kallo malam
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PreProtectedRoute from './componenetProtecters/PreProtectedRoute';
import ProtectedRoute from './componenetProtecters/ProtectedRoute';
import Dashbord from './components/Dashbord';
import DisplayOverAll from './components/DisplayOverAll';
import Register from './components/Register';
import AuthContextProvider from './customContexts/AuthContext';
import UiContextProvider from './customContexts/UiContext';
import ForgetPassword from './components/SettingsFiles/ForgetPasword';
import LiveContextProvider from './customContexts/LiveContext.jsx';

function App() {
  return (
    <div className="app">
      <UiContextProvider>
        <AuthContextProvider>
          <LiveContextProvider>
            <Router>
              {/* for loading icons */}
              <DisplayOverAll />
              
              <Routes>
                <Route 
                exact path='/'
                element ={
                  <Navigate to = "/dashbord/*" replace/>
                }/>
                  
                {/* For Register route with pre-protection */}
                <Route 
                  path='/register' 
                  element={
                    <PreProtectedRoute>
                      <Register />
                    </PreProtectedRoute>
                  } 
                />
                {/* For forget Password  route with pre-protection */}
                <Route 
                  path='/password-manager/' 
                  element={
                    <PreProtectedRoute>
                      <ForgetPassword />
                    </PreProtectedRoute>
                  } 
                />

                {/* For Dashboard route with protection */}
                <Route 
                  path='/dashbord/*' 
                  element={
                    <ProtectedRoute>
                      <Dashbord />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path='*' 
                  element={
                    <ProtectedRoute>
                      <Dashbord />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
              
              {/* <Footer/> */}
            </Router>
          </LiveContextProvider>
        </AuthContextProvider>
      </UiContextProvider>
    </div>
  );
}

export default App;
