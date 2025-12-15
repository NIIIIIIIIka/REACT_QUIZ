// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import Admin from './Admin';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Admin />
//     </BrowserRouter>
//   );
// };

// export default App;

import React, { useState ,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Admin from './Admin';

const App = () => {
   
  const [isLogin, setIsLogin] = useState(() => localStorage.getItem('isLogin') === 'true');

    useEffect(() => {
   
    if (isLogin) {
      localStorage.setItem('isLogin', 'true');
    } else {
      localStorage.removeItem('isLogin');
    }
  }, [isLogin]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={() => setIsLogin(true)} />}
        />
        <Route
          path="/admin"
          element={
            isLogin ? <Admin /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};
export default App;