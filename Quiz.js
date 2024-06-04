import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import { styles } from "./styles"; // Ensure this path is correct based on your file structure

export const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [initialMenu, setInitialMenu] = useState(true);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);
  const [newCorrectOption, setNewCorrectOption] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(firestore, "quizzes"));
      const questionsList = querySnapshot.docs.map((doc) => doc.data());
      setQuestions(questionsList);
    };
    fetchQuestions();
  }, []);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    const correctOption = questions[currentQuestionIndex].correctOption;
    setCorrectOption(correctOption);

    if (option === correctOption) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }
  };

  const handleNextPress = () => {
    setSelectedOption(null);
    setCorrectOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleAddQuestion = async () => {
    if (
      newQuestion &&
      newOptions.every((option) => option) &&
      newCorrectOption
    ) {
      const newQuestionObj = {
        question: newQuestion,
        options: newOptions,
        correctOption: newCorrectOption,
      };

      try {
        await addDoc(collection(firestore, "quizzes"), newQuestionObj);
        setQuestions([...questions, newQuestionObj]);
        setNewQuestion("");
        setNewOptions(["", "", "", ""]);
        setNewCorrectOption("");
        alert("Question added successfully!");
      } catch (error) {
        console.error("Error adding question: ", error);
      }
    } else {
      alert("Please fill out all fields to add a new question.");
    }
  };

  const renderInitialMenu = () => (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.quiztitle}>Quiz Menu</Text>
        <FlatList
          data={questions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Text style={styles.questionText}>
              {index + 1}. {item.question}
            </Text>
          )}
        />
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Enter new question"
            value={newQuestion}
            onChangeText={setNewQuestion}
          />
          {newOptions.map((option, index) => (
            <TextInput
              key={index}
              style={styles.textInput}
              placeholder={`Option ${index + 1}`}
              value={option}
              onChangeText={(text) => {
                const updatedOptions = [...newOptions];
                updatedOptions[index] = text;
                setNewOptions(updatedOptions);
              }}
            />
          ))}
          <TextInput
            style={styles.textInput}
            placeholder="Enter correct option"
            value={newCorrectOption}
            onChangeText={setNewCorrectOption}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleAddQuestion}
          >
            <Text>Add Question</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setInitialMenu(false)}
        >
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (initialMenu) {
    return renderInitialMenu();
  }

  if (questions.length === 0) {
    return <Text>Loading...</Text>;
  }

  if (quizFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.quiztitle}>Quiz Finished!</Text>
        <Text style={styles.progressText}>
          You got {correctAnswersCount} out of {questions.length} questions
          right.
        </Text>
        <TouchableOpacity
          onPress={() => {
            setCurrentQuestionIndex(0);
            setCorrectAnswersCount(0);
            setQuizFinished(false);
            setInitialMenu(true);
          }}
        >
          <Text style={styles.nextButtonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.quiztitle}>
          {questions[currentQuestionIndex].question}
        </Text>

        <Text style={styles.progressText}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>

        {questions[currentQuestionIndex].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.quizbutton,
              selectedOption &&
                option === correctOption &&
                styles.correctOptionButton,
              selectedOption &&
                option === selectedOption &&
                option !== correctOption &&
                styles.incorrectOptionButton,
            ]}
            onPress={() => handleOptionPress(option)}
            disabled={selectedOption !== null}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
        {selectedOption && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
