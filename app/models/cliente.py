from __init__ import db

class Cliente(db.Model):
    __tablename__ = 'cliente'
    __table_args__ = {'extend_existing': True}
    id_cliente = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    apellido = db.Column(db.String(255), nullable=False)
    correo_electronico = db.Column(db.String(255), nullable=False, unique=True)
    contrasenia = db.Column(db.String(255), nullable=False)
    fecha_registro = db.Column(db.Date, nullable=False, default=db.func.current_date())
    id_tipocliente = db.Column(db.Integer, db.ForeignKey('tipocliente.id_tipocliente'), nullable=False)
