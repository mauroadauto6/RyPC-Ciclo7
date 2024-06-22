from flask import request, jsonify
from models import Producto
from __init__ import app, db
import random

@app.route('/products/facial-care', methods=['GET'])
def get_facial_care_products():
    products = Producto.query.filter_by(id_categoria=3).all()  # id_categoria=3 corresponde a 'Cuidado Facial y Corporal'
    result = [
        {"id": p.id_producto, "title": p.nombre_producto, "description": p.descripcion, "price": p.precio, "image": "/path/to/image.jpg"} 
        for p in products
    ]
    return jsonify(result)

@app.route('/products/featured', methods=['GET'])
def get_featured_products():
    products = Producto.query.all()
    featured_products = random.sample(products, 2)  # Selecciona 2 productos aleatorios
    result = [
        {"id": p.id_producto, "title": p.nombre_producto, "description": p.descripcion, "price": p.precio, "image": "/path/to/image.jpg"} 
        for p in featured_products
    ]
    return jsonify(result)
