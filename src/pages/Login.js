import { useEffect, useState } from "react";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import './Login.css'
import { Navigate, useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});
    const [redirect, setRedirect] = useState(false)
    const [userType, setUserType] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
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
            ).then(
                userType === "admin" ? navigate('/adminlanding') : navigate('/books')
            );
            // console.log(user);
        } catch (error) {
            alert(error.message);
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <>
            {user ?
                <h2>You are already logged in</h2>
                : <div class="formC">
                    <h2 class="title">
                        {userType === "admin" ? <>Welcome Admin!</> : <>Welcome</>}
                    </h2>
                    <div className="form">
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
                    {userType === "admin" ? 
                        < div class="bottom">
                        <span>
                            Don't have an account?
                        </span>
                        <a href="/adminregister">
                            Sign Up
                        </a>
                        </div>
                    :
                        < div class="bottom">
                            <span>
                                Don't have an account?
                            </span>
                            <a href="/register">
                                Sign Up
                            </a>
                        </div>
                    }

                </div>
            }

        </>
    );
}

export default Login;