import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PreProtectedRoute from './componenetProtecters/PreProtectedRoute';
import ProtectedRoute from './componenetProtecters/ProtectedRoute';
import MainDashbord from './components/MainDashbord';
import Guides from './components/GuidesPage';
import Register from './components/Register';
import UiContextProvider from './customContexts/UiContext';
import AuthContextProvider from './customContexts/AuthContext';
import LiveContextProvider from './customContexts/LiveContext.jsx';
import Floaters from './components/Floaters.jsx';

function App() {
  
  return (
    <div className="relative ">
      <UiContextProvider>
        <AuthContextProvider>
          <LiveContextProvider>
            <Router>
              {/* for loading icons */}
              <Floaters/>
              
              <Routes>
                <Route 
                exact path='/'
                element ={
                  <Navigate to = "/dashbord/" replace/>
                }/>
                  
                {/* For Dashboard route with protection */}
                <Route 
                  path='/dashbord/*' 
                  element={
                    <ProtectedRoute>
                      <MainDashbord />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path='/site-guides/' 
                  element={
                      <Guides />
                  } 
                />
                <Route 
                  path='/auth/' 
                  element={
                    <PreProtectedRoute>
                      <Register />
                     </PreProtectedRoute> 
                  } 
                />
                <Route 
                  path='*' 
                  element={
                    <ProtectedRoute>
                      <MainDashbord/>
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
