from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Server, User, Channel, Message, members, db
from app.forms import CreateServerForm


server_routes = Blueprint('servers', __name__)


@server_routes.route('/<int:user_id>')
@login_required
def getAllServers(user_id):
  servers = Server.query.filter_by(owner_id = user_id).all()
  return {'servers': [server.to_dict() for server in servers]}

@server_routes.route('/new', methods=["POST"])
@login_required
def createServer():
  form = CreateServerForm()
  data = request.get_json()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    server = Server(
        image=data['image'],
        owner_id =data['owner_id'],
        name=data['name'],

    )
    db.session.add(server)
    db.session.commit()
    return server.to_dict()
  else:
    return {"errors": ["Server name must be between 3 and 35 characters."]}
    

@server_routes.route('/<int:server_id>/edit', methods=['PATCH'])
@login_required
def updateServer(server_id):
    data = request.get_json()

    server = Server.query.get(server_id)
    server.name = data['name']
    server.image = data['image']
    server.owner_id = data['owner_id']

    db.session.commit()

    return server.to_dict()


@server_routes.route('/<int:server_id>/delete', methods=['DELETE'])
@login_required
def deleteServer(server_id):
  server = Server.query.get(server_id)
  db.session.delete(server)
  db.session.commit()

  return server.to_dict()