from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Server, User, Channel, Message, members, db
from app.forms import CreateServerForm


server_routes = Blueprint('servers', __name__)


@server_routes.route('/<int:user_id>')
@login_required
def getAllServers(user_id):
  servers = Server.query.join(members).filter(members.c.user_id == user_id).all()
  print(servers, '-------------------------------------------------------------')
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

    new_member = members.insert().values(server_id=server.id, user_id= server.owner_id)

    db.engine.execute(new_member)
    db.session.commit()

    gen_channel = Channel(name='General', server_id=server.id)

    db.session.add(gen_channel)
    db.session.commit()

    return server.to_dict()
  else:
    return {"errors": ["Server name must be between 3 and 35 characters."]}


@server_routes.route('/edit', methods=['PATCH'])
@login_required
def updateServer():
    data = request.get_json()
    server = Server.query.get(data['id'])
    server.name = data['name']
    server.image = data['image']
    # server.invite_url = data['invite_url']
    server.owner_id = data['owner_id']

    db.session.commit()

    return server.to_dict()


@server_routes.route('/delete', methods=['DELETE'])
@login_required
def deleteServer():
  id = request.get_json()
  server = Server.query.get(id)
  db.session.delete(server)
  db.session.commit()

  return server.to_dict()
