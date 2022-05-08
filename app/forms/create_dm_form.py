from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email, Length 
from app.models import User

class CreateDMForm(FlaskForm):
    recipient_name = StringField('recipient', validators=[DataRequired(message="Please Provide <username#number>"), Length(min=4)])