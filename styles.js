import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4f6d7a",
    justifyContent: "top",
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
  },
  card: {
    backgroundColor: "#e8dab2",
    borderRadius: 10,
    padding: 10,
    paddingTop: 20,
    marginTop: 10,
    alignItems: "center",
    shadowColor: "black",
    elevation: 10,
    width: "90%",
  },
  infocard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    alignItems: "left",
    shadowColor: "black",
    elevation: 0,
    width: "90%",
  },
  textInput: {
    color: "black",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  button: {
    fontSize: 20,
    color: "white",
    backgroundColor: "#c0d6df",
    borderRadius: 10,
    padding: 5,
    margin: 5,
    width: 100,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 5,
  },
  addButton: {
    fontSize: 30,
    flexDirection: "row",
    color: "white",
    backgroundColor: "#c0d6df",
    borderRadius: 10,
    padding: 5,
    margin: 10,
    width: 120,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 5,
  },
  button2: {
    fontSize: 20,
    color: "white",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    width: 180,
    margin: 5,
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 5,
  },
  textButton: {
    fontSize: 20,
    color: "white",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    width: 330,
    margin: 2,
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 5,
  },
  saveButton: {
    fontSize: 20,
    color: "white",
    backgroundColor: "#c0d6df",
    color: "white",
    borderRadius: 10,
    padding: 5,
    margin: 5,
    width: 100,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 5,
  },
  deleteButton: {
    fontSize: 20,
    color: "white",
    backgroundColor: "#c0d6df",
    color: "white",
    borderRadius: 10,
    padding: 5,
    margin: 5,
    width: 100,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flatList: {
    marginTop: 20,
    color: "white",
  },
  text: {
    fontSize: 20,
    color: "black",
  },
  title: {
    fontSize: 20,
    color: "black",
  },
  quiztitle: {
    fontSize: 26,
    color: "black",
  },
  editableTitle: {
    fontSize: 20,
    color: "black",
    borderRadius: 10,
    padding: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    left: 20,
    right: 20,
    top: 20,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    elevation: 50,
  },

  overlayTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  overlayImage: {
    width: "100%",
    height: 200, // Adjust as needed
    marginTop: 10,
  },
  markerStyle: {
    width: 30, // Regular marker size
    height: 30,
    backgroundColor: "black",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedMarkerStyle: {
    width: 30, // Larger size for selected marker
    height: 30,
    backgroundColor: "red",
    borderRadius: 15,
  },
  countdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  countdownLabel: {
    // Add your styling here
  },
  countdownDays: {
    // Add your styling here
  },
  // Add to your styles object
  weatherContainer: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 10,
  },
  logoutContainer: {
    flexDirection: "row", // Aligns children in a row
    justifyContent: "flex-end", // Aligns children to the right
    padding: 10, // Add some padding for aesthetic spacing
    width: "100%", // Ensure the container spans the full width
  },
  logoutButton: {
    backgroundColor: "#f0f0f0", // Light grey background
    padding: 5, // Add some padding to the button
    borderRadius: 5, // Round the corners slightly
  },
  correctOptionButton: {
    backgroundColor: "green",
  },
  incorrectOptionButton: {
    backgroundColor: "red",
  },
  optionText: {
    fontSize: 16,
    color: "#000", // Change this based on your preference
  },
  progressText: {
    fontSize: 16,
    marginBottom: 10,
  },
  quizbutton: {
    fontSize: 20,
    color: "white",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 3,
    margin: 5,
    height: 40,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 5,
  },
  nextButton: {
    float: "right",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#c0d6df",
    width: 200,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 5,
  },
  nextButtonText: {
    color: "black",
    fontSize: 16,
  },
});
