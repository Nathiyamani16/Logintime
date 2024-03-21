// Dashboard.js
import React, { useEffect, useState } from 'react';
import firebase from '../component/firebase';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, get the user's role
        setUserRole('user'); // Assume user role by default
        // Check if the user is an admin
        firebase.firestore().collection('admins').doc(user.uid).get().then((doc) => {
          if (doc.exists) {
            setUserRole('admin');
          }
        });
      } else {
        // User is signed out
        setUserRole('');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {userRole === 'admin' && <p>Welcome, Admin!</p>}
      {userRole === 'user' && <p>Welcome, User!</p>}
    </div>
  );
};

export default Dashboard;
