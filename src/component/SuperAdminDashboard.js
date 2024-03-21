import React, { useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';

function CreateAdminForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Generate temporary password
      const tempPassword = Math.random().toString(36).slice(-8);

      // Send email using emailjs
      emailjs.send('service_trbwfto', 'template_834ga3h', {
        to_email: email,
        to_name: name,
        role: role,
        temp_password: tempPassword,
      }, 'XnhQpSMkNplwbVNlF')
        .then(() => {
          console.log('Email sent successfully');
          setEmailSent(true);
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
          setError('Failed to send email');
        });

      // Save admin to backend
      const response = await axios.post('http://localhost:8080/createAdmin', { email, name, role, password: tempPassword });
      console.log(response.data);
    } catch (error) {
      setError('Failed to create admin');
    }
  };

  return (
    <div>
      <h1>Create Admin</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button type="submit">Create Admin</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {emailSent && (
          <div style={{ color: 'green' }}>
            Admin created successfully. Check your email for the temporary password.
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateAdminForm;
