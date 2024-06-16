from __init__ import db

class CategoriasProducto(db.Model):
    __tablename__ = 'categoriasproducto'
    __table_args__ = {'extend_existing': True}
    id_categoria = db.Column(db.Integer, primary_key=True)
    tipo_categoria = db.Column(db.String(255), nullable=False)
