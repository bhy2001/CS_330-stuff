"""Data model"""

from config import db, mm

class Manga(db.Model):
    __tablename__ = "MANGA"
    name = db.Column(db.String, primary_key=True)
    author = db.Column(db.String)
    publisher = db.Column(db.String)
    price = db.Column(db.Integer)


class MangaSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = Manga
        load_instance = True
