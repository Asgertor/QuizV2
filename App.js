import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  ToastAndroid,
  Image,
  Alert,
} from "react-native";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  ref,
} from "firebase/storage";
import * as React from "react";

import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCamera,
  faFileImport,
  faFloppyDisk,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import MapView, { Callout, Marker, CustomCalloutView } from "react-native-maps";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";

import { Notes } from "./Notes";
import { Map } from "./Map";
import { SpecificNote } from "./SpecificNote";
import { Home } from "./Home";
import { Quiz } from "./Quiz";

export default function App() {
  const Stack = createNativeStackNavigator();

  const LogoutButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 10 }}>
      <AntDesign name="logout" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            title: "Home",
            headerStyle: { backgroundColor: "#4f6d7a" }, // Dark teal background
            headerTitleAlign: "center",
            headerTintColor: "#ffffff", // White for text and icons
            headerShadowVisible: false, // Disable the shadow for a cleaner look
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20, // Slightly larger text
            },
            headerRight: () => (
              <LogoutButton
                onPress={() => console.log("Perform logout logic here")}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Notes"
          component={Notes}
          options={{
            headerShown: true,
            title: "Notes",
            headerStyle: { backgroundColor: "#4f6d7a" }, // Dark teal background
            headerTitleAlign: "center",
            headerTintColor: "#ffffff", // White for text and icons
            headerShadowVisible: false, // Disable the shadow for a cleaner look
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20, // Slightly larger text
            },
            headerRight: () => (
              <LogoutButton
                onPress={() => console.log("Perform logout logic here")}
              />
            ),
          }}
        />
        <Stack.Screen
          name="SpecificNote"
          component={SpecificNote}
          options={{
            headerShown: true,
            title: "SpecificNote",
            headerStyle: { backgroundColor: "#4f6d7a" }, // Dark teal background
            headerTitleAlign: "center",
            headerTintColor: "#ffffff", // White for text and icons
            headerShadowVisible: false, // Disable the shadow for a cleaner look
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20, // Slightly larger text
            },
            headerRight: () => (
              <LogoutButton
                onPress={() => console.log("Perform logout logic here")}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            headerShown: true,
            title: "Map",
            headerStyle: { backgroundColor: "#4f6d7a" }, // Dark teal background
            headerTitleAlign: "center",
            headerTintColor: "#ffffff", // White for text and icons
            headerShadowVisible: false, // Disable the shadow for a cleaner look
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20, // Slightly larger text
            },
            headerRight: () => (
              <LogoutButton
                onPress={() => console.log("Perform logout logic here")}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{
            headerShown: true,
            title: "Quiz",
            headerStyle: { backgroundColor: "#4f6d7a" }, // Dark teal background
            headerTitleAlign: "center",
            headerTintColor: "#ffffff", // White for text and icons
            headerShadowVisible: false, // Disable the shadow for a cleaner look
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20, // Slightly larger text
            },
            headerRight: () => (
              <LogoutButton
                onPress={() => console.log("Perform logout logic here")}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
