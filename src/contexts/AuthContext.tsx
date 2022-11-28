import { auth } from "../firebase/firebase";
import React, { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, User, UserCredential, AuthProvider, Auth, sendEmailVerification, ActionCodeSettings } from "firebase/auth";

type AuthContextType = {
    currentUser: User | null | undefined,
    signUp: (auth: Auth, email: string, password: string) => Promise<UserCredential>,
    logIn: (auth: Auth, email: string, password: string) => Promise<UserCredential>,
    verifyEmail: (user: User, actionCode: ActionCodeSettings) => Promise<void>,
    logInWithGoogle: (auth: Auth, provider: AuthProvider) => Promise<UserCredential>,
    logOut: (auth: Auth) => Promise<void>,
    resetPassword: (auth: Auth, email: string) => Promise<void>,
}

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
    children: React.ReactNode,
}

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>();
    const [loading, setLoading] = useState(true);

    function signUp(auth: Auth, email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function logIn(auth: Auth, email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logInWithGoogle(auth: Auth, provider: AuthProvider) {
        return signInWithPopup(auth, provider);
    }

    function verifyEmail(user: User, actionCode: ActionCodeSettings) {
        return sendEmailVerification(user, actionCode);
    }

    function logOut(auth: Auth) {
        return signOut(auth);
    }

    function resetPassword(auth: Auth, email: string) {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, []);

    const value = { currentUser, signUp, logIn, logOut, resetPassword, logInWithGoogle, verifyEmail };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>

    )
}

export default AuthProvider;