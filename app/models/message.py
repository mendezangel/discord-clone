from .db import db
from datetime import datetime

class Message(db.Model):
    __tablename__= 'messages'


    id = db.Column(db.Integer, primary_key=True)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    channel = db.relationship('Channel', back_populates='messages')
    user = db.relationship('User', back_populates='messages')

    def to_dict(self):
        return {
            'id':self.id,
            'channel_id': self.channel_id,
            'user_id': self.user_id,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            # 'channel': list(self.channel),
            # 'user': list(self.user)
        }
