import db from "./database";

const tableName = "Clientes";

const Cliente = {
  add(data: any) {
    db.table(tableName)
      .add(data)
      .then((id) => {
        return data;
      }); 
  },
  listNotDell() {
    var data = db
      .table(tableName)
      .filter((todo) => {
        return todo.deleted === false;
      })
      .toArray()
      .then((todos) => {
        return todos;
      })
      .catch((err) => {
        return err;
      });
    return data;
  },
  update(id: any, data: any) {
    db.table(tableName)
      .update(id, data)
      .then(() => {
        return data;
      });
  },
}; 
export default Cliente;
