import json
from flask import Flask, request, jsonify
from sentiment import SentimentAnalyzer

app = Flask(__name__)

@app.route("/text_analysis", methods=['POST'])
def entry():
    data = json.loads(request.get_data().decode('utf-8'))

    analyzer = SentimentAnalyzer()
    sentiment = analyzer.analyze(data["content"])

    response = {"content": data["content"], "sentiment": 0}
    if sentiment["magnitude"] < 1.0:
        pass
    elif sentiment["score"] > 0.2:
        response["sentiment"] = 3
    elif sentiment["score"] < -0.2:
        response["sentiment"] = 1
    else:
        response["sentiment"] = 2

    print("--- text_analysis ---")
    print(sentiment["content"])
    print("score: ", sentiment["score"], "\tmagnitude: ", sentiment["magnitude"], "\tsentiment:", response["sentiment"])

    return jsonify(response)
