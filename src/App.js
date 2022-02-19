import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import Books from './pages/Books';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Register from './pages/Register';
import Users from './pages/admin/Users';
import OneBook from './pages/OneBook';
import Login from './pages/Login';
import Navbar from './Components/Navbar';
import RequestedBooks from './pages/RequestedBooks';
import RequireAuth from './Components/RequireAuth';
import ViewRequests from './pages/admin/ViewRequests';
import RegisterUser from './pages/Register';
import Profile from './pages/Profile';
import ViewIssuedBooks from './pages/admin/ViewIssuedBooks';
import Register_admin from './pages/admin/Register_admin'
import AddBook from './pages/admin/AddBook'

import AdminAuth from './Components/AdminAuth'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books/:id" element={<OneBook />} />

        {/* {authed routes} */}
        <Route path="/requestedbooks" element={<RequireAuth><RequestedBooks /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />

        {/* admin routes */}
        <Route path="/adminregister" element={<Register_admin />} />
        <Route path="/issuedbooks" element={<AdminAuth><ViewIssuedBooks /></AdminAuth>} />
        <Route path="/viewrequests" element={<AdminAuth><ViewRequests /></AdminAuth>} />
        <Route path="/users" element={<AdminAuth><Users /></AdminAuth>} />
        <Route path="/addbooks" element={<AdminAuth><AddBook /></AdminAuth>} />

      </Routes >
    </Router>
  );
}

export default App;
