import Dexie from 'dexie';
const db = new Dexie('reservas');
db.version(1).stores({ Usuarios: '++id, nombre, materno, edad, inserver' });
export default db; 
