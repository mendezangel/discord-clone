from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='Demo#0001', email='demo@aa.io', password='password', me_server=1, profile_pic='https://discord-imgs.s3.us-east-2.amazonaws.com/1-discord.png' )
    marnie = User(username='marnie#0001', email='marnie@aa.io', password='password', me_server=2, profile_pic='https://discord-imgs.s3.us-east-2.amazonaws.com/2-discord.png')
    bobbie = User(username='bobbie#0001', email='bobbie@aa.io', password='password', me_server=3, profile_pic='https://discord-imgs.s3.us-east-2.amazonaws.com/3-discord.png')
    ali = User(username='ali#6980',email='ali@aa.io',password='password',me_server=4,profile_pic='https://discord-imgs.s3.us-east-2.amazonaws.com/0-discord.png')
    tristan = User(username='tristan#8901',email='tristan@aa.io',password='password',me_server=5,profile_pic='https://discord-imgs.s3.us-east-2.amazonaws.com/1-discord.png')
    edwin = User(username='edwin#1771', email='edwin@aa.io', password='password', me_server=6, profile_pic='https://discord-imgs.s3.us-east-2.amazonaws.com/2-discord.png')
    angel = User(username='angel#1204',email='angel@aa.io',password='password',me_server=7,profile_pic='https://discord-imgs.s3.us-east-2.amazonaws.com/3-discord.png')
    brad = User(username='brad#7492',email='brad@aa.io',password='password',me_server=8,profile_pic='https://discord-imgs.s3.us-east-2.amazonaws.com/4-discord.png')
    leah = User(username='leah#4112',email='leah@aa.io',password='password',me_server=9,profile_pic='https://discord-imgs.s3.us-east-2.amazonaws.com/1-discord.png')
    jeff = User(username='jeff#4200',email='jeff@aa.io',password='password',me_server=10,profile_pic='https://discord-imgs.s3.us-east-2.amazonaws.com/2-discord.png')
    john = User(username='john#0155',email='john@aa.io',password='password',me_server=11,profile_pic='https://discord-imgs.s3.us-east-2.amazonaws.com/3-discord.png')
    chris = User(username='chris#6996',email='chris@aa.io',password='password',me_server=12,profile_pic='https://discord-imgs.s3.us-east-2.amazonaws.com/4-discord.png')
    naruto = User(username='naruto#1010',email='naruto@aa.io',password='password',me_server=13,profile_pic='https://i.pinimg.com/550x/a7/5e/9e/a75e9e35a8ed1ccc1017db40438c60e9.jpg')
    sasuke = User(username='sasuke#9999',email='sasuke@aa.io',password='password',me_server=14,profile_pic='https://i.pinimg.com/736x/5a/4b/5a/5a4b5aa79d2a05a5c4964057dc013487.jpg')
    sakura = User(username='sakura#1230',email='sakura@aa.io',password='password',me_server=15,profile_pic='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBTrxlgzyISup_1lwpLCsKOXeYoNfRrPJ5vbZgCJocXr8ld5plgZRYvqnZQRyyTbhYrAw&usqp=CAU')



    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(ali)
    db.session.add(tristan)
    db.session.add(edwin)
    db.session.add(angel)
    db.session.add(brad)
    db.session.add(leah)
    db.session.add(jeff)
    db.session.add(john)
    db.session.add(chris)
    db.session.add(naruto)
    db.session.add(sasuke)
    db.session.add(sakura)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
