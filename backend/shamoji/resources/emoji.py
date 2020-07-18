from flask_restful import Resource, reqparse
from flask_jwt import jwt_required, current_identity
from shamoji.models.emoji import EmojiModel


class Emoji(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("name")
    parser.add_argument("dataUrl")

    def get(self, _id):
        emoji = EmojiModel.find_by_id(_id)
        if emoji is None:
            return {"messsage": "Emoji is not found"}, 404
        return emoji.json(), 200

    @jwt_required()
    def patch(self, _id):
        data = Emoji.parser.parse_args()
        user = current_identity
        emoji = EmojiModel.find_by_id_and_user_id(_id=_id, user_id=user.id)

        if emoji is None:
            return {"message": "Emoji is not found"}, 404
        try:
            if data["name"] is not None:
                emoji.name = data["name"]
            if data["dataUrl"] is not None:
                emoji.data_url = data["dataUrl"]
            emoji.save()
        except AssertionError:
            return {"message": "Failed validation"}, 422
        except Exception as e:
            print(e)
            return {"message": "Failed to insert emoji"}, 500

        return emoji.json(), 200

    @jwt_required()
    def delete(self, _id):
        user = current_identity
        emoji = EmojiModel.find_by_id_and_user_id(_id=_id, user_id=user.id)

        if emoji is None:
            return {"message": "Emoji is not found"}, 404
        try:
            emoji.delete()
        except Exception as e:
            print(e)
            return {"message": "Failed to delete emoji"}, 500

        return None, 204


class Emojis(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("name")
    parser.add_argument("dataUrl")

    def get(self):
        emojis = EmojiModel.all()
        return list(map(lambda emoji: emoji.json(), emojis)), 200

    @jwt_required()
    def post(self):
        data = Emoji.parser.parse_args()
        user = current_identity
        try:
            emoji = EmojiModel(
                name=data["name"], data_url=data["dataUrl"], user_id=user.id
            )
            emoji.save()
        except AssertionError:
            return {"message": "Failed validation"}, 422
        except Exception as e:
            print(e)
            return {"message": "Failed to insert emoji"}, 500

        return emoji.json(), 201
