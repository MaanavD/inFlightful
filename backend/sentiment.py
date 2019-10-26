from google.cloud import language_v1
from google.cloud.language_v1 import enums

class SentimentAnalyzer():
    def __init__(self):
        self.client = language_v1.LanguageServiceClient()
        self.type = enums.Document.Type.PLAIN_TEXT
        self.language = "en"
        self.encoding_type = enums.EncodingType.UTF8

    def analyze(self, content):
        document = {
            "content": content,
            "type": self.type,
            "language": self.language
        }
        response = self.client.analyze_sentiment(document, encoding_type=self.encoding_type)
        return {
            "content": content,
            "score": response["document_sentiment"]["score"],
            "magnitude": response["document_sentiment"]["magnitude"]
        }
