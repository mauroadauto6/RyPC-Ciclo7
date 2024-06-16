from . import db

class InventarioAlmacen(db.Model):
    __tablename__ = 'InventarioAlmacen'
    __table_args__ = {'extend_existing': True}
    id_detalle_comprobante = db.Column(db.Integer, primary_key=True)
    precio = db.Column(db.Float, nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    id_inventario_almacen = db.Column(db.Integer, db.ForeignKey('InventarioAlmacen.id_inventario_almacen'), nullable=False)
    id_boletaventa = db.Column(db.Integer, db.ForeignKey('ComprobanteVenta.id_comprobante'), nullable=False)
    tipocomprobante = db.Column(db.String(255), nullable=False)

    def serialize(self):
        return {
            'id_detalle_comprobante': self.id_detalle_comprobante,
            'precio': self.precio,
            'cantidad': self.cantidad,
            'id_inventario_almacen': self.id_inventario_almacen,
            'id_boletaventa': self.id_boletaventa,
            'tipocomprobante': self.tipocomprobante
        }
