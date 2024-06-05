import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Quiz } from "./Quiz/Quiz";
import { QuizMenu } from "./Quiz/QuizMenu";
import { AddQuestion } from "./Quiz/AddQuestion";
import { EditQuestion } from "./Quiz/EditQuestion";

export default function App() {
  const Stack = createNativeStackNavigator();
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
              headerStyle: { backgroundColor: "#153448" },
              headerTitleAlign: "center",
              headerTintColor: "#ffffff", 
              headerShadowVisible: false,
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20, 
              },
            }}
          />

          <Stack.Screen
            name="AddQuestion"
            component={AddQuestion}
            options={{
              headerShown: true,
              title: "AddQuestion",
              headerStyle: { backgroundColor: "#153448" },
              headerTitleAlign: "center",
              headerTintColor: "#ffffff",
              headerShadowVisible: false,
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
              },
            }}
          />
          <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={{
              headerShown: true,
              title: "Quiz",
              headerStyle: { backgroundColor: "#153448" },
              headerTitleAlign: "center",
              headerTintColor: "#ffffff",
              headerShadowVisible: false,
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
              },
            }}
          />
          <Stack.Screen
            name="EditQuestion"
            component={EditQuestion}
            options={{
              headerShown: true,
              title: "EditQuestion",
              headerStyle: { backgroundColor: "#153448" },
              headerTitleAlign: "center",
              headerTintColor: "#ffffff",
              headerShadowVisible: false,
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
