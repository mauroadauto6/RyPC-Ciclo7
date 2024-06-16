from . import db

class TipoCliente(db.Model):
    __tablename__ = 'TipoCliente'
    __table_args__ = {'extend_existing': True}
    id_tipocliente = db.Column(db.Integer, primary_key=True)
    nombre_tipocliente = db.Column(db.String(255), nullable=False)

    def serialize(self):
        return {
            'id_tipocliente': self.id_tipocliente,
            'nombre_tipocliente': self.nombre_tipocliente
        }
