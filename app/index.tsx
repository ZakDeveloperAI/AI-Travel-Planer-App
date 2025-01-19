import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import Login from './../components/Login';
import { auth } from "@/configs/FirebaseConfig";
import { Redirect } from "expo-router";
import { User } from "firebase/auth";
import 'react-native-get-random-values';



export default function Index() {
  const [user, setUser] = useState<User | null>(null); // Stato per l'utente
  const [loading, setLoading] = useState<boolean>(true); // Stato per il caricamento



  useEffect(() => {
    // Verifica lo stato dell'utente quando il componente si monta
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log("Auth state changed:");
      if (currentUser) {
        console.log("User logged in:", currentUser.email); // Stampa l'email dell'utente
      } else {
        console.log("No user logged in"); // Stampa se nessun utente è loggato
      }
      setUser(currentUser); // Imposta l'utente
      setLoading(false); // Finito il caricamento
    });

    // Pulisce il listener quando il componente viene smontato
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Stampa informazioni sull'utente */}
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        {user ? `Logged in as: ${user.email}` : "No user logged in (null)"}
      </Text>

      {/* Se l'utente è loggato, redirige alla pagina mytrip */}
      {user ? (
        <Redirect href="./mytrip" />
      ) : (
        // Altrimenti mostra il componente di login
        <Login />
      )}
    </View>
  );
}
