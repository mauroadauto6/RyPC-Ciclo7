from __init__ import app, db
from flask import jsonify, request
from models.cliente import Cliente
from datetime import datetime

# REGISTRAR NUEVO CLIENTE
@app.route('/registro', methods=['POST'])
def create_cliente():
    data = request.get_json()
    new_cliente = Cliente(
        id_cliente=data['id_cliente'],
        nombre=data['nombre'],
        apellido=data['apellido'],
        correo_electronico=data['correo_electronico'],
        contrasenia=data['contrasenia'],
        fecha_registro=datetime.strptime(data['fecha_registro'], '%Y-%m-%d'),
        id_tipocliente=data['id_tipocliente']
    )
    db.session.add(new_cliente)
    db.session.commit()
    return jsonify({'message': 'Cliente creado con éxito'}), 201