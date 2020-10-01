import Dexie from 'dexie';
const db = new Dexie('reservas');
db.version(1).stores(
    { 
    Usuarios: '++id, nombre, materno, email, inserver',
    Socios: '++id, nombre_socio, email, inserver',
    Zonas: '++id, nombre_zona, descripcion, inserver',
<<<<<<< HEAD
    Clientes:'++id, Nombre, Telefono, Email, Idioma, inserver',
=======
    Sucursales: '++id, nombre_sucursal, direccion, inserver',
    Reservas:'++id, idcliente, idzona, idsucursal, inserver',
>>>>>>> 6dc14854c7e409d80c236a91e6a9ceb7254eb1ca
    });
    db.version(10).stores(
        { 
        Usuarios: '++id, nombre, materno, email, inserver',
        Socios: '++id, nombre_socio, email, inserver',
        Zonas: '++id, nombre_zona, descripcion, inserver',
        Sucursales: '++id, nombre_sucursal, direccion, inserver',
        Reservas:'++id, idcliente, idzona, idsucursal, inserver',
        });
export default db; 
