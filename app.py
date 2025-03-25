from flask import Flask, request, jsonify
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Frontend-Backend একসাথে কাজ করার জন্য

# OpenAI API Key (তোমার API Key এখানে বসাও)
openai.api_key = "YOUR_OPENAI_API_KEY"

@app.route('/generate', methods=['POST'])
def generate_prompt():
    data = request.json
    subject = data.get("subject", "")

    prompt = f"Generate a detailed artistic AI image prompt for {subject}."

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": prompt}]
    )

    return jsonify({"prompt": response["choices"][0]["message"]["content"]})

if __name__ == '__main__':
    app.run(debug=True)
