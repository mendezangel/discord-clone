from enum import unique
from .db import db

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(30), nullable=False)
    image = db.Column(db.String)
    invite_url = db.Column(db.String, nullable=False, unique=True)
