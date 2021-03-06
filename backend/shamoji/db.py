from flask_sqlalchemy import SQLAlchemy
from flask.cli import with_appcontext
import click

db = SQLAlchemy()


@click.command("init-db")
@with_appcontext
def init_db_command():
    """Initialize the database"""
    db.create_all()
    click.echo("Initilized the database")

@click.command("reset-db")
@with_appcontext
def reset_db_command():
    """Reset the database"""
    db.drop_all()
    db.create_all()
    click.echo("Reset the database")
