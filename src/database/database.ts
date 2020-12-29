import Dexie from 'dexie';
const db = new Dexie('reservas');
db.version(1).stores(
    { 
    Usuarios: '++id, nombre, materno, email, deleted, inserver',
    Socios: '++id, nombre_socio, nombre_contacto, telefono, email, clabe, beneficiario, cuota, notas, fecha_modifica, fecha_agrega, usuario_modifica, usuario_crea, imagen_logo, deleted, inserver',
    Zonas: '++id, nombre_zona, descripcion, deleted, inserver',
    Sucursales: '++id, nombre_sucursal, direccion, deleted, inserver',
    Reservas:'++id, idcliente, idzona, idsucursal, deleted, inserver',
    Clientes:'++id, Nombre, Telefono, Email, Idioma, Edad, deleted, inserver',
    });
    db.version(10).stores(
        { 
        Usuarios: '++id, nombre, materno, email, deleted, inserver',
        Socios: '++id, nombre_socio, nombre_contacto, telefono, email, clabe, beneficiario, cuota, notas, fecha_modifica, fecha_agrega, usuario_modifica, usuario_crea, imagen_logo, deleted, inserver',        Zonas: '++id, nombre_zona, descripcion, deleted, inserver',
        Sucursales: '++id, nombre_sucursal, direccion, deleted, inserver',
        Reservas:'++id, idcliente, idzona, idsucursal, deleted, inserver',
        Clientes:'++id, Nombre, Telefono, Email, Idioma, Edad, deleted, inserver',
        });
export default db; 
