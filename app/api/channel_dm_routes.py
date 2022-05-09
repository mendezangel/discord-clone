from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Server, User, Channel, Message, members, db, DMChannel
from app.forms import CreateDMForm


dm_routes = Blueprint('dms', __name__)


@dm_routes.route('/new', methods=['POST'])
@login_required
def createDM():
  form = CreateDMForm()
  data = request.get_json()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    recipient_id = User.query.filter_by(username = data['recipient_name']).one()
    recipient_id = recipient_id.to_dict()['me_server']
    dm = DMChannel( recipient_server_id = recipient_id )
    db.session.add(dm)
    db.session.commit()

    channel = Channel(
      name = data['name'],
      server_id = data['server_id'],
      server2_id = dm.id
    )
    db.session.add(channel)
    db.session.commit()

    return { 'channel': channel.to_dict(), 'dm': dm.to_dict() }
  else:
    return {'errors': form.errors}


@dm_routes.route('/')
@login_required
def getAllDMS():
  # GET ALL DM CHANNELS
    # GET ALL DM CHANNELS WHERE USER IS SENDER
  dm_channels = Channel.query.filter(Channel.server2_id.isnot(None)).all()
  dm_channels = [channel.to_dict() for channel in dm_channels]
  dmChannels  = DMChannel.query.all()
  dmChannels  = [channel.to_dict() for channel in dmChannels]

  # print(f'\n\n\n{dm_channels} + {dmChannels}\n\n\n')

  return {'channels': dm_channels, 'dms': dmChannels}


@dm_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def deleteDM(id):
  channel_id = request.get_json()
  channel = Channel.query.get(id)
  db.session.delete(channel)
  db.session.commit()

  return channel.to_dict()