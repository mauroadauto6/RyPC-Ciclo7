from flask import request, jsonify
from models import Producto
from models import InventarioAlmacen
from __init__ import app, db
import random

@app.route('/products/facial-care', methods=['GET'])
def get_facial_care_products():
    products = Producto.query.filter_by(id_categoria=3).all()
    result = []
    for p in products:
        inventario = InventarioAlmacen.query.filter_by(id_producto=p.id_producto).first()
        result.append({
            "id": p.id_producto,
            "title": p.nombre_producto,
            "description": p.descripcion,
            "price": p.precio,
            "image": p.url_imagen,
            "id_inventario_almacen": inventario.id_inventario_almacen if inventario else None
        })
    return jsonify(result)

@app.route('/products/featured', methods=['GET'])
def get_featured_products():
    products = Producto.query.all()
    featured_products = random.sample(products, 4)
    result = []
    for p in featured_products:
        inventario = InventarioAlmacen.query.filter_by(id_producto=p.id_producto).first()
        result.append({
            "id": p.id_producto,
            "title": p.nombre_producto,
            "description": p.descripcion,
            "price": p.precio,
            "image": p.url_imagen,
            "id_inventario_almacen": inventario.id_inventario_almacen if inventario else None
        })
    return jsonify(result)
