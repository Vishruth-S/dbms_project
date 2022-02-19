import { useEffect, useState } from "react";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { Link, Navigate, useSearchParams } from "react-router-dom";

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});
    const [redirect, setRedirect] = useState(false)
    const [userType, setUserType] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    useEffect(() => {
        setUserType(searchParams.get("type"))
    }, [])

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            alert("Logged in successfully")
            setRedirect(true)
            // console.log(user);
        } catch (error) {
            alert(error.message);
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <div>
            {!redirect
                ?
                <div>
                    <div>
                        <h3> Login </h3>
                        <input
                            placeholder="Email..."
                            onChange={(event) => {
                                setLoginEmail(event.target.value);
                            }}
                        />
                        <input
                            placeholder="Password..."
                            type="password"
                            onChange={(event) => {
                                setLoginPassword(event.target.value);
                            }}
                        />

                        <button onClick={login}> Login</button>
                    </div>
                    {userType === "user" ?
                        <div>
                            <h2>Don't have an account?</h2>
                            <Link to="/register">Sign up</Link>
                        </div>
                        :
                        null
                    }

                </div>
                :
                <Navigate to="/profile" />}

            {/* <h4> User Logged In: </h4>
            {user?.email} */}

            {/* <button onClick={logout}> Sign Out </button> */}
        </div>
    );
}

export default Login;