from shamoji.db import db


class EmojiModel(db.Model):
    __tablename__ = 'emojis'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True, nullable=False)
    image_base64 = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('UserModel')

    def __init__(self, name, user_id, image_base64):
        self.name = name
        self.image_base64 = image_base64
        self.user_id = user_id

    def json(self):
        return {'name': self.name, 'image_base64': self.image_base64, 'user': self.user.username}

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def all(cls):
        return cls.query.all()

    @classmethod
    def find_by_name(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id_and_user_id(cls, _id, user_id):
        return cls.query.filter_by(id=_id, user_id=user_id).first()

    @classmethod
    def find_by_name_and_user_id(cls, name, user_id):
        return cls.query.filter_by(name=name, user_id=user_id).first()
