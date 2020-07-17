from flask import request


def test_get_emojis(client):
    r = client.get("/emojis")
    assert r.status_code == 200
    assert r.get_json() == [
        {
            "id": 1,
            "name": "test_emoji1",
            "user": "test",
            "dataUrl": "data:image/jpg;base64,hogehoge",
        }
    ]


def test_post_emoji(client, auth):
    access_token = auth.login().get_json()["access_token"]
    r = client.post(
        "/emojis",
        json={"name": "test_emoji2", "dataUrl": "data:image/jpg;base64,fugafuga"},
        headers={"authorization": f"jwt {access_token}"},
    )
    assert r.status_code == 201
    assert r.get_json() == {
        "id": 2,
        "name": "test_emoji2",
        "user": "test",
        "dataUrl": "data:image/jpg;base64,fugafuga",
    }


def test_get_emoji(client):
    r = client.get("/emoji/1")
    assert r.status_code == 200
    assert r.get_json() == {
        "id": 1,
        "name": "test_emoji1",
        "user": "test",
        "dataUrl": "data:image/jpg;base64,hogehoge",
    }


def test_patch_emoji(client, auth):
    access_token = auth.login().get_json()["access_token"]
    r = client.patch(
        "/emoji/1",
        json={"name": "test_emoji1_updated"},
        headers={"authorization": f"jwt {access_token}"},
    )
    assert r.status_code == 200
    assert r.get_json() == {
        "id": 1,
        "name": "test_emoji1_updated",
        "user": "test",
        "dataUrl": "data:image/jpg;base64,hogehoge",
    }


def test_delete_emoji(client, auth):
    access_token = auth.login().get_json()["access_token"]
    r = client.delete("/emoji/1", headers={"authorization": f"jwt {access_token}"})
    assert r.status_code == 204
    assert r.get_data(as_text=True) == ""

