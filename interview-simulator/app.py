from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Hugging Face ka sentiment analysis model load karo
nlp = pipeline("sentiment-analysis")

@app.route("/analyze", methods=["POST"])
def analyze_answer():
    data = request.json
    answer = data.get("answer", "")

    if not answer:
        return jsonify({"error": "No answer provided"}), 400

    # NLP analysis run karo
    result = nlp(answer)[0]

    feedback = {
        "label": result["label"],   # POSITIVE / NEGATIVE
        "score": result["score"],   # confidence
        "suggestion": "Try adding more detail about your skills." if result["label"] == "NEGATIVE" else "Good structure, keep it concise."
    }

    return jsonify({"feedback": feedback})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
