import { useState } from "react";

function InterviewSimulator() {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });
      const data = await res.json();
      setFeedback(data.feedback);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">Interview Simulator</h1>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your interview answer..."
        className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400"
      />

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Answer"}
      </button>

      {feedback && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <p className="font-semibold">
            Label: <span className={feedback.label === "POSITIVE" ? "text-green-600" : "text-red-600"}>
              {feedback.label}
            </span>
          </p>
          <p>Score: {(feedback.score * 100).toFixed(2)}%</p>
          <p className="italic text-gray-700">Suggestion: {feedback.suggestion}</p>
        </div>
      )}
    </div>
  );
}

export default InterviewSimulator;
