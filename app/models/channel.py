from .db import db

class Channel(db.Model):
    __tablename__= 'channels'


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    server_id = db.Column(db.Integer,db.ForeignKey('servers.id') ,nullable=False)
    # server2_id = db.Column(db.Integer, db.ForeignKey('servers.id'))

    messages = db.relationship('Message', back_populates='channel', cascade='all, delete')
    server = db.relationship('Server', back_populates='channels')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'server_id': self.server_id,
            # 'server2_id': self.server2_id,
            'messages': [message.to_dict() for message in self.messages],
            'server': [server.to_dict() for server in self.server]
        }
