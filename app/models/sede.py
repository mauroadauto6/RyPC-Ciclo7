from __init__ import db

class Sede(db.Model):
    __tablename__ = 'sede'
    __table_args__ = {'extend_existing': True}
    id_sede = db.Column(db.Integer, primary_key=True)
    nombre_sede = db.Column(db.String(255), nullable=False)