from sre_constants import CH_LOCALE
from app.models import db, Channel


def seed_channels():
    leaf_general = Channel(name='General', server_id=22)
    leaf_anbu = Channel(name='anbu black ops',server_id=22)
    leaf_genin = Channel(name='genin chat',server_id=22)
    leaf_chunin = Channel(name='chunin chat',server_id=22)
    leaf_jonin = Channel(name='jonin chat',server_id=22)
    aa_general = Channel(name='General', server_id=23)
    aa_study = Channel(name='study chat',server_id=23)
    aa_cheating = Channel(name='cheating',server_id=23)
    group_general = Channel(name='General', server_id=24)
    group_resources = Channel(name='resources',server_id=24)
    test_general = Channel(name='General', server_id=25)

    db.session.add(leaf_general)
    db.session.add(leaf_anbu)
    db.session.add(leaf_chunin)
    db.session.add(leaf_genin)
    db.session.add(leaf_jonin)
    db.session.add(aa_general)
    db.session.add(aa_study)
    db.session.add(aa_cheating)
    db.session.add(group_general)
    db.session.add(group_resources)
    db.session.add(test_general)

    db.session.commit()
