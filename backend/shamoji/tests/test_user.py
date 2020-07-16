from flask import request


def test_get_user(client, auth):
    access_token = auth.login().get_json()["access_token"]
    r = client.get("/user", headers={"authorization": "jwt {}".format(access_token)})
    assert r.status_code == 200
    assert r.get_json() == {"username": "test"}


def test_post_user(client, auth):
    r = client.post("/register", json={"username": "newUser", "password": "password"})
    assert r.status_code == 201
    assert r.get_json() == {"username": "newUser"}

