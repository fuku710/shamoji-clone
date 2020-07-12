from flask import Flask
from flask_restful import Api
from flask_jwt import JWT
from datetime import timedelta

from shamoji.db import db, init_db_command
from shamoji.auth import authenticate, identity
from shamoji.resources.emoji import Emoji, EmojiList
from shamoji.resources.user import UserRegister


def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shamoji.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_EXPIRATION_DELTA'] = timedelta(seconds=86400)
    app.config['SECRET_KEY'] = 'secret'

    jwt = JWT(app, authenticate, identity)

    api = Api(app)
    api.add_resource(Emoji, '/emoji/<string:name>')
    api.add_resource(EmojiList, '/emojis')
    api.add_resource(UserRegister, '/register')

    app.cli.add_command(init_db_command)

    db.init_app(app)

    return app
