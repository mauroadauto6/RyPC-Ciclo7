from __init__ import db

class Empleado(db.Model):
    __tablename__ = 'empleado'
    __table_args__ = {'extend_existing': True}
    id_empleado = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    apellido = db.Column(db.String(255), nullable=False)
    id_sede = db.Column(db.Integer, db.ForeignKey('sede.id_sede'), nullable=False)