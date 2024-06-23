from flask import request, jsonify
from __init__ import app, db
from models.comprobante_venta import ComprobanteVenta
from models.detalle_comprobante import DetalleComprobante
from models.inventario_almacen import InventarioAlmacen
from models.carrito_compra import CarritoCompra
from models.cliente import Cliente
from datetime import datetime

# REALIZAR COMPRA
@app.route('/comprar', methods=['POST'])
def realizar_compra():
    data = request.get_json()
    id_cliente = data.get('id_cliente')
    carrito = data.get('carrito')  # Lista de diccionarios con id_inventario_almacen y cantidad

    # Verificar si el cliente existe
    cliente = Cliente.query.filter_by(id_cliente=id_cliente).first()
    if not cliente:
        return jsonify({'error': 'Cliente no encontrado'}), 404

    # Crear un nuevo comprobante de venta
    nuevo_comprobante = ComprobanteVenta(
        fecha_venta=datetime.now(),
        id_empleado=1,  # Asumiendo que el empleado con id 1 está procesando la venta
        id_cliente=id_cliente
    )
    db.session.add(nuevo_comprobante)
    db.session.commit()

    try:
        # Eliminar los productos del carrito del cliente después de realizar la compra
        CarritoCompra.query.filter_by(id_cliente=id_cliente).delete()
        db.session.commit()

        return jsonify({'message': 'Compra realizada exitosamente'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Error al realizar la compra'}), 500


# GET COMPRAS
@app.route('/compras', methods=['GET'])
def get_compras():
    compras = ComprobanteVenta.query.all()
    compras_list = []
    
    for compra in compras:
        detalles = DetalleComprobante.query.filter_by(id_boletaventa=compra.id_comprobante).all()
        detalles_list = []
        
        for detalle in detalles:
            detalle_data = {
                'id_detalle_comprobante': detalle.id_detalle_comprobante,
                'precio': detalle.precio,
                'cantidad': detalle.cantidad,
                'id_inventario_almacen': detalle.id_inventario_almacen,
                'tipocomprobante': detalle.tipocomprobante
            }
            detalles_list.append(detalle_data)
        
        compra_data = {
            'id_comprobante': compra.id_comprobante,
            'fecha_venta': compra.fecha_venta,
            'id_empleado': compra.id_empleado,
            'id_cliente': compra.id_cliente,
            'detalles': detalles_list
        }
        compras_list.append(compra_data)
    
    return jsonify(compras_list)