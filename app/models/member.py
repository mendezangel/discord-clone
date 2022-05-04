from .db import db

members = db.Table(
    'members',
    db.Column('server_id', db.ForeignKey('servers.id'), primary_key=True),
    db.Column('user_id', db.ForeignKey('users.id'), primary_key=True)
)
