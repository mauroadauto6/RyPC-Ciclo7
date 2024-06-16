from __init__ import db

class Almacen(db.Model):
    __tablename__ = 'almacen'
    __table_args__ = {'extend_existing': True}
    id_almacen = db.Column(db.Integer, primary_key=True)
    id_sede = db.Column(db.Integer, db.ForeignKey('Sede.id_sede'), nullable=False)
