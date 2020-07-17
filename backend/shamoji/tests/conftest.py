import os
import tempfile

import pytest
from shamoji import create_app
from shamoji.db import db


@pytest.fixture
def app():
    app = create_app()

    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"

    with app.app_context():
        db.create_all()

        from shamoji.models.user import UserModel
        from shamoji.models.emoji import EmojiModel

        test_user = UserModel("test", "test")
        test_user.save()
        test_emoji = EmojiModel("test_emoji1", test_user.id, "data:image/jpg;base64,hogehoge")
        test_emoji.save()

    yield app

    with app.app_context():
        db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()


class AuthActions(object):
    def __init__(self, client):
        self._client = client

    def login(self, username="test", password="test"):
        return self._client.post(
            "/auth", json={"username": username, "password": password}
        )


@pytest.fixture
def auth(client):
    return AuthActions(client)

