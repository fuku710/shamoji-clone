from flask_restful import Resource, reqparse
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

        return {"message": "Success to register user"}, 201
