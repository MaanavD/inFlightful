import json
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/", methods=['POST'])
def entry():
    data = json.loads(request.get_data().decode('utf-8'))
    response = {}
    return jsonify(response)