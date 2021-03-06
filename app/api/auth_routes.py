from flask import Blueprint, jsonify, redirect, session, request
from app.models import User, db, Server, members
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from random import randint

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = [error]
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username']+'#'+str(randint(1000, 10000)),
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()

        server = Server(
          owner_id=user.id,
          name='@me',
          image='https://discord-imgs.s3.us-east-2.amazonaws.com/discord-server.png',
          invite_url=None
        )
        user.profile_pic = f'https://discord-imgs.s3.us-east-2.amazonaws.com/{int(user.username[-4:])%6}-discord.png'
        db.session.add(server)
        db.session.commit()

        user.me_server = server.id
        db.session.commit()

        new_member = members.insert().values(server_id =server.id,user_id= user.id)

        db.engine.execute(new_member)
        db.session.commit()

        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
