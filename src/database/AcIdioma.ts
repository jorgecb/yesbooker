import db from "./database";

const tableName = "Idioma";

const idioma = {
  add(data: any) {
    db.table(tableName).add(data);
  },

  listAll() {
    var data = db
      .table(tableName)
      .toArray()
      .then((todos) => {
        return todos;
      })
      .catch((err) => {
        return err;
      });
    return data;
  },
  limTab() {
    db.table(tableName).clear();
  },
};

export default idioma;