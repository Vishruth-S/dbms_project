import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import Books from './pages/Books';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Register from './pages/Register';
import Users from './Components/Users';
import OneBook from './pages/OneBook';
import Login from './pages/Login';
import Navbar from './Components/Navbar';
import RequestedBooks from './pages/RequestedBooks';
import RequireAuth from './Components/RequireAuth';
import ViewRequests from './pages/admin/ViewRequests';
import RegisterUser from './pages/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/requestedbooks" element={<RequireAuth><RequestedBooks /></RequireAuth>} />
        <Route path="/books/:id" element={<OneBook />} />

        <Route path="/viewrequests" element={<ViewRequests />} />
      </Routes >
    </Router>
  );
}

export default App;
