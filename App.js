import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Home } from "./Notes/Home";
import { Quiz } from "./Quiz/Quiz";
import { QuizMenu } from "./Quiz/QuizMenu";
import { AddQuestion } from "./Quiz/AddQuestion";
import { EditQuestion } from "./Quiz/EditQuestion";

export default function App() {
  const Stack = createNativeStackNavigator();

  const LogoutButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 10 }}>
      <AntDesign name="logout" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="QuizMenu"
            component={QuizMenu}
            options={{
              headerShown: true,
              title: "QuizMenu",
              headerStyle: { backgroundColor: "#153448" }, // Dark teal background
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
            name="Home"
            component={Home}
            options={{
              headerShown: true,
              title: "Home",
              headerStyle: { backgroundColor: "#153448" }, // Dark teal background
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
            name="AddQuestion"
            component={AddQuestion}
            options={{
              headerShown: true,
              title: "AddQuestion",
              headerStyle: { backgroundColor: "#005C78" }, // Dark teal background
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
              headerStyle: { backgroundColor: "#005C78" }, // Dark teal background
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
            name="EditQuestion"
            component={EditQuestion}
            options={{
              headerShown: true,
              title: "EditQuestion",
              headerStyle: { backgroundColor: "#005C78" }, // Dark teal background
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
    </GestureHandlerRootView>
  );
}
