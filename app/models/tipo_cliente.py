from __init__ import db

class TipoCliente(db.Model):
    __tablename__ = 'tipocliente'
    __table_args__ = {'extend_existing': True}
    id_tipocliente = db.Column(db.Integer, primary_key=True)
    nombre_tipocliente = db.Column(db.String(255), nullable=False)
