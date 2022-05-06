from flask import Blueprint, request
from app.models import User, db, Server, members, Message


message_routes = Blueprint('messages', __name__)

@message_routes.route('/new', methods=['POST'])
def post_message():
    data = request.get_json()
    newMessage = Message(
        channel_id= data['channel_id'],
        user_id= data['user_id'],
        content= data['content']
    )
    db.session.add(newMessage)
    db.session.commit()
    return newMessage.to_dict()

@message_routes.route('/<int:channel_id>/all')
def get_messages(channel_id):
  messages = Message.query.filter_by(channel_id = channel_id).all()
  return {"messages": [message.to_dict() for message in messages], "channel_id": channel_id}
