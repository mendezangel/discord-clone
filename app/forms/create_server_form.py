from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email, Length, URL, Optional
from app.models import User

class CreateServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=3, max=35)])
    image = StringField('image', validators=[Optional(), URL(message='Please provide a valid URL.')])

