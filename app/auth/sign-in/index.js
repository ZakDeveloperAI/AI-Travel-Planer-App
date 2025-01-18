import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from './../../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../configs/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    // Check for existing session on app load
    const checkSession = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          router.replace('/home'); // Navigate to your home screen
        }
      } catch (error) {
        console.log('Error retrieving session:', error);
      }
    };

    checkSession();
  }, []);

  const onSignIn = async () => {
    if (!email || !password) {
      ToastAndroid.show('Please Enter Email and Password', ToastAndroid.LONG);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user session
      await AsyncStorage.setItem('user', JSON.stringify(user));

      console.log('User signed in:', user);
      router.replace('/home'); // Navigate to your home screen
    } catch (error) {
      console.log('Error signing in:', error.code);
      if (error.code === 'auth/invalid-email' || error.code === 'auth/invalid-credential') {
        ToastAndroid.show('Invalid Credentials', ToastAndroid.LONG);
      }
    }
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 40,
        backgroundColor: Colors.WHITE,
        height: '100%',
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 30,
          marginTop: 30,
        }}
      >
        Let's Sign You In
      </Text>
      <Text
        style={{
          fontFamily: 'outfit',
          fontSize: 30,
          color: Colors.GRAY,
          marginTop: 20,
        }}
      >
        Welcome Back
      </Text>
      <Text
        style={{
          fontFamily: 'outfit',
          fontSize: 30,
          color: Colors.GRAY,
          marginTop: 10,
        }}
      >
        You've been missed
      </Text>

      <View style={{ marginTop: 50 }}>
        <Text style={{ fontFamily: 'outfit' }}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setEmail(value)}
          placeholder="Enter your email"
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: 'outfit' }}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          placeholder="Enter Password"
        />
      </View>

      <TouchableOpacity
        onPress={onSignIn}
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: 'center',
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace('auth/sign-up')}
        style={{
          padding: 20,
          backgroundColor: Colors.WHITE,
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            textAlign: 'center',
          }}
        >
          Create New Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: 'outfit',
  },
});
