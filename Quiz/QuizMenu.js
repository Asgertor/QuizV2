import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  writeBatch,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { styles } from "../styles";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export const QuizMenu = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  const fetchQuestions = useCallback(async () => {
    const q = query(collection(firestore, "quizQuestions"), orderBy("index"));
    const querySnapshot = await getDocs(q);
    const questionsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setQuestions(questionsList);
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  useFocusEffect(
    useCallback(() => {
      fetchQuestions();
    }, [fetchQuestions])
  );

  const updateIndexes = async (data) => {
    const batch = writeBatch(firestore);
    data.forEach((item, index) => {
      const docRef = doc(firestore, "quizQuestions", item.id);
      batch.update(docRef, { index: index + 1 });
    });
    await batch.commit();
  };

  const handleDragEnd = async ({ data }) => {
    // Update the indexes in the local state
    const updatedData = data.map((item, index) => ({
      ...item,
      index: index + 1, // Ensure index starts at 1
    }));
    setQuestions(updatedData);

    // Update the indexes in the Firestore database
    await updateIndexes(updatedData);
  };

  const handleDeleteAll = async () => {
    Alert.alert(
      "Delete All Questions",
      "Are you sure you want to delete all questions?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const batch = writeBatch(firestore);
            questions.forEach((item) => {
              const docRef = doc(firestore, "quizQuestions", item.id);
              batch.delete(docRef);
            });
            await batch.commit();
            setQuestions([]);
          },
        },
      ]
    );
  };

  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={[
          styles.questionContainer,
          { backgroundColor: isActive ? "#f0f0f0" : "#fff" },
        ]}
        onLongPress={drag}
        onPress={() =>
          navigation.navigate("EditQuestion", { questionId: item.id })
        }
      >
        <Text style={styles.questionText}>
          {item.index}. {item.question}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Quiz")}
        >
          <Text style={styles.quiztitle}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setShowQuestions((prev) => !prev)}
        >
          <Text style={[styles.centeredBoldText]}>
            <AntDesign
              name={showQuestions ? "caretup" : "caretdown"}
              size={16}
              color="white"
            />
            View current questions{" "}
            <AntDesign
              name={showQuestions ? "caretup" : "caretdown"}
              size={16}
              color="white"
            />
          </Text>
        </TouchableOpacity>
        {showQuestions && (
          <View style={styles.flatList}>
            <DraggableFlatList
              data={questions}
              keyExtractor={(item) => item.id}
              onDragEnd={handleDragEnd}
              renderItem={renderItem}
              scrollEnabled
            />
            <View style={styles.addDeleteContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddQuestion")}
              >
                <Text style={styles.centeredBoldText}>
                  <AntDesign name="plus" size={40} color="white" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteAll}>
                <Text style={styles.centeredBoldText}>
                  <AntDesign name="delete" size={40} color="white" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};