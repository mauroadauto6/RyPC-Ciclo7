from __init__ import db

class Producto(db.Model):
    __tablename__ = 'producto'
    __table_args__ = {'extend_existing': True}
    id_producto = db.Column(db.Integer, primary_key=True)
    nombre_producto = db.Column(db.String(255), nullable=False)
    fecha_registro = db.Column(db.Date, nullable=False)
    fecha_vencimiento = db.Column(db.Date, nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    id_categoria = db.Column(db.Integer, db.ForeignKey('categoriasproducto.id_categoria'), nullable=False)
    precio = db.Column(db.Float, nullable=False)