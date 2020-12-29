import Dexie from "dexie";
const db = new Dexie("reservas");
db.version(1).stores({
  Usuarios: "++id, nombre, materno, email, deleted, inserver",
  Socios: "++id, nombre_socio, email, deleted, inserver",
  Zonas: "++id, nombre_zona, descripcion, deleted, inserver",
  Sucursales: "++id, nombre_sucursal, direccion, deleted, inserver",
  Reservas: "++id, idcliente, idzona, idsucursal, deleted, inserver",
  Clientes: "++id, Nombre, Telefono, Email, Idioma, Edad, deleted, inserver",
  Rol: "++id, rol, inserve",
});
db.version(10).stores({
  Usuarios: "++id, nombre, materno, email, deleted, inserver",
  Socios: "++id, nombre_socio, email, deleted, inserver",
  Zonas: "++id, nombre_zona, descripcion, deleted, inserver",
  Sucursales: "++id, nombre_sucursal, direccion, deleted, inserver",
  Reservas: "++id, idcliente, idzona, idsucursal, deleted, inserver",
  Clientes: "++id, Nombre, Telefono, Email, Idioma, Edad, deleted, inserver",
  Rol: "++id, rol, inserve",
});
export default db;
