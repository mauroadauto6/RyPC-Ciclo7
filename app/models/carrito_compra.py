from . import db

class CarritoCompra(db.Model):
    __tablename__ = 'CarritoCompra'
    __table_args__ = {'extend_existing': True}
    id_almacen = db.Column(db.Integer, primary_key=True)
    id_sede = db.Column(db.Integer, db.ForeignKey('Sede.id_sede'), nullable=False)

    def serialize(self):
        return {
            'id_almacen': self.id_almacen,
            'id_sede': self.id_sede
        }
