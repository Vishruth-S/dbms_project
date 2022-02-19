import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { auth } from "../firebase-config";

function RequireAuth({ children }) {
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    return user ? children :
        <div>
            <h3>Please Login to access this page</h3>
            <Link to="/login">Login</Link>
        </div>;
}

export default RequireAuth