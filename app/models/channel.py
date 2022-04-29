from .db import db

class Channel(db.Model):
    __tablename__= 'channels'


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    server_id = db.Column(db.Integer, nullable=False)
    server2_id = db.Column(db.Integer)

    messages = db.Relationship('Message', back_populates='channel')
