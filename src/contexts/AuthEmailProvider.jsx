import { createContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
  } from 'firebase/auth'
import { auth } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSessionStorage } from 'usehooks-ts'

export const AuthEmailContext = createContext({});

export const AuthEmailProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [userMail, setUserMail] = useSessionStorage('mail', 0);
  const [accessToken, setAccessToken] = useSessionStorage('access_token', 0);

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // console.log({
  //   "userId": user?.uid, 
  // })

  const [userState, loading, error] = useAuthState(auth);

  onAuthStateChanged(auth, (currentUser) => {
    if (loading) {
      console.log("loading user state")
      setIsLoading(true);
    } else {
      setUser(currentUser);
      setIsSignedIn(!!currentUser);
      setIsLoading(false);
    }
  })

  const registerUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth, 
        registerEmail, 
        registerPassword
      ).then(() => {
        console.log("create firebase user")
      });
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  const loginUser = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth, 
        loginEmail, 
        loginPassword
      );
      setUserMail(user?.user.email);
      setAccessToken(user?.user.accessToken);
      console.log({email: user?.user.email, accessToken: user?.user.accessToken});

    } catch (error) {
      console.log(error.message);
      if(error.message === "Firebase: Error (auth/invalid-email).") {
        alert("O email não está registrado.")
      } else if(error.message === "Firebase: Error (auth/wrong-password).") {
        alert("O senha não confere.")
      } else {
        alert("Erro desconhecido.")
      }
    }
  }
  const logoutUser = async () => {
    try {
      await signOut(auth);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <AuthEmailContext.Provider value={{ 
      registerEmail, 
      setRegisterEmail, 
      registerPassword, 
      setRegisterPassword,
      setLoginEmail,
      setLoginPassword,
      registerUser,
      loginUser,
      logoutUser,
      isSignedIn,
      errorMsg,
      isLoading,
      user
    }}>
      {children}
    </AuthEmailContext.Provider>
  )
}