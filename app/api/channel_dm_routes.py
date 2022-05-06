from crypt import methods
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Server, User, Channel, Message, members, db, DMChannel
from app.forms import CreateDMForm


dm_routes = Blueprint('dms', __name__)


@dm_routes.route('/new', methods=['POST'])
@login_required
def createDM():


@dm_routes.route('/')
@login_required
def getAllDMS():


@dm_routes.route('/new', methods=['POST'])
@login_required
def deleteDM():