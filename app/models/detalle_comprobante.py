from __init__ import db

class DetalleComprobante(db.Model):
    __tablename__ = 'detallecomprobante'
    __table_args__ = {'extend_existing': True}
    id_detalle_comprobante = db.Column(db.Integer, primary_key=True)
    precio = db.Column(db.Float, nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    id_inventario_almacen = db.Column(db.Integer, db.ForeignKey('inventarioalmacen.id_inventario_almacen'), nullable=False)
    id_boletaventa = db.Column(db.Integer, db.ForeignKey('comprobanteventa.id_comprobante'), nullable=False)
    tipocomprobante = db.Column(db.String(255), nullable=False)
