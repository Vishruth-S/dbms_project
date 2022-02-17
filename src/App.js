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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/requestedbooks" element={<RequestedBooks />} />
        <Route path="/books/:id" element={<OneBook />} />
      </Routes >
    </Router>
  );
}

export default App;
