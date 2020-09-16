import db from './database';

const tableName='Socios';


const Socio={
    add(data:any){

          db.table(tableName)
            .add(data)
            .then((id) => {
               return data;
            });
    },
    listAll(){
       var data=   db.table(tableName)
       .toArray()
        .then((todos) => {
            return todos;
        })
        .catch((err) => {
            return err;
           });
           return data;
    },
    update(id: any, data: any){
        db.table(tableName)
        .update(id, data)
        .then(() => {
           return data;
        });
    }
}

export default Socio;