from .db import db

class Channel(db.Model):
    __tablename__= 'channels'


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    server_id = db.Column(db.Integer,db.ForeignKey('servers.id') ,nullable=False)
    server2_id = db.Column(db.Integer, db.ForeignKey('dmChannels.id'))

    messages = db.relationship('Message', back_populates='channel', cascade='all, delete')
    
    server = db.relationship('Server', back_populates='channels')
    dmChannel = db.relationship('DMChannel', back_populates='channel', cascade='all, delete')



    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'server_id': self.server_id,
            'server2_id': self.server2_id,
            'messages': [message.to_dict() for message in self.messages]
        }
