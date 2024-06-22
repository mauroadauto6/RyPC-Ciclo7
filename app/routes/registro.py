from __init__ import app, db
from flask import jsonify, request
from models.cliente import Cliente
from werkzeug.security import generate_password_hash

@app.route('/registro', methods=['POST'])
def create_cliente():
    data = request.get_json()
    hashed_password = generate_password_hash(data['contrasenia'], method='pbkdf2:sha256')
    new_cliente = Cliente(
        nombre=data['nombre'],
        apellido=data['apellido'],
        correo_electronico=data['correo_electronico'],
        contrasenia=hashed_password,
        id_tipocliente=data['id_tipocliente']
    )
    db.session.add(new_cliente)
    db.session.commit()
    return jsonify({'message': 'Cliente creado con éxito'}), 201