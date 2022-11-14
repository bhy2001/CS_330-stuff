#!/usr/bin/env python3
"""
jokes api
"""

import json
from flask import Flask, Response, jsonify
import pyjokes

app = Flask(__name__)


# jokes/es/neutral/5
@app.route("/api/v1/jokes/<string:lang>/<string:category>/<int:number>",
           methods=['GET'])
def get_joke(lang, category, number):
    try:
        joke_list = pyjokes.get_jokes(category, lang)
        res_list = joke_list[:number]
        res = jsonify(res_list)
        return res

    except Exception as error:
        return jsonify({"error": "Bad request. " + str(error)}), 404


@app.route("/api/v1/jokes/<string:lang>/<string:category>/1/<int:id>",
           methods=['GET'])
def get_joke_with_id(lang, category, number):
    try:
        res_joke = pyjokes.get_jokes(category, lang)[id]
        res = Response(json.dumps({"joke": res_joke}))
        res.headers["Access-Control-Allow-Origin"] = "*"
        res.headers["Content-Type"] = "application/json"
        return res
    except Exception as error:
        return jsonify({"error": "Bad request. " + str(error)}), 404


if __name__ == "__main__":
    app.run("0.0.0.0")
