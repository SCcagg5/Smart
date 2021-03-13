const r = require('rethinkdb');


exports.getTableData = function (db_name,table){
  return new Promise(function(resolve, reject) {

    r.connect({
      db:db_name,
      host:"smartdom.ch",
      port:28015,
      password:"test"
    },function (err,conn){

      r.table(table).run(conn,function (err,cursor){
        if(err) reject(err)
        else{
          cursor.toArray(function (err,results){
            if(err) reject(err)
            else{
              let res =results;
              conn.close(function (err){
                resolve(res)
              })
            }
          })
        }
      })
    })

  });
}