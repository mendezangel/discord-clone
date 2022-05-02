from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Server, User, Channel, Message, members, db
from app.forms import CreateServerForm

server_routes = Blueprint('servers', __name__)

@server_routes.route('/<int:user_id>')
@login_required
def getAllServers(user_id):
    servers = User.query.join(members).filter(members.user_id == user_id).all()
    return {'servers': [server.to_dict() for server in servers]}

@server_routes.route('/new')
@login_required
def createServer(owner_id):
   form = CreateServerForm()
   if form.validate_on_submit():
        server = Server(
            image=form.data['image'],
            owner_id = owner_id,
            name=form.data['name'],

        )
        db.session.add(server)
        db.session.commit()


@server_routes.route('/<int:server_id>')
@login_required
