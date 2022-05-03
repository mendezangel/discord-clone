from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo#0001', email='demo@aa.io', password='password', me_server=1, profile_pic='https://discord-imgs.s3.us-east-2.amazonaws.com/1-discord.png' )
    marnie = User(
        username='marnie#0001', email='marnie@aa.io', password='password', me_server=2, profile_pic='https://discord-imgs.s3.us-east-2.amazonaws.com/2-discord.png')
    bobbie = User(
        username='bobbie#0001', email='bobbie@aa.io', password='password', me_server=3, profile_pic='https://discord-imgs.s3.us-east-2.amazonaws.com/3-discord.png')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
