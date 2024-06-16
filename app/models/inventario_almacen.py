from __init__ import db

class InventarioAlmacen(db.Model):
    __tablename__ = 'inventarioalmacen'
    __table_args__ = {'extend_existing': True}
    id_inventario_almacen = db.Column(db.Integer, primary_key=True)
    stock_producto = db.Column(db.Integer, nullable=False)
    id_almacen = db.Column(db.Integer, db.ForeignKey('almacen.id_almacen'), nullable=False)
    id_proveedor = db.Column(db.Integer, db.ForeignKey('productoproveedor.id_proveedor'), nullable=False)
    id_producto = db.Column(db.Integer, db.ForeignKey('producto.id_producto'), nullable=False)
    precio_inventario = db.Column(db.Float, nullable=False)

