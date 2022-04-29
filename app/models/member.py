from .db import db

# class Member(db.Model):
#     __tablename__ = 'members'


#     id = db.Column(db.Integer, primary_key=True)
#     server_id = db.Column(db.Integer, nullable=False)
#     user_id = db.Column(db.Integer, nullable= False)

members = db.Table(
    'members',
    db.Column('server_id', db.ForeignKey('servers.id'), primary_key=True),
    db.Column('user_id', db.ForeignKey('users.id'), primary_key=True)
)
