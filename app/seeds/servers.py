from app.models import db, Server


def seed_servers():
    demo_server= Server(name='@me', image='https://discord-imgs.s3.us-east-2.amazonaws.com/5-discord.png', owner_id=1)
    marnie_server= Server(name='@me', image='https://discord-imgs.s3.us-east-2.amazonaws.com/5-discord.png', owner_id=2)
    bobbie_server= Server(name='@me', image='https://discord-imgs.s3.us-east-2.amazonaws.com/5-discord.png', owner_id=3)


    db.session.add(demo_server)
    db.session.add(marnie_server)
    db.session.add(bobbie_server)

    db.session.commit()
