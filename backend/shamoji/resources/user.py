from flask_restful import Resource, reqparse
from shamoji.models.user import UserModel


class Emoji(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', required=True)

    def get(self):
        emojis = EmojiModel.all()
        return {'emojis': list(map(lambda emoji: emoji.json(), emojis))}

    def post(self):
        data = Emoji.parser.parse_args()
        emoji = EmojiModel(**data)

        try:
            emoji.save()
        except:
            return {"message": "Failed to insert emoji"}, 500

        return emoji.json(), 201


class UserRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username', required=True)
    parser.add_argument('password', required=True)

    def post(self):
        data = UserRegister.parser.parse_args()
        user = UserModel(**data)

        try:
            user.save()
        except:
            return {"message": "Failed to register user"}, 500

        return {"message": "Success to register user"}, 201
