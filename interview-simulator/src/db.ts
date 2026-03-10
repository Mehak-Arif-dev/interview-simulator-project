import { ref, set, onValue } from "firebase/database";
import { db } from "./firebase";

// Write a question into Realtime Database
export async function addQuestion(id: string, question: string, type: string) {
  try {
    await set(ref(db, "questions/" + id), {
      question,
      type
    });
    console.log("Question added:", id);
  } catch (error) {
    console.error("Error writing to DB:", error);
  }
}

// Listen to all questions in realtime
export function listenToQuestions(callback: (data: any) => void) {
  const questionsRef = ref(db, "questions");
  onValue(questionsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}
// Save an answer for a specific user + question
export async function saveAnswer(userId: string, questionId: string, answer: string) {
  try {
    await set(ref(db, `answers/${userId}/${questionId}`), {
      answer,
      timestamp: Date.now()
    });
    console.log("Answer saved:", questionId);
  } catch (error) {
    console.error("Error saving answer:", error);
  }
}
