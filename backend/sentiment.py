from google.cloud import language_v1
from google.cloud.language_v1 import enums

class SentimentAnalyzer():
    def __init__(self):
        self.client = language_v1.LanguageServiceClient()
        self.type = enums.Document.Type.PLAIN_TEXT
        self.language = "en"
        self.encoding_type = enums.EncodingType.UTF8

    def analyze(self, text):
        document = {
            "content": text,
            "type": self.type,
            "language": self.language
        }
        response = self.client.analyze_sentiment(document, encoding_type=self.encoding_type)
        response = {
            "score": response.document_sentiment.score,
            "magnitude": response.document_sentiment.magnitude
        }

        if response["magnitude"] < 0.075:
            response["sentiment"] = 0
        elif response["score"] > 0.2:
            response["sentiment"] = 3
        elif response["score"] < -0.2:
            response["sentiment"] = 1
        else:
            response["sentiment"] = 2

        return response
