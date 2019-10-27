import json
from flask import Flask, request, jsonify
from sentiment import SentimentAnalyzer

from scraper import TwitterScraper

app = Flask(__name__)

@app.route("/sentiment", methods=['POST'])
def count_sentiment():
    data = json.loads(request.get_data().decode('utf-8'))

    analyzer = SentimentAnalyzer()
    return jsonify(analyzer.analyze(data["tweet"]))

@app.route("/jetblue", methods=['GET'])
def jetblue():
    scraper = TwitterScraper()
    analyzer = SentimentAnalyzer()

    response = scraper.scrape("jetblue")

    response["airline"] = "jetblue"
    response["analysis"] = analyzer.analyze(response["tweet"])
    
    return jsonify(response)

@app.route("/aircanada", methods=['GET'])
def aircanada():
    scraper = TwitterScraper()
    analyzer = SentimentAnalyzer()

    response = scraper.scrape("air canada")

    response["airline"] = "aircanada"
    response["analysis"] = analyzer.analyze(response["tweet"])
    
    return jsonify(response)

@app.route("/westjet", methods=['GET'])
def westjet():
    scraper = TwitterScraper()
    analyzer = SentimentAnalyzer()

    response = scraper.scrape("westjet")

    response["airline"] = "westjet"
    response["analysis"] = analyzer.analyze(response["tweet"])
    
    return jsonify(response)
    
if __name__ == "__main__":
    app.run(debug=True)
