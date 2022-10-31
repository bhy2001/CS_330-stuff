#!/usr/bin/env python3
"""Flask application to use `pyjokes`"""

import random
from typing import List

import pyjokes
from flask import Flask, render_template, request

app = Flask(__name__)

langs = ["en", "de", "es"]
cats = ["neutral", "chuck", "all"]
nums = [1, 5, 10]


@app.route("/", methods=["GET"])
def index():
    """Render the template with form"""
    return render_template("base.html", lang=langs, cat=cats, num=nums)
    # raise NotImplementedError


@app.route("/", methods=["POST"])
def index_jokes():
    """Render the template with jokes"""
    category = request.form.get("category")
    language = request.form.get("language")
    number = request.form.get("number")
    if number:
        number = int(number)
    generated_jokeslist = send_joke(language, category, number)
    return render_template("jokes.html", jokes_list=generated_jokeslist)
    # raise NotImplementedError


def send_joke(
    language: str = "en", category: str = "all", number: int = 1
) -> List[str]:
    """Return a list of jokes"""
    jokes = []
    if not number:
        number=1
    if (language == "de" and category == "all" and number > 146):
        number = 146
    if (language == "en" and category == "chuck" and number > 103):
        number = 103
    if (language == "es" and category == "neutral" and number > 14):
        number = 14
    if category == "chuck" and language == "es":
        message = 'No kidding!'
        jokes.append(message)
        return jokes
    else:
        if number:
            for index in range(number):
                joke_i = pyjokes.get_joke(language, category)
                jokes.append(joke_i)
        else:
            number = 1
            for index in range(number):
                joke_i = pyjokes.get_joke(language, category)
                jokes.append(joke_i)
            # jokes = pyjokes.get_jokes(language, category)
        return jokes
        # raise NotImplementedError
