from flask import request


def test_get_emojis(client):
    r = client.get("/emojis")
    assert r.status_code == 200
    assert r.get_json() == {
        "emojis": [{"name": "test_emoji", "user": "test", "imageBase64": "abcde"}]
    }


def test_post_emoji(client, auth):
    access_token = auth.login().get_json()["access_token"]
    r = client.post(
        "/emojis",
        json={"name": "sample", "imageBase64": "hoge"},
        headers={"authorization": "jwt {}".format(access_token)},
    )
    assert r.status_code == 201
    assert r.get_json() == {"name": "sample", "imageBase64": "hoge", "user": "test"}


def test_get_emoji(client):
    r = client.get("/emoji/1")
    assert r.status_code == 200
    assert r.get_json() == {
        "name": "test_emoji",
        "user": "test",
        "imageBase64": "abcde",
    }


def test_patch_emoji(client, auth):
    access_token = auth.login().get_json()["access_token"]
    r = client.patch(
        "/emoji/1",
        json={"name": "updated"},
        headers={"authorization": "jwt {}".format(access_token)},
    )
    assert r.status_code == 200
    assert r.get_json() == {
        "name": "updated",
        "user": "test",
        "imageBase64": "abcde",
    }


def test_delete_emoji(client, auth):
    access_token = auth.login().get_json()["access_token"]
    r = client.delete(
        "/emoji/1", headers={"authorization": "jwt {}".format(access_token)}
    )
    assert r.status_code == 200
    assert r.get_json() == {"message": "Success to delete emoji"}

