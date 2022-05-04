from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Server, User, Channel, Message, members, db
from app.forms import CreateChannelForm


channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/new', methods=['POST'])
@login_required
def createChannel():
  form = CreateChannelForm()
  data = request.get_json()
  print('------------------', data)
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    channel = Channel(
      name = data['name'],
      server_id = data['server_id'],
    )
    db.session.add(channel)
    db.session.commit()

    return channel.to_dict()
  else:
    return 'Validation'

# @channel_routes.route('/<int:server_id>')
# @login_required
# def getAllChannels():
#   channels = Channel.query.filter_by(server_id = ???).all()
#   return {'channels': [channel.to_dict() for channel in channels]}

@channel_routes.route('/<int:id>/edit')
@login_required
def editChannel(id):
  data = request.get_json()

  channel = Channel.query.get(id)
  channel.name = data['name']

  db.session.commit()

  return channel.to_dict()


@channel_routes.route('/<int:id>/delete')
@login_required
def delChannel(id):
  channel = Channel.query.get(id)
  db.session.delete(channel)

  return channel.to_dict()
