import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase-config";

function RequireAuth({ children }) {
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    return user.uid ? children : <Navigate to="/login" replace />;
}

export default RequireAuth