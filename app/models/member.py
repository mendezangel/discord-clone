from .db import db

class Member(db.Model):
    __tablename__ = 'members'


    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable= False)
