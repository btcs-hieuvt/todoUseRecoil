// import { useEffect } from 'react';
import {Route,Routes}from 'react-router-dom'
import './App.css';
import TodoPage from './page/TodoPage';
import LoginPage from './page/LoginPage';
import NavMenu from './Component/NavMenu';

// import AuthProvider from './Context/AuthProvider';

function App() {
 
  return (
    <div>
        <NavMenu />
        {/* <AuthProvider> */}
          <Routes>
              <Route path="/" element={<TodoPage/>} />
              <Route path="/login" element={<LoginPage/>} />
          </Routes>
        {/* </AuthProvider> */}
       
    </div>

  );
}


export default App;
