from flask_socketio import SocketIO, emit, join_room, leave_room,send
import os

socketio = SocketIO()

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://strife-app.herokuapp.com",
        "https://strife-app.herokuapp.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("chat")
def handle_chat(data):
    emit('chat', data, broadcast=False, to=data['room'])
    # send(data, room=data['room'])

@socketio.on('leave')
def handle_leave(data):
    leave_room(data['room'])

@socketio.on('join')
def handle_join(data):
    join_room(data['room'])
