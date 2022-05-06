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
    print(f'\n\n\n\n{dm.to_dict()}\n\n\n\n')

    channel = Channel(
      name = data['name'],
      server_id = data['server_id'],
      server2_id = dm.id
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