from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_app(app):
    db.init_app(app)

from .almacen import Almacen
from .carrito_compra import CarritoCompra
from .categorias_producto import CategoriasProducto
from .cliente import Cliente
from .comprobante_venta import ComprobanteVenta
from .detalle_comprobante import DetalleComprobante
from .empleado import Empleado
from .inventario_almacen import InventarioAlmacen
from .producto import Producto
from .producto_proveedor import ProductoProveedor
from .proveedor import Proveedor
from .sede import Sede
from .tipo_cliente import TipoCliente