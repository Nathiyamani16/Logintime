// import React, { useState } from 'react';
// import axios from 'axios';

// function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     console.log(email, password);
    


//     try {
//       const response = await axios.post('http://localhost:8080/login', { email, password });
//       const { role } = response.data;
//       console.log('Role:', role);
//       if (role === 'admin') {
//         window.location.href = '/admin';
//       } else if (role === 'employee') {
//         window.location.href = '/employee';
//       } else if (role === 'superAdmin') {
//         window.location.href = '/superadmin';
//       } else {
//         setError('Invalid role');
//       }
//     } catch (error) {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleLogin}>Login</button>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//     </div>
//   );
// }

// export default LoginForm;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:8080/login', { email, password });
//       const { role } = response.data;
//       console.log('Role:', role);
//       if (role === 'admin') {
//         navigate('/admin');
//       } else if (role === 'employee') {
//         navigate('/employee');
//       } else if (role === 'superAdmin') {
//         navigate('/superadmin');
//       } else {
//         setError('Invalid role');
//       }
//     } catch (error) {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleLogin}>Login</button>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//     </div>
//   );
// }

// export default LoginForm;
// LoginForm.js

// this is perfect login
import React, { useState } from 'react';
import axios from 'axios';
import '../css/login.css'; // Import your CSS file

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      console.log(email, password);
      const { role } = response.data;
      console.log(role)
      if (role === 'admin' || role === 'employee' || role === 'superAdmin') {
        onLogin(role); // Call onLogin function from props
      } else {
        setError('Invalid role');
      }
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="image-container"></div>
      <div className="login-card">
        <h1>Login</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br/>
        <button onClick={handleLogin}>Login</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
}

export default LoginForm;

