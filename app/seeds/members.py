from app.models import db, members

def seed_members():
    demo = members.insert().values(server_id =1,user_id= 1)
    marnie = members.insert().values(server_id =2,user_id= 2)
    bobbie = members.insert().values(server_id =3,user_id= 3)

    db.engine.execute(demo)
    db.engine.execute(marnie)
    db.engine.execute(bobbie)
    db.session.commit()
