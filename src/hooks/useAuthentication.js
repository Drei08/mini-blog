import { db } from "../firebase/config";

import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Cleanup para evitar memory leaks
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();
  
  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }


  //Registro
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName
      });


      setLoading(false);

      return user;

    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde.";
      }

      setLoading(false);
      setError(systemErrorMessage);

    }
  };

  //Logout  -sing out
  const logout = () => {
    //limpando memoria Link
    checkIfIsCancelled();
    signOut(auth);
  }

  // Evitar memory leaks
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
  };
};