import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { styles } from "../styles";
import { AntDesign } from "@expo/vector-icons";

export const QuizMenu = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const q = query(collection(firestore, "quizzes"), orderBy("index"));
      const querySnapshot = await getDocs(q);
      const questionsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(questionsList);
    };
    fetchQuestions();
  }, []);

  const updateIndexes = async (data) => {
    const batch = writeBatch(firestore);
    data.forEach((item, index) => {
      const docRef = doc(firestore, "quizzes", item.id);
      batch.update(docRef, { index });
    });
    await batch.commit();
  };

  const handleDragEnd = async ({ data }) => {
    // Update the indexes in the local state
    const updatedData = data.map((item, index) => ({
      ...item,
      index,
    }));
    setQuestions(updatedData);

    // Update the indexes in the Firestore database
    await updateIndexes(updatedData);
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
            <TouchableOpacity
              onPress={() => navigation.navigate("AddQuestion")}
            >
              <Text style={styles.centeredBoldText}>
                <AntDesign name="plus" size={16} color="white" /> Add new
                question <AntDesign name="plus" size={16} color="white" />
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
