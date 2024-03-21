// // App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginForm from './component/Login';
// import AdminDashboard from './component/AdminDashboard';
// import SuperAdminDashboard from './component/SuperAdminDashboard';
// import ResetPasswordForm from './component/ResetPasswordForm'

// function App() {
//   const [role, setRole] = useState(null);

//   const handleLogin = (role) => {
//     setRole(role);
//   };

//   return (
//     <Router>
//       <div>
//         {role === null && <LoginForm onLogin={handleLogin} />}
//         {role === 'admin' && <AdminDashboard />}
//         {role === 'superAdmin' && <SuperAdminDashboard />}
//       </div>
//       <Routes>
//       <Route path="/reset-password" component={ResetPasswordForm} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './component/Login';
import AdminDashboard from './component/AdminDashboard';
import SuperAdminDashboard from './component/SuperAdminDashboard';
import ResetPasswordForm from './component/ResetPasswordForm';

function App() {
  const [role, setRole] = useState(null);

  const handleLogin = (role) => {
    setRole(role);
  };

  return (
    <Router>
      <div>
        {role === null && <LoginForm onLogin={handleLogin} />}
        {role === 'admin' && <AdminDashboard />}
        {role === 'superAdmin' && <SuperAdminDashboard />}
      </div>
      <Routes>
        <Route path="/reset-password" element={<ResetPasswordForm />} />
      </Routes>
    </Router>
  );
}

export default App;

