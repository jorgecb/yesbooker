import Dexie from 'dexie';
const db = new Dexie('reservas');
db.version(1).stores(
    { 
    Usuarios: '++id, nombre, materno, email, inserver',
    Socios: '++id, nombre_socio, email, inserver',
    Zonas: '++id, nombre_zona, descripcion, inserver',
    Clientes:'++id, Nombre, Telefono, Email, Idioma, Edad, inserver',
    });
    db.version(10).stores(
        { 
        Usuarios: '++id, nombre, materno, email, inserver',
        Socios: '++id, nombre_socio, email, inserver',
        Zonas: '++id, nombre_zona, descripcion, inserver',
        Sucursales: '++id, nombre_sucursal, direccion, inserver',
        Reservas:'++id, idcliente, idzona, idsucursal, inserver',
        Clientes:'++id, Nombre, Telefono, Email, Idioma, Edad, inserver',
        });
export default db; 
