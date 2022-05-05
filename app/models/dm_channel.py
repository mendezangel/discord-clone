from .db import db

class DMChannel(db.Model):
  __tablename__ = 'dmChannels'

  id = db.Column(db.Integer, primary_key=True)
  recipient_server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)

  channel = db.relationship('Channel', back_populates='dmChannel')
  server = db.relationship('Server', back_populates='dmChannel')

  def to_dict(self):
    return {
      'id': self.id,
      'recipient_server_id': self.recipient_server_id,
      # 'server': [serv.to_dict() for serv in server],
      # 'channel': [chan.to_dict() for chan in channel]
    }
