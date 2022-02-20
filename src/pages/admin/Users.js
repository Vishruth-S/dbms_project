import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { auth, db } from "../../firebase-config";
import { onAuthStateChanged } from 'firebase/auth';
import './User.css'

function Users() {
    const [newName, setNewName] = useState('')
    const [newAge, setNewAge] = useState('')
    const [users, setUsers] = useState([])
    const usersCollectionRef = collection(db, "users")
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        // console.log(currentUser)
    });
    const createUser = async () => {
        await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) })
    }

    const updateUser = async (id, age) => {
        const userDoc = doc(db, "users", id)
        const newFields = { age: age + 1 };
        await updateDoc(userDoc, newFields)
    }

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc)
    }

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getUsers()
    }, [])

    return (
        <div className="userflex">
            {/* <div>
                <input placeholder="Name" onChange={e => setNewName(e.target.value)} />
                <input type="number" placeholder='number' onChange={e => setNewAge(e.target.value)} />
                <button onClick={createUser}>Create user</button>
            </div> */}
            {users.map(user => {
                return (
                    <div className='ucard'>
                        <h3>{user.name}</h3>
                        <p>{user.age}</p>
                        {/* <button onClick={() => { updateUser(user.id, user.age) }}>Increase age</button> */}
                        <button onClick={() => { deleteUser(user.id) }}> Delete User</button>
                    </div>
                )
            })}
        </div>
    );
}

export default Users;
