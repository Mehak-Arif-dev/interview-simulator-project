from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/feedback', methods=['POST'])
def feedback():
    data = request.get_json()
    answer = data.get("answer", "")

    if not answer.strip():
        return jsonify({"feedback": "Please provide an answer to get feedback."})

    # Mock recruiter-style feedback (no OpenAI call)
    feedback_text = "Good start! Try adding more detail about your projects and achievements."
    return jsonify({"feedback": feedback_text})

if __name__ == '__main__':
    app.run(debug=True)
