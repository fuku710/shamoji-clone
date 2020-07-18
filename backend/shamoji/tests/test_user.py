from flask import request
import pytest


def test_get_user(client, auth):
    access_token = auth.login().get_json()["access_token"]
    r = client.get("/user", headers={"authorization": "jwt {}".format(access_token)})
    assert r.status_code == 200
    assert r.get_json() == {"username": "test"}


def test_post_user(client):
    r = client.post("/register", json={"username": "newUser", "password": "password"})
    assert r.status_code == 201
    assert r.get_json() == {"username": "newUser"}


@pytest.mark.parametrize(
    ("username", "password"), [("", "password"), ("username", ""), ("usename", "pass")],
)
def test_post_invalid_user(client, username, password):
    r = client.post("/register", json={"username": username, "password": password})
    assert r.status_code == 422
