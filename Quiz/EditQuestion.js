import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { styles } from "../styles";
import { AntDesign } from "@expo/vector-icons";

export const EditQuestion = ({ route, navigation }) => {
  const { questionId } = route.params;
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      const docRef = doc(firestore, "quizQuestions", questionId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setQuestion(data.question);
        setOptions(data.options);
        setSelectedOption(data.options.indexOf(data.correctOption));
      } else {
        console.log("No such document!");
      }
    };
    fetchQuestion();
  }, [questionId]);

  const handleOptionChange = (text, index) => {
    setOptions((prevOptions) => [
      ...prevOptions.slice(0, index),
      text,
      ...prevOptions.slice(index + 1),
    ]);
    setSelectedOption(index);
  };

  const handleSaveChanges = async () => {
    if (
      question &&
      options.every((option) => option) &&
      selectedOption !== null
    ) {
      const updatedQuestion = {
        question,
        options,
        correctOption: options[selectedOption],
      };

      try {
        const docRef = doc(firestore, "quizQuestions", questionId);
        await updateDoc(docRef, updatedQuestion);
        alert("Question updated successfully!");
        navigation.goBack();
      } catch (error) {
        console.error("Error updating question: ", error);
      }
    } else {
      alert("Please fill out all fields to save the question.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter new question"
          value={question}
          onChangeText={setQuestion}
          multiline={true} // Enable multiline
          numberOfLines={4} // Set the number of lines
          scrollEnabled={true} // Enable scrolling
        />
        {options.map((option, index) => (
          <View key={index} style={styles.optionContainer}>
            <TextInput
              style={styles.textOptionInput}
              placeholder={`Option ${index + 1}`}
              value={option}
              onChangeText={(text) => handleOptionChange(text, index)}
            />
            <TouchableOpacity onPress={() => setSelectedOption(index)}>
              {selectedOption === index ? (
                <Text style={styles.selectedCheckbox}>
                  <AntDesign name="check" size={40} color="green" />
                </Text>
              ) : (
                <Text style={styles.unselectedCheckbox}>
                  <AntDesign name="close" size={40} color="red" />
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleSaveChanges}
          >
            <Text>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.goBack()}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
