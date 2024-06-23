from __init__ import app, db
from flask import request, jsonify
from models.carrito_compra import CarritoCompra
from models.inventario_almacen import InventarioAlmacen
from models.producto import Producto
from models.cliente import Cliente
from datetime import datetime

# Añadir producto al carrito
@app.route('/carrito', methods=['POST'])
def add_to_carrito():
    data = request.get_json()
    id_cliente = data.get('id_cliente')
    id_inventario_almacen = data.get('id_inventario_almacen')
    cantidad = data.get('cantidad')

    # Verificar si el cliente existe
    cliente = Cliente.query.filter_by(id_cliente=id_cliente).first()
    if not cliente:
        return jsonify({'error': 'Cliente no encontrado'}), 404

    # Verificar si el inventario existe
    inventario = InventarioAlmacen.query.filter_by(id_inventario_almacen=id_inventario_almacen).first()
    if not inventario:
        return jsonify({'error': 'Producto no encontrado en el inventario', 'id': id_inventario_almacen}), 404
    
    # Añadir producto al carrito
    nuevo_carrito = CarritoCompra(
        id_cliente=id_cliente,
        id_inventario_almacen=id_inventario_almacen,
        cantidad=cantidad,
        fecha_creacion=datetime.now()
    )
    db.session.add(nuevo_carrito)
    db.session.commit()

    return jsonify({'message': 'Producto añadido al carrito'}), 201

# Obtener productos del carrito
@app.route('/carrito/<int:id_cliente>', methods=['GET'])
def get_carrito(id_cliente):
    carrito = CarritoCompra.query.filter_by(id_cliente=id_cliente).all()
    carrito_list = []

    for item in carrito:
        inventario = InventarioAlmacen.query.filter_by(id_inventario_almacen=item.id_inventario_almacen).first()
        producto = Producto.query.filter_by(id_producto=inventario.id_producto).first()
        producto_data = {
            'id_carrito': item.id_carrito,
            'id_inventario_almacen': item.id_inventario_almacen,
            'cantidad': item.cantidad,
            'nombre_producto': producto.nombre_producto,
            'precio': inventario.precio_inventario,
            'url_imagen': producto.url_imagen
        }
        carrito_list.append(producto_data)

    return jsonify(carrito_list)

# Actualizar cantidad en el carrito
@app.route('/carrito/<int:id_carrito>', methods=['PUT'])
def update_carrito(id_carrito):
    data = request.get_json()
    nueva_cantidad = data.get('cantidad')

    carrito = CarritoCompra.query.filter_by(id_carrito=id_carrito).first()
    if not carrito:
        return jsonify({'error': 'Producto no encontrado en el carrito'}), 404

    carrito.cantidad = nueva_cantidad
    db.session.commit()

    return jsonify({'message': 'Cantidad actualizada correctamente'})

# Eliminar producto del carrito
@app.route('/carrito/<int:id_carrito>', methods=['DELETE'])
def delete_from_carrito(id_carrito):
    carrito = CarritoCompra.query.filter_by(id_carrito=id_carrito).first()
    if not carrito:
        return jsonify({'error': 'Producto no encontrado en el carrito'}), 404

    db.session.delete(carrito)
    db.session.commit()

    return jsonify({'message': 'Producto eliminado del carrito'})
