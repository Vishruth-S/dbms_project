import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import Register from "../Components/Register";

function Regiser() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };


    const logout = async () => {
        await signOut(auth);
    };

    return (
        <div>
            <div>
                <h3> Register User </h3>
                <input
                    placeholder="Email..."
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                />
                <input
                    placeholder="Password..."
                    type="password"
                    onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}
                />

                <button onClick={register}> Create User</button>
            </div>


            {/* <h4> User Logged In: </h4> */}
            {user ? <Register /> : null}
            {/* {user ? <button onClick={logout}> Sign Out </button> : null} */}
        </div>
    );
}

export default Register;