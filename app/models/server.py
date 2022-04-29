from .db import db
from .member import members

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer,db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    image = db.Column(db.String)
    invite_url = db.Column(db.String, nullable=False, unique=True)

    channels = db.relationship('Channel', back_populates='server')
    owner = db.relationship('User', back_populates='owned_servers')

    users = db.relationship('User', back_populates='servers', secondary=members)

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'image': self.image,
            'invite_url': self.invite_url,
            'channels': [channel.to_dict() for channel in self.channels],
            'owner': list(self.owner)
        }
