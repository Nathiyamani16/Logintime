import React, { useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';

const defaultDepartments = [
  'HR Team',
  'Team Lead',
  'Development Team',
  'Testing Team',
  // Add more departments here
];

function AdminDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDepartmentSubmit = async (e) => {
    e.preventDefault();
    if (!departmentName && !selectedDepartment) return;

    const newDepartment = {
      name: selectedDepartment || departmentName,
      employees: [],
    };

    try {
      const response = await axios.post('http://localhost:5000/departments', { department: newDepartment.name });
      newDepartment._id = response.data._id;
      setDepartments([...departments, newDepartment]);
      setSelectedDepartment('');
      setDepartmentName('');
    } catch (error) {
      console.error('Error creating department:', error);
    }
  };
  const handleEmployeeSubmit = async (e, departmentId) => {
    e.preventDefault();
    if (!employeeName || !employeeEmail) return;
  
    try {
      // Generate a temporary password
      const temporaryPassword = generateTemporaryPassword();
  
      // Send the temporary password along with other data to the backend
      const response = await axios.post(`http://localhost:5000/departments/${departmentId}/employees`, { name: employeeName, email: employeeEmail, password: temporaryPassword });
  

         // Send email using EmailJS
    const templateParams = {
      to_email: employeeEmail,
      temporary_password: temporaryPassword,
    };
    await emailjs.send('service_ln3eh22', 'template_yz1cpwm', templateParams, 'XnhQpSMkNplwbVNlF');
      // Display a success message
      setMessage(`Employee added successfully`);
      setEmployeeName('');
      setEmployeeEmail('');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };
  
  const generateTemporaryPassword = () => {
    const length = 8;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };
  

  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      <form onSubmit={handleDepartmentSubmit}>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          {defaultDepartments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
          <option value="other">Other</option>
        </select>
        {selectedDepartment === 'other' && (
          <input
            type="text"
            placeholder="Enter department name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
        )}
        <button type="submit">Create Department</button>
      </form>
      {message && <p>{message}</p>}
      {departments.map((department, index) => (
        <div key={index}>
          <h2>{department.name}</h2>
          <form onSubmit={(e) => handleEmployeeSubmit(e, department._id)}>
            <input
              type="text"
              placeholder="Enter employee name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter employee email"
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
            />
            <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Employee'}</button>
          </form>
          <ul>
            {department.employees.map((employee, index) => (
              <li key={index}>{`${employee.name} - ${employee.email}`}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
