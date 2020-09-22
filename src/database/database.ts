import Dexie from 'dexie';
const db = new Dexie('reservas');
db.version(1).stores(
    { 
    Usuarios: '++id, nombre, materno, edad, inserver',
    Socios: '++id, nombre_socio, email, inserver',
    Zonas: '++id, nombre_zona, descripcion, inserver',
    });

export default db; 
