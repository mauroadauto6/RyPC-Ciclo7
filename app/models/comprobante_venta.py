from __init__ import db

class ComprobanteVenta(db.Model):
    __tablename__ = 'comprobanteventa'
    __table_args__ = {'extend_existing': True}
    id_comprobante = db.Column(db.Integer, primary_key=True)
    fecha_venta = db.Column(db.Date, nullable=False)
    id_empleado = db.Column(db.Integer, db.ForeignKey('empleado.id_empleado'), nullable=False)
    id_cliente = db.Column(db.String(8), db.ForeignKey('cliente.id_cliente'), nullable=False)
