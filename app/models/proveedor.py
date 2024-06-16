from . import db

class Proveedor(db.Model):
    __tablename__ = 'Proveedor'
    __table_args__ = {'extend_existing': True}
    id_proveedor = db.Column(db.Integer, db.ForeignKey('Proveedor.id_proveedor'), primary_key=True)
    id_producto = db.Column(db.Integer, db.ForeignKey('Producto.id_producto'), primary_key=True)

    def serialize(self):
        return {
            'id_proveedor': self.id_proveedor,
            'id_producto': self.id_producto
        }
