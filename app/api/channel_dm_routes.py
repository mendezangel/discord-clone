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
  print('INSIDE ROUTE:', data)
  if form.validate_on_submit():
    recipient_id = User.query.filter_by(name = data['recipient_name']).one()

    dm = DMChannel( recipient_id )
    db.session.add(dm)
    db.commit()

    channel = Channel(
      name = data['name'],
      server_id = data['server_id'],
      server2_id = dm['id']
    )
    db.session.add(channel)
    db.session.commit()

    return { 'channel': channel.to_dict(), 'dm': dm.to_dict() }
  else:
    return 'Validation'


@dm_routes.route('/')
@login_required
def getAllDMS():
  return None


@dm_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def deleteDM():
  return None