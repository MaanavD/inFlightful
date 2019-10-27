import json
from flask import Flask, request, jsonify
from sentiment import SentimentAnalyzer

app = Flask(__name__)

@app.route("/sentiment", methods=['POST'])
def count_sentiment():
    data = json.loads(request.get_data().decode('utf-8'))

    analyzer = SentimentAnalyzer()
    return jsonify(analyzer.analyze(data["tweet"]))

if __name__ == "__main__":
    app.run(debug=True)
