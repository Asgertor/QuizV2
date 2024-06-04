import { StatusBar } from "expo-status-bar";
import { app, firestore, storage } from "./firebase";
import { initializeApp } from "firebase/app";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  getFirestore,
  GeoPoint,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import * as FileSystem from "expo-file-system";
import { useState, useEffect, useCallback, useRef } from "react";
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
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
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

import { styles } from "./styles";

export const SpecificNote = ({ navigation, route }) => {
  const { userId } = route.params;
  const noteId = route.params?.id;
  const [note, setNote] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [inputText, setInputText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  async function importPicture() {
    const resultat = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!resultat.canceled) {
      console.log("Got the picture..." + resultat);
      setImagePath(resultat.assets[0].uri); //sætter stien til billedet)
    }
  }

  async function uploadBillede(noteId) {
    const res = await fetch(imagePath);
    const blob = await res.blob();
    const storageRef = ref(storage, `${noteId}`);
    uploadBytes(storageRef, blob).then(() => {
      console.log("Image uploaded..." + noteId);
    });
  }

  async function downloadBillede(noteId) {
    await getDownloadURL(ref(storage, `${noteId}`)).then((url) => {
      setImagePath(url);
      console.log("Image downloaded..." + noteId);
    });
  }

  async function deleteNote(id) {
    console.log("Saving note..." + userId);

    Alert.alert(
      "Delete Note", // Alert Title
      "Are you sure you want to delete this note?", // Alert Message
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await deleteDoc(doc(firestore, userId, id));
              console.log("Note deleted from db!");
              navigation.navigate("Notes", { userId: userId });
            } catch (e) {
              console.error("Error deleting note: ", e);
              Alert.alert("Error deleting note"); // Error feedback
            }
          },
        },
      ],
      { cancelable: true } // This allows the alert to be dismissed by tapping outside of it
    );
  }

  async function handleSave() {
    console.log("Saving note..." + userId);
    if (noteId) {
      try {
        const noteRef = doc(firestore, userId, noteId);
        await updateDoc(noteRef, { text: inputText });
        console.log("Note updated in db!");
        ToastAndroid.show("Note updated!", ToastAndroid.LONG);

        uploadBillede(noteId);
        navigation.navigate("Notes", { userId: userId });
      } catch (e) {
        console.log("Error updating note: ", e);
      }
    }
  }

  async function launchCamera() {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if (result.granted == false) {
      console.log("Kamera ikke tilladt");
    } else {
      ImagePicker.launchCameraAsync({
        quality: 1,
      }).then((response) => {
        console.log("Billede taget" + response);
        setImagePath(response.assets[0].uri);
      });
    }
  }
  useEffect(() => {
    const fetchNote = async () => {
      if (noteId) {
        try {
          const noteRef = doc(firestore, userId, noteId);
          const noteSnap = await getDoc(noteRef);
          if (noteSnap.exists()) {
            const noteData = noteSnap.data();
            setNote(noteData); // Set the fetched note
            setInputText(noteData.text);

            // Attempt to fetch the image, but do not error if it doesn't exist
            try {
              const imageRef = ref(storage, `${noteId}`);
              const imageUrl = await getDownloadURL(imageRef);
              if (imageUrl) {
                setImagePath(imageUrl);
                console.log("Image downloaded..." + noteId);
              }
            } catch (imageError) {
              console.log("No image found for note: ", noteId);
              // Optionally set imagePath to null or an empty string here if needed
              // setImagePath(null);
            }
          } else {
            console.log("No such document!");
          }
        } catch (e) {
          console.error("Error fetching note: ", e);
        }
      }
    };

    fetchNote();
  }, [noteId, firestore, storage]); // Add dependencies used in useEffect

  const handleTextChange = (text) => {
    setInputText(text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.card}>
            {isEditing ? (
              <TextInput
                style={[
                  styles.editableTitle,
                  {
                    width: "100%",
                    height: "100",
                    borderColor: "gray",
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 5,
                    margin: 5,
                    textAlignVertical: "top",
                  },
                ]}
                onChangeText={handleTextChange} // Updated to use handleTextChange
                value={inputText}
                autoFocus={true}
                onBlur={() => setIsEditing(false)} // Optionally, you could save on blur as well
                returnKeyType="done"
                multiline={true}
              />
            ) : (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text
                  style={[
                    styles.title,
                    {
                      height: "100",
                      borderColor: "gray",
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 5,
                      margin: 5,
                      textAlignVertical: "top",
                    },
                  ]}
                >
                  {inputText}
                </Text>
              </TouchableOpacity>
            )}
            {imagePath && (
              <Image
                source={{ uri: imagePath }}
                style={{
                  width: 190,
                  height: 250,
                  resizeMode: "contain",
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: "#000",
                }}
              />
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={importPicture}>
                <Text>Importér billede</Text>
                <FontAwesomeIcon icon={faFileImport} />
              </TouchableOpacity>
              {/*<TouchableOpacity
              style={styles.button}
              onPress={() => uploadBillede(noteId)}
            >
              <Text>Upload billede</Text>
            </TouchableOpacity>
          */}

              <TouchableOpacity
                style={styles.button}
                onPress={() => launchCamera()}
              >
                <Text>Tag billede</Text>
                <FontAwesomeIcon icon={faCamera} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => deleteNote(noteId)}
            >
              <Text>Delete note</Text>
              <FontAwesomeIcon icon={faTrash} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={handleSave}>
              <Text>Save note</Text>
              <FontAwesomeIcon icon={faFloppyDisk} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
