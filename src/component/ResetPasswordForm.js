import React, { useState } from 'react';
import axios from 'axios';

function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send request to backend to reset password
      const response = await axios.post('http://localhost:8080/resetPassword', { email, newPassword });
      console.log(response.data);
      setResetSuccess(true);
    } catch (error) {
      setError('Failed to reset password');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit">Reset Password</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {resetSuccess && <div style={{ color: 'green' }}>Password reset successful. You can now login with your new password.</div>}
      </form>
    </div>
  );
}

export default ResetPasswordForm;
