from .db import db
from .member import members
from .server import Server
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    me_server = db.Column(db.Integer, unique=True)
    profile_pic = db.Column(db.String)


    messages = db.relationship('Message', back_populates='user')
    owned_servers = db.relationship('Server', back_populates='owner')

    # friends = db.Relationship('User', back_populates='friends', secondary='friends')

    servers = db.relationship('Server', back_populates='users', secondary=members)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
