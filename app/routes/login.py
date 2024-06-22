from __init__ import app, db
from flask import jsonify, request
from models.cliente import Cliente
from werkzeug.security import check_password_hash

@app.route('/login', methods=['POST'])
def login_cliente():
    data = request.get_json()
    correo_electronico = data.get('correo_electronico')
    contrasenia = data.get('contrasenia')

    cliente = Cliente.query.filter_by(correo_electronico=correo_electronico).first()

    if cliente and check_password_hash(cliente.contrasenia, contrasenia):
        return jsonify({'message': 'Inicio de sesión exitoso', 'user': {
            'id_cliente': cliente.id_cliente,
            'nombre': cliente.nombre,
            'apellido': cliente.apellido,
            'correo_electronico': cliente.correo_electronico
        }}), 200
    else:
        return jsonify({'message': 'Correo electrónico o contraseña incorrectos'}), 401