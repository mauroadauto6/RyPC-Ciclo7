from . import db

class CategoriasProducto(db.Model):
    __tablename__ = 'CategoriasProducto'
    __table_args__ = {'extend_existing': True}
    id_categoria = db.Column(db.Integer, primary_key=True)
    tipo_categoria = db.Column(db.String(255), nullable=False)

    def serialize(self):
        return {
            'id_categoria': self.id_categoria,
            'tipo_categoria': self.tipo_categoria
        }
