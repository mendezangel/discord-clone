from flask_socketio import SocketIO, emit
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
    emit("chat", data, broadcast=True)
