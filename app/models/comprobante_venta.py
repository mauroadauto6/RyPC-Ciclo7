from . import db

class ComprobanteVenta(db.Model):
    __tablename__ = 'ComprobanteVenta'
    __table_args__ = {'extend_existing': True}
    id_comprobante = db.Column(db.Integer, primary_key=True)
    fecha_venta = db.Column(db.Date, nullable=False)
    id_empleado = db.Column(db.Integer, db.ForeignKey('Empleado.id_empleado'), nullable=False)
    id_cliente = db.Column(db.String(8), db.ForeignKey('Cliente.id_cliente'), nullable=False)

    def serialize(self):
        return {
            'id_comprobante': self.id_comprobante,
            'fecha_venta': self.fecha_venta,
            'id_empleado': self.id_empleado,
            'id_cliente': self.id_cliente
        }
