from .db import db

# class Friend(db.Model):
#     __tablename__= 'friends'

#     id = db.Column(db.Integer, primary_key=True)
#     sender_id = db.Column(db.Integer, nullable=False)
#     recipient_id = db.Column(db.Integer, nullable=False)


friend = db.Table(
    'friends',
    db.Column('sender_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('recipient_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)
