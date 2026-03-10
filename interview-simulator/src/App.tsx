import React, { useState, useEffect } from "react";
import Login from "./Login"; // Login.tsx component

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [question, setQuestion] = useState("intro");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setFeedback(data.feedback || "No feedback received.");
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setFeedback("Something went wrong. Please check backend logs.");
    }
  };

  // Save last answer + feedback
  useEffect(() => {
    if (feedback) {
      localStorage.setItem("lastAnswer", answer);
      localStorage.setItem("lastFeedback", feedback);
    }
  }, [feedback]);

  if (!user) {
    // Agar user login nahi hai to Login screen show hogi
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Login onLogin={(u) => setUser(u)} />
      </div>
    );
  }

  // Agar user login hai to Interview Simulator show hoga
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome, {user}! Interview Simulator
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Practice recruiter-style interviews with instant feedback.
        </p>

        {/* Dropdown for questions */}
        <select
          className="w-full border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        >
          <option value="intro">Tell me about yourself</option>
          <option value="strengths">What are your strengths?</option>
          <option value="projects">Describe a project you worked on</option>
        </select>

        {/* Input Area */}
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          rows={4}
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit Answer
        </button>

        {/* Feedback Box */}
        {feedback && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h2 className="text-lg font-semibold text-green-700 mb-2">
              Feedback
            </h2>
            <p className="text-green-600">{feedback}</p>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("user");
            setUser(null);
          }}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default App;
