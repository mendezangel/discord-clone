from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, Length 
from app.models import User

class EditChannelForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=3, max=35)])