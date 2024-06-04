import { app, firestore, storage } from "./firebase";
import * as FileSystem from "expo-file-system";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as React from "react";
import axios from "axios";
import * as Location from "expo-location";
import { styles } from "./styles";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export const Home = ({ navigation }) => {
  const fileName = "notes.txt";
  const fileUri = FileSystem.documentDirectory + fileName;

  const auth = getAuth(app);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [userId, setUserId] = useState("");

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      const weather = await fetchWeatherData();
      setWeatherData(weather);
    };
    loadWeatherData();
  }, []);

  const fetchWeatherData = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const apiKey = "5cb109cb55194ff888771315240404";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null; 
    }
  };

  const initialCountdowns = [
    { id: 1, date: "2024-04-28", label: "Det grønne halvmaraton" },
    { id: 2, date: "2024-06-02", label: "Tri ved søen" },
    { id: 3, date: "2024-06-08", label: "Sjælland rundt" },
    { id: 4, date: "2024-09-01", label: "Frederiksværk Stålmand" },
    { id: 5, date: "2024-09-15", label: "Copenhagen Half" },
  ];

  const calculateCountdown = (targetDate) => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference < 0) {
      return "The event has occurred!";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return `${days} days`;
  };

  const updateCountdowns = () => {
    return initialCountdowns.map((event) => ({
      ...event,
      countdown: calculateCountdown(new Date(event.date)),
    }));
  };

  const [countdowns, setCountdowns] = useState(updateCountdowns());

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
      } else {
        setUserId(null);
      }
    });
    setCountdowns(updateCountdowns());
    return () => unsubscribe();
  }, []);

  function navigateToNotes() {
    navigation.navigate("Notes", { userId: userId });
  }

  function navigateToMap() {
    navigation.navigate("Map", { userId: userId });
  }

  function navigateToQuiz() {
    navigation.navigate("Quiz", { userId: userId });
  }

  async function login() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      console.log(userCredential.user.uid);
    } catch (error) {
      Alert.alert("Login failed: " + error.message);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }

  async function signup() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      console.log(userCredential.user.uid);
    } catch (error) {
      Alert.alert("Signup failed: " + error.message);
    }
  }

  return (
    <View style={styles.container}>
      {!userId && (
        <View style={styles.authContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            value={enteredEmail}
            onChangeText={setEnteredEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            value={enteredPassword}
            onChangeText={setEnteredPassword}
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={login}>
              <Text> Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={signup}>
              <Text> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* {userId && (
        // <View style={styles.logoutContainer}>
        //   <TouchableOpacity style={styles.button} onPress={logout}>
        //     <Text>Logout</Text>
        //   </TouchableOpacity>
        // </View>
      )} */}
      {userId && (
        <>
          {weatherData && (
            <View style={styles.weatherContainer}>
              <Text style={styles.weatherText}>
                Weather in {weatherData.location.name}:
              </Text>
              <Text style={styles.weatherText}>
                Temperature: {weatherData.current.temp_c}°C
              </Text>
              <Text style={styles.weatherText}>
                Condition: {weatherData.current.condition.text}
              </Text>
            </View>
          )}
          <TouchableOpacity style={styles.infocard}>
            {countdowns.map(({ id, label, countdown }) => (
              <View key={id} style={styles.countdownRow}>
                <Text style={styles.countdownLabel}>{label}:</Text>
                <Text style={styles.countdownDays}>{countdown}</Text>
              </View>
            ))}
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={navigateToNotes}>
            <Text> Go to Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={navigateToMap}>
            <Text> Go to Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={navigateToQuiz}>
            <Text> Go to Quiz</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
