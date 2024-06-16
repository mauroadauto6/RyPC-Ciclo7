from __init__ import db

class ProductoProveedor(db.Model):
    __tablename__ = 'productoproveedor'
    __table_args__ = {'extend_existing': True}
    id_proveedor = db.Column(db.Integer, db.ForeignKey('Proveedor.id_proveedor'), primary_key=True, nullable=False)
    id_producto = db.Column(db.Integer, db.ForeignKey('Producto.id_producto'), primary_key=True, nullable=False)
