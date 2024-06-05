import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase";
import { styles } from "../styles";

export const AddQuestion = ({ navigation }) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);
  const [selectedOption, setSelectedOption] = useState(null); // Store index of selected option

  const handleOptionChange = (text, index) => {
    setNewOptions((prevOptions) => [
      ...prevOptions.slice(0, index),
      text,
      ...prevOptions.slice(index + 1),
    ]);
    setSelectedOption(index); // Set selected option index
  };

  const questionsToAdd = [
    {
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      correctOption: "Pacific Ocean",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: [
        "Vincent van Gogh",
        "Leonardo da Vinci",
        "Pablo Picasso",
        "Claude Monet",
      ],
      correctOption: "Leonardo da Vinci",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["O2", "H2O", "CO2", "NaCl"],
      correctOption: "H2O",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctOption: "Mars",
    },
    {
      question: "What is the capital city of Japan?",
      options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
      correctOption: "Tokyo",
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: [
        "William Shakespeare",
        "Charles Dickens",
        "Mark Twain",
        "Jane Austen",
      ],
      correctOption: "William Shakespeare",
    },
    {
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Platinum"],
      correctOption: "Diamond",
    },
    {
      question: "What is the smallest unit of life?",
      options: ["Tissue", "Organ", "Cell", "Molecule"],
      correctOption: "Cell",
    },
    {
      question: "Which element has the atomic number 1?",
      options: ["Oxygen", "Hydrogen", "Carbon", "Helium"],
      correctOption: "Hydrogen",
    },
    {
      question: "What is the tallest mountain in the world?",
      options: ["K2", "Mount Kilimanjaro", "Mount Everest", "Denali"],
      correctOption: "Mount Everest",
    },
  ];

  const handleBulkAddQuestions = async () => {
    try {
      const quizCollection = collection(firestore, "quizzes");

      for (let questionObj of questionsToAdd) {
        const q = query(
          quizCollection,
          where("question", "==", questionObj.question)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          const allQuestionsSnapshot = await getDocs(quizCollection);
          const newIndex = allQuestionsSnapshot.size;

          await addDoc(quizCollection, {
            ...questionObj,
            index: newIndex
          });
        }
      }
      alert("Default questions added successfully!");
    } catch (error) {
      console.error("Error adding questions: ", error);
    }
  };

  const handleAddQuestion = async () => {
    if (
      newQuestion &&
      newOptions.every((option) => option) &&
      selectedOption !== null
    ) {
      const newQuestionObj = {
        question: newQuestion,
        options: newOptions,
        correctOption: newOptions[selectedOption],
      };

      try {
        const quizCollection = collection(firestore, "quizzes");
        const allQuestionsSnapshot = await getDocs(quizCollection);
        const newIndex = allQuestionsSnapshot.size;

        await addDoc(quizCollection, {
          ...newQuestionObj,
          index: newIndex
        });

        alert("Question added successfully!");
        navigation.goBack();
      } catch (error) {
        console.error("Error adding question: ", error);
      }
    } else {
      alert("Please fill out all fields to add a new question.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter new question"
          value={newQuestion}
          onChangeText={setNewQuestion}
        />
        {newOptions.map((option, index) => (
          <View key={index} style={styles.optionContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={`Option ${index + 1}`}
              value={option}
              onChangeText={(text) => handleOptionChange(text, index)}
            />
            <TouchableOpacity onPress={() => setSelectedOption(index)}>
              {selectedOption === index ? ( // Check if this option is selected
                <Text style={styles.selectedCheckbox}>&#10004;</Text> // Checked symbol
              ) : (
                <Text style={styles.unselectedCheckbox}>&#10006;</Text> // Unchecked symbol
              )}
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={handleAddQuestion}>
          <Text>Add Question</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleBulkAddQuestions}
        >
          <Text>Add Default Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.goBack()}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
