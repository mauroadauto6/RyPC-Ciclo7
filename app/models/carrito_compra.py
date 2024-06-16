from __init__ import db

class CarritoCompra(db.Model):
    __tablename__ = 'carritocompra'
    __table_args__ = {'extend_existing': True}
    id_carrito = db.Column(db.Integer, primary_key=True)
    id_cliente = db.Column(db.String(255), db.ForeignKey('cliente.id_cliente'), nullable=False)
    id_inventario_almacen = db.Column(db.Integer, db.ForeignKey('inventarioalmacen.id_inventario_almacen'), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    fecha_creacion = db.Column(db.Date, nullable=False)