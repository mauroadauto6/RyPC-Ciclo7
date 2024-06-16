from . import db

class Sede(db.Model):
    __tablename__ = 'Sede'
    __table_args__ = {'extend_existing': True}
    id_sede = db.Column(db.Integer, primary_key=True)
    nombre_sede = db.Column(db.String(255), nullable=False)

    def serialize(self):
        return {
            'id_sede': self.id_sede,
            'nombre_sede': self.nombre_sede
        }
