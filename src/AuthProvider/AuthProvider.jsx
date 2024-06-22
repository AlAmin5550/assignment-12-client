import { getAuth } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import app from "../Firebase/firebase.config"
import useAxiosPublic from "../Hooks/useAxiosPublic";
import axios from "axios";


export const AuthContext = createContext(null);
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();
    const GoogleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('Observing current user', currentUser);
            const userEmail = currentUser?.email || user?.email;
            const userInfo = { email: userEmail };
            if(currentUser){
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    console.log('Got token',res.data)
                })
            }
            else{
                axios.post('/logout',userInfo)
                .then(res=>{
                    console.log('clearing token ', res.data)

                })
            }
            setLoading(false);
            setUser(currentUser);

        });
        return () => {
            unSubscribe();
        }
    }, [])
    const authInfo = {
        user, signIn, loading, createUser, GoogleSignIn, setLoading, logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;