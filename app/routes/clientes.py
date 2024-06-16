from __init__ import app, db
from flask import jsonify
from models.cliente import Cliente

# OBTENER TODOS LOS CLIENTES
@app.route('/clientes', methods=['GET'])
def get_clientes():
    clientes = Cliente.query.all()
    clientes_list = []
    for cliente in clientes:
        cliente_data = {
            'id_cliente': cliente.id_cliente,
            'nombre': cliente.nombre,
            'apellido': cliente.apellido,
            'correo_electronico': cliente.correo_electronico,
            'contrasenia': cliente.contrasenia,
            'fecha_registro': cliente.fecha_registro,
            'id_tipocliente': cliente.id_tipocliente
        }
        clientes_list.append(cliente_data)
    return jsonify(clientes_list)