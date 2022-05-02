from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Server, User, Channel, Message, members

server_routes = Blueprint('servers', __name__)

@server_routes.route('/<int:user_id>')
@login_required
def getAllServers(user_id):
    servers = User.query.join(members).filter(members.user_id == user_id).all()
    return {'servers': [server.to_dict() for server in servers]}


