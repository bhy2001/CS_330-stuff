"""Flask app"""

from flask import  redirect, url_for, request, render_template
from config import app, db
from models import Manga, MangaSchema

@app.route("/")
def show_options():
    return render_template("base.html")

@app.route("/list")
def show_roster():
    manga = Manga.query.all()
    manga_schema = MangaSchema(many=True)
    return render_template("list.html", list=manga_schema.dump(manga))

@app.route("/add", methods=["GET", "POST"])
def show_admin_ui():
    if request.method == "GET":
        # display links to 3 options (country / region / continent)
        return render_template("add.html", text="")
    try:    
        newm = Manga(
            name = request.form.get("manga_name"),
            author= request.form.get("manga_author"),
            publisher = request.form.get("manga_publisher"),
            price = int(request.form.get("manga_price"))
        )
        db.session.add(newm)
        db.session.commit()
        return render_template('add.html', text=f"The manga {request.form.get('manga_name')} has been added to the store.")
    except:
        return render_template('add.html', text="Yo, something went wrong.")