import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../firebase-config";

function AdminAuth({ children }) {
    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState({})

    const getAdmins = async () => {
        if (user.uid) {
            const currentUser = user.uid ? doc(db, "admins", user.uid) : null
            const currentUserData = await getDoc(currentUser);
            // console.log(currentUserData.data())
            setAdmin(currentUserData.data().uid)
        }
    }
    useEffect(() => {
        getAdmins()
    }, [user])
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });


    return user && user.uid === admin ? children : <h1>Access Denied: You are not an admin</h1>;


}

export default AdminAuth