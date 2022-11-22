"""Building the DB"""

import csv
import os
from config import db
from models import Manga


def build_db(filename):
    # Delete existing DB
    if os.path.exists(f"{filename}.sqlite3"):
        os.remove(f"{filename}.sqlite3")

    # Create DB structure
    db.create_all()

    # # Add data to the DB
    with open("for-population.csv") as f:
        content = csv.reader(f)
        next(content)
    
        for line in content:
            title = Manga(
                name = line[0],
                author = line[1],
                publisher = line[2],
                price = line[3]
            )
            db.session.add(title)
        db.session.commit()


def main():
    build_db("manga")

if __name__ == "__main__":
    main()
