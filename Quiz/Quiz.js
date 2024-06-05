import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { firestore } from "../firebase";
import { styles } from "../styles";
import { AntDesign } from "@expo/vector-icons";

export const Quiz = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timer, setTimer] = useState(10);
  const [answers, setAnswers] = useState([]); // Track answers

  useEffect(() => {
    const fetchQuestions = async () => {
      const q = query(collection(firestore, "quizQuestions"), orderBy("index"));
      const querySnapshot = await getDocs(q);
      const questionsList = querySnapshot.docs.map((doc) => doc.data());
      setQuestions(questionsList);
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleNextPress();
    }

    const timerId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timer]);

  useEffect(() => {
    setTimer(10);
  }, [currentQuestionIndex]);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    const correctOption = questions[currentQuestionIndex].correctOption;
    setCorrectOption(correctOption);

    if (option === correctOption) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }

    // Record the answer
    const newAnswer = {
      question: questions[currentQuestionIndex].question,
      userAnswer: option,
      correctAnswer: correctOption,
      isCorrect: option === correctOption
    };
    setAnswers([...answers, newAnswer]);

    // Automatically go to the next question after 1 second
    setTimeout(() => {
      handleNextPress();
    }, 1000);
  };

  const handleNextPress = () => {
    setSelectedOption(null);
    setCorrectOption(null);
    setTimer(10);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  if (questions.length === 0) {
    return <Text> loading... </Text>;
  }

  if (quizFinished) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.quiztitle}>Quiz Finished!</Text>
          <Text style={styles.progressText}>
            You got {correctAnswersCount} out of {questions.length} questions right.
          </Text>
          <ScrollView style={styles.scrollView}>
            {answers.map((answer, index) => (
              <View key={index} style={styles.answerContainer}>
                <Text style={styles.questionText}>{index + 1}. {answer.question}</Text>
                {answer.isCorrect ? (
                  <Text style={styles.correctAnswerText}>Right answer: {answer.correctAnswer}</Text>
                ) : (
                  <>
                    <Text style={styles.wrongAnswerText}>You answered: {answer.userAnswer}</Text>
                    <Text style={styles.correctAnswerText}>Right answer: {answer.correctAnswer}</Text>
                  </>
                )}
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              setCurrentQuestionIndex(0);
              setCorrectAnswersCount(0);
              setQuizFinished(false);
              setAnswers([]);
              navigation.navigate("QuizMenu");
            }}
          >
            <Text style={styles.quizbutton}>Back to Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.statusContainer}>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1} / {questions.length}
          </Text>
          <Text style={styles.progressText}>
            {timer} <AntDesign name="clockcircle" size={20} color="black" />
          </Text>
        </View>
        <Text style={styles.quiztitle}>
          {questions[currentQuestionIndex].question}
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
      </View>
    </View>
  );
};
