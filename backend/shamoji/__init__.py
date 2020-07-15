from flask import Flask, jsonify
from flask_restful import Api
from flask_jwt import JWT
from datetime import timedelta

from shamoji.auth import authenticate, identity
from shamoji.resources.emoji import Emoji, Emojis
from shamoji.resources.user import UserRegister


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///shamoji.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_EXPIRATION_DELTA"] = timedelta(seconds=86400)
    app.config["SECRET_KEY"] = "secret"

    jwt = JWT(app, authenticate, identity)

    @app.route("/")
    def index():
        return jsonify({"message": "shamoji api"})

    api = Api(app)
    api.add_resource(Emoji, "/emoji/<int:_id>")
    api.add_resource(Emojis, "/emojis")
    api.add_resource(UserRegister, "/register")

    from shamoji.db import db, init_db_command

    db.init_app(app)
    app.cli.add_command(init_db_command)

    return app
