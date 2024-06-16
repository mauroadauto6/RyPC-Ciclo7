from __init__ import db

class Proveedor(db.Model):
    __tablename__ = 'proveedor'
    __table_args__ = {'extend_existing': True}
    id_proveedor = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
