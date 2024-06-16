-- CREATE
-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-06-14 05:20:31.061

-- tables
-- Table: Almacen
CREATE TABLE Almacen (
    id_almacen int  NOT NULL,
    id_sede int  NOT NULL,
    CONSTRAINT Almacen_pk PRIMARY KEY (id_almacen)
);

-- Table: CarritoCompra
CREATE TABLE CarritoCompra (
    id_carrito SERIAL  NOT NULL,
    id_cliente varchar(255)  NOT NULL,
    id_inventario_almacen int  NOT NULL,
    cantidad int  NOT NULL,
    fecha_creacion date  NOT NULL,
    CONSTRAINT id_carrito PRIMARY KEY (id_carrito)
);

-- Table: CategoriasProducto
CREATE TABLE CategoriasProducto (
    id_categoria int  NOT NULL,
    tipo_categoria varchar(255)  NOT NULL,
    CONSTRAINT CategoriasProducto_pk PRIMARY KEY (id_categoria)
);

-- Table: Cliente
CREATE TABLE Cliente (
    id_cliente varchar(255)  NOT NULL,
    nombre varchar(255)  NOT NULL,
    apellido varchar(255)  NOT NULL,
    correo_electronico varchar(255)  NOT NULL,
    contrasenia varchar(255)  NOT NULL,
    fecha_registro date  NOT NULL,
    id_tipocliente int  NOT NULL,
    CONSTRAINT Cliente_pk PRIMARY KEY (id_cliente)
);

-- Table: ComprobanteVenta
CREATE TABLE ComprobanteVenta (
    id_comprobante SERIAL NOT NULL,
    fecha_venta date  NOT NULL,
    id_empleado int  NOT NULL,
    id_cliente varchar(8)  NOT NULL,
    CONSTRAINT ComprobanteVenta_pk PRIMARY KEY (id_comprobante)
);

-- Table: DetalleComprobante
CREATE TABLE DetalleComprobante (
    id_detalle_comprobante SERIAL  NOT NULL,
    precio float  NOT NULL,
    cantidad int  NOT NULL,
    id_inventario_almacen int  NOT NULL,
    id_boletaventa int  NOT NULL,
    tipocomprobante varchar(255)  NOT NULL,
    CONSTRAINT DetalleComprobante_pk PRIMARY KEY (id_detalle_comprobante)
);

-- Table: Empleado
CREATE TABLE Empleado (
    id_empleado int  NOT NULL,
    nombre varchar(255)  NOT NULL,
    apellido varchar(255)  NOT NULL,
    id_sede int  NOT NULL,
    CONSTRAINT Empleado_pk PRIMARY KEY (id_empleado)
);

-- Table: InventarioAlmacen
CREATE TABLE InventarioAlmacen (
    id_inventario_almacen int  NOT NULL,
    stock_producto int  NOT NULL,
    id_almacen int  NOT NULL,
    id_proveedor int  NOT NULL,
    id_producto int  NOT NULL,
    precio_inventario float  NOT NULL,
    CONSTRAINT InventarioAlmacen_pk PRIMARY KEY (id_inventario_almacen)
);

-- Table: Producto
CREATE TABLE Producto (
    id_producto int  NOT NULL,
    nombre_producto varchar(255)  NOT NULL,
    fecha_registro date  NOT NULL,
    fecha_vencimiento date  NOT NULL,
    descripcion text  NOT NULL,
    id_categoria int  NOT NULL,
    precio float  NOT NULL,
    CONSTRAINT Producto_pk PRIMARY KEY (id_producto)
);

-- Table: ProductoProveedor
CREATE TABLE ProductoProveedor (
    id_proveedor int  NOT NULL,
    id_producto int  NOT NULL,
    CONSTRAINT ProductoProveedor_pk PRIMARY KEY (id_proveedor,id_producto)
);

-- Table: Proveedor
CREATE TABLE Proveedor (
    id_proveedor int  NOT NULL,
    nombre varchar(255)  NOT NULL,
    CONSTRAINT Proveedor_pk PRIMARY KEY (id_proveedor)
);

-- Table: Sede
CREATE TABLE Sede (
    id_sede int  NOT NULL,
    nombre_sede varchar(255)  NOT NULL,
    CONSTRAINT Sede_pk PRIMARY KEY (id_sede)
);

-- Table: TipoCliente
CREATE TABLE TipoCliente (
    id_tipocliente int  NOT NULL,
    nombre_tipocliente varchar(255)  NOT NULL,
    CONSTRAINT TipoCliente_pk PRIMARY KEY (id_tipocliente)
);

-- foreign keys
-- Reference: Almacen_Sede (table: Almacen)
ALTER TABLE Almacen ADD CONSTRAINT Almacen_Sede
    FOREIGN KEY (id_sede)
    REFERENCES Sede (id_sede)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: BoletaVenta_Cliente (table: ComprobanteVenta)
ALTER TABLE ComprobanteVenta ADD CONSTRAINT BoletaVenta_Cliente
    FOREIGN KEY (id_cliente)
    REFERENCES Cliente (id_cliente)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: BoletaVenta_Empleado (table: ComprobanteVenta)
ALTER TABLE ComprobanteVenta ADD CONSTRAINT BoletaVenta_Empleado
    FOREIGN KEY (id_empleado)
    REFERENCES Empleado (id_empleado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: CarritoCompra_Cliente (table: CarritoCompra)
ALTER TABLE CarritoCompra ADD CONSTRAINT CarritoCompra_Cliente
    FOREIGN KEY (id_cliente)
    REFERENCES Cliente (id_cliente)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: CarritoCompra_InventarioAlmacen (table: CarritoCompra)
ALTER TABLE CarritoCompra ADD CONSTRAINT CarritoCompra_InventarioAlmacen
    FOREIGN KEY (id_inventario_almacen)
    REFERENCES InventarioAlmacen (id_inventario_almacen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Cliente_TipoCliente (table: Cliente)
ALTER TABLE Cliente ADD CONSTRAINT Cliente_TipoCliente
    FOREIGN KEY (id_tipocliente)
    REFERENCES TipoCliente (id_tipocliente)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: DetalleBoleta_InventarioAlmacen (table: DetalleComprobante)
ALTER TABLE DetalleComprobante ADD CONSTRAINT DetalleBoleta_InventarioAlmacen
    FOREIGN KEY (id_inventario_almacen)
    REFERENCES InventarioAlmacen (id_inventario_almacen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: DetalleComprobante_ComprobanteVenta (table: DetalleComprobante)
ALTER TABLE DetalleComprobante ADD CONSTRAINT DetalleComprobante_ComprobanteVenta
    FOREIGN KEY (id_boletaventa)
    REFERENCES ComprobanteVenta (id_comprobante)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Empleado_Sede (table: Empleado)
ALTER TABLE Empleado ADD CONSTRAINT Empleado_Sede
    FOREIGN KEY (id_sede)
    REFERENCES Sede (id_sede)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: InventarioAlmacen_Almacen (table: InventarioAlmacen)
ALTER TABLE InventarioAlmacen ADD CONSTRAINT InventarioAlmacen_Almacen
    FOREIGN KEY (id_almacen)
    REFERENCES Almacen (id_almacen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: InventarioAlmacen_ProductoProveedor (table: InventarioAlmacen)
ALTER TABLE InventarioAlmacen ADD CONSTRAINT InventarioAlmacen_ProductoProveedor
    FOREIGN KEY (id_proveedor, id_producto)
    REFERENCES ProductoProveedor (id_proveedor, id_producto)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: ProductoProveedor_Producto (table: ProductoProveedor)
ALTER TABLE ProductoProveedor ADD CONSTRAINT ProductoProveedor_Producto
    FOREIGN KEY (id_producto)
    REFERENCES Producto (id_producto)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: ProductoProveedor_Proveedor (table: ProductoProveedor)
ALTER TABLE ProductoProveedor ADD CONSTRAINT ProductoProveedor_Proveedor
    FOREIGN KEY (id_proveedor)
    REFERENCES Proveedor (id_proveedor)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Producto_CategoriasProducto (table: Producto)
ALTER TABLE Producto ADD CONSTRAINT Producto_CategoriasProducto
    FOREIGN KEY (id_categoria)
    REFERENCES CategoriasProducto (id_categoria)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

-- INSERT

INSERT INTO Sede (id_sede, nombre_sede) VALUES
(1, 'San Isidro'),
(2, 'Chorrillos');

INSERT INTO CategoriasProducto (id_categoria, tipo_categoria) VALUES
(1, 'Aceites Escenciales y Cosmeticos'),
(2, 'Bienestar y Accesorios'),
(3, 'Cuidado Facial y Corporal'),
(4, 'Cuidado del Cabello'),
(5, 'Edulcorantes Naturales'),
(6, 'Hierbas e Infusiones');

INSERT INTO TipoCliente (id_tipocliente, nombre_tipocliente) VALUES
(1, 'Regular'),
(2, 'Jurídica');

INSERT INTO Cliente (id_cliente, nombre, apellido, correo_electronico, contrasenia, fecha_registro, id_tipocliente) VALUES
('C001', 'Juan', 'Perez', 'juan.perez@example.com', 'password123', '2024-06-14', 1),
('C002', 'Maria', 'Gomez', 'maria.gomez@example.com', 'password456', '2024-06-14', 2);

INSERT INTO Producto (id_producto, nombre_producto, fecha_registro, fecha_vencimiento, descripcion, id_categoria, precio) VALUES
(1, 'Aceite de Coco', '2024-01-01', '2025-01-01', 'Aceite de coco orgánico', 1, 25.50),
(2, 'Jabón de Lavanda', '2024-01-01', '2025-01-01', 'Jabón artesanal de lavanda', 3, 15.75),
(3, 'Shampoo de Manzanilla', '2024-01-01', '2025-01-01', 'Shampoo natural de manzanilla', 4, 30.00),
(4, 'Stevia en Polvo', '2024-01-01', '2025-01-01', 'Edulcorante natural de stevia', 5, 20.00),
(5, 'Té de Menta', '2024-01-01', '2025-01-01', 'Infusión de hojas de menta', 6, 10.00);

INSERT INTO Proveedor (id_proveedor, nombre) VALUES
(1, 'Proveedor A'),
(2, 'Proveedor B');

INSERT INTO ProductoProveedor (id_proveedor, id_producto) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(2, 5);

INSERT INTO Almacen (id_almacen, id_sede) VALUES
(1, 1),
(2, 2);

INSERT INTO InventarioAlmacen (id_inventario_almacen, stock_producto, id_almacen, id_proveedor, id_producto, precio_inventario) VALUES
(1, 100, 1, 1, 1, 25.50),
(2, 150, 1, 1, 2, 15.75),
(3, 200, 2, 2, 3, 30.00),
(4, 250, 2, 2, 4, 20.00),
(5, 300, 2, 2, 5, 10.00);

INSERT INTO Empleado (id_empleado, nombre, apellido, id_sede) VALUES
(1, 'Carlos', 'Lopez', 1),
(2, 'Ana', 'Martinez', 2);

/*INSERT INTO ComprobanteVenta (id_comprobante, fecha_venta, id_empleado, id_cliente) VALUES
(1, '2024-06-14', 1, 'C001'),
(2, '2024-06-14', 2, 'C002');

INSERT INTO DetalleComprobante (id_detalle_comprobante, precio, cantidad, id_inventario_almacen, id_boletaventa, tipocomprobante) VALUES
(1, 25.50, 2, 1, 1, 'Factura'),
(2, 15.75, 1, 2, 1, 'Factura'),
(3, 30.00, 3, 3, 2, 'Boleta'),
(4, 20.00, 1, 4, 2, 'Boleta');

INSERT INTO CarritoCompra (id_carrito, id_cliente, id_inventario_almacen, cantidad, fecha_creacion) VALUES
(1, 'C001', 1, 2, '2024-06-14'),
(2, 'C001', 2, 1, '2024-06-14'),
(3, 'C002', 3, 3, '2024-06-14');*/