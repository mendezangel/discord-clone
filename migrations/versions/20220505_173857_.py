"""empty message

Revision ID: 0c7ab275682b
Revises: 1aee5bbe5d73
Create Date: 2022-05-05 17:38:57.140886

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0c7ab275682b'
down_revision = '1aee5bbe5d73'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('dmChannels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('recipient_server_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['recipient_server_id'], ['servers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('channels', sa.Column('server2_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'channels', 'dmChannels', ['server2_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'channels', type_='foreignkey')
    op.drop_column('channels', 'server2_id')
    op.drop_table('dmChannels')
    # ### end Alembic commands ###
