from flask_restful import Resource, reqparse
from flask_jwt import jwt_required, current_identity
from shamoji.models.user import UserModel


class UserRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("username", required=True)
    parser.add_argument("password", required=True)

    def post(self):
        data = UserRegister.parser.parse_args()
        user = UserModel(**data)

        try:
            user.save()
        except:
            return {"message": "Failed to register user"}, 500

        return user.json(), 201


class User(Resource):
    @jwt_required()
    def get(self):
        user = current_identity
        return user.json(), 200
