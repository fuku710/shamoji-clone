from flask_restful import Resource, reqparse
from flask_jwt import jwt_required, current_identity
from shamoji.models.emoji import EmojiModel


class Emoji(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name')
    parser.add_argument('image_base64')

    def get(self, name):
        emoji = EmojiModel.find_by_name(name)
        if emoji is None:
            return {'messsage': 'Emoji is not found'}, 404
        return emoji.json(), 200

    @jwt_required()
    def patch(self, name):
        data = Emoji.parser.parse_args()
        user = current_identity
        emoji = EmojiModel.find_by_name_and_user_id(name=name, user_id=user.id)

        if emoji is None:
            return {"message": "Emoji is not found"}, 404

        emoji.image_base64 = data["image_base64"]
        try:
            emoji.save()
        except:
            return {"message": "Failed to insert emoji"}, 500

        return emoji.json(), 200

    @jwt_required()
    def delete(self, name):
        user = current_identity
        emoji = EmojiModel.find_by_name_and_user_id(name=name, user_id=user.id)

        if emoji is None:
            return {"message": "Emoji is not found"}, 404

        try:
            emoji.delete()
        except:
            return {"message": "Failed to delete emoji"}, 500

        return {"message": "Success to delete emoji"}, 200


class EmojiList(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name')
    parser.add_argument('image_base64')

    def get(self):
        emojis = EmojiModel.all()
        return {'emojis': list(map(lambda emoji: emoji.json(), emojis))}, 200

    @jwt_required()
    def post(self):
        data = Emoji.parser.parse_args()
        user = current_identity
        emoji = EmojiModel(
            name=data['name'], image_base64=data["image_base64"], user_id=user.id)

        try:
            emoji.save()
        except:
            return {"message": "Failed to insert emoji"}, 500

        return emoji.json(), 201
