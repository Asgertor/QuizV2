import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#153448",
    justifyContent: "top",
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
  },
  card: {
    width: "90%",
    backgroundColor: "#F8CBA6",
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    color: "black",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10, // Increase padding for better spacing
    margin: 5,
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    width: "90%",
    fontSize: 20,
    textAlignVertical: "center", // Center text vertically
    overflow: "hidden", // Hide overflowed text
  },

  textOptionInput: {
    color: "black",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 15,
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    width: "80%",
    fontSize: 16,
  },
  addButton: {
    fontSize: 20,
    color: "white",
    backgroundColor: "#E88D67",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: "40%",

    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  cancelButton: {
    fontSize: 20,
    color: "white",
    backgroundColor: "#E88D67",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: "40%",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 5,
    width: "100%",

  },
  flatList: {
    width: "100%",
    height: "60%",
  },
  quiztitle: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#E88D67",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  statusContainer: {
    flexDirection: "row", // Aligns children in a row
    justifyContent: "space-between", // Aligns children with space between them
    width: "100%", // Ensure the container spans the full width
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  progressText: {
    fontSize: 16,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 16,
    color: "black",
  },
  centeredBoldText: {
    backgroundColor: "#E88D67",
    fontSize: 16,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 10,
    width: "100%",
    padding: 5,
    marginTop: 5,
  },
  questionContainer: {
    marginVertical: 2,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width: "100%",
  },
  quizbutton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  correctOptionButton: {
    backgroundColor: "#71CB90",
    width: "100%",
  },
  incorrectOptionButton: {
    backgroundColor: "#EB442C",
    width: "100%",
  },
  optionText: {
    fontSize: 16,
  },
  optionContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  selectedCheckbox: {
    fontSize: 50,
    color: "green",
  },
  unselectedCheckbox: {
    fontSize: 50,
    color: "gray",
  },
  scrollView: {
    marginVertical: 1,
    height: "75%",
  },
  answerContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  correctAnswerText: {
    fontSize: 16,
    color: "green",
  },
  wrongAnswerText: {
    fontSize: 16,
    color: "red",
  },
  addDeleteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
