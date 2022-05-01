from flask import Blueprint
from app.models import User, db, Server, members

server_routes = Blueprint('servers', __name__)

