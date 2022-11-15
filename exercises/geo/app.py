import pathlib
import sqlite3
import requests
from flask import Flask, request, render_template, send_from_directory
from flask import redirect, url_for
import records

app = Flask(__name__)

CACHE = {}


def get_data_from_db(query: str) -> list:
    """retrieve data from the database and return to the user"""
    # raise NotImplementedError
    result = set()
    # if not pathlib.Path("world.sqlite3").exists():
    #     db_path = pathlib.Path('exercises/geo/world.sqlite3')
    #     local_connect = sqlite3.connect(db_path)
    # else:
    #     local_connect = sqlite3.connect("world.sqlite3")
    if __name__ == "app":
        db_path = '.'
    else:
        db_path = 'exercises/geo'
    with sqlite3.connect(
        pathlib.Path(db_path) / pathlib.Path("world.sqlite3")
    ) as local_connect:
        local_cur = local_connect.cursor()
        local_table = query
        if local_table:
            local_cur.execute(query)
        else:
            return result.append({'Error': "table name not in database"})
        for i in local_cur:
            result.add(i)
        result = list(result)
        result.sort()
        local_cur.close()
        return result


@app.route("/", methods=["GET", "POST"])
def index():
    global CACHE
    if request.method == "GET":
        # display links to 3 options (country / region / continent)
        return render_template("base.html")
    # retrieve data from the database based on the selected option and present
    # it to the user
    if request.form.get("country"):
        country = request.form.get("country")
        if country in CACHE:
            result = CACHE[country]
        else:
            query = f"select name, continent, region, capital, surfacearea, population, governmentform, headofstate from country where code = '{country}'"
            result = get_data_from_db(query)
            CACHE[country] = result
        return render_template("index.html", rows=result)
    if request.form.get("region"):
        region = request.form.get("region")
        if region in CACHE:
            result = CACHE[region]
        else:
            query = f"select name, continent, region, capital, surfacearea, population, governmentform, headofstate from country where region = '{region}'"
            result = get_data_from_db(query)
            CACHE[region] = result
        return render_template("index.html", rows=result)
    if request.form.get("continent"):
        continent = request.form.get("continent")
        if continent in CACHE:
            result = CACHE[continent]
        else:
            query = f"select name, continent, region, capital, surfacearea, population, governmentform, headofstate from country where continent = '{continent}'"
            result = get_data_from_db(query)
            CACHE[continent] = result
        return render_template("index.html", rows=result)
    raise NotImplementedError


@app.route("/<string:scope>")
def search(scope: str):
    if scope == "country":
        # get countries from the database and populate options
        # of the drop-down menu
        query = "select code, name from country"
        country_list = get_data_from_db(query)
        return render_template("country.html", options=country_list)
        raise NotImplementedError
    elif scope == "region":
        # get regions from the database and populate options
        # of the drop-down menu
        query = "select region from country"
        country_list = get_data_from_db(query)
        return render_template("region.html", options=country_list)
        raise NotImplementedError
    elif scope == "continent":
        # get continents from the database and populate options
        # of the drop-down menu
        query = "select continent from country"
        country_list = get_data_from_db(query)
        return render_template("continent.html", options=country_list)
        raise NotImplementedError


if __name__ == "__main__":
    app.run()
