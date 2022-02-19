import { useState } from "react";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import './Login.css'

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            // console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <>
         {/* <div>
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

             {/* <h4> User Logged In: </h4>
            {user?.email} 

             <button onClick={logout}> Sign Out </button>  */}
         {/* </div>   */}

      
  <div class="formC">
  		<h2 class="title">
  				Welcome!
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
                
   	<div class="bottom">
						<span>
							Don't have an account?
						</span>
						<a href="/register">
							Sign Up
						</a>
					</div>
  </div> 

</>
    );
}

export default Login;