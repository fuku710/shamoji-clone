from shamoji.db import db
from sqlalchemy.orm import validates


class EmojiModel(db.Model):
    __tablename__ = "emojis"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True, nullable=False)
    data_url = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("UserModel")

    @validates("name")
    def validate_name(self, key, name):
        assert name is not ""
        return name

    @validates("data_url")
    def validate_data_url(self,key,data_url):
        assert data_url is not ""
        return data_url

    def __init__(self, name, user_id, data_url):
        self.name = name
        self.data_url = data_url
        self.user_id = user_id

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "user": self.user.username,
            "dataUrl": self.data_url,
        }

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
    def find_by_id(cls, _id):
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
