
async function createDB(db_name,usr_token){

  return new Promise(function(resolve, reject) {
    let socket = new WebSocket("wss://api.smartdom.ch/ws/" + usr_token);

    socket.onopen = function(e) {
      let payload;
      payload = {"cmd": "db_create("+JSON.stringify(db_name)+")"}
      socket.send(JSON.stringify(payload));
    };
    let test = false;
    socket.onmessage = function(event) {

      if(event && event.data && event.data === "dbs_created")
        test =true
      if(event && event.data && event.data === "Invalid cmd")
        test = false;

    }
    socket.error = function(event) {
      console.log("ERROR CREATE DB RETHINK");
      test = false
      reject(test)
    };
    socket.onclose = (event) => {
      console.log("CLOSED");
      resolve(test)
    };

  });
}

async function tableList(db_name,usr_token){
  return new Promise(function(resolve, reject) {
    let socket = new WebSocket("wss://api.smartdom.ch/ws/" + usr_token);

    socket.onopen = function(e) {
      let payload;
      payload = {"cmd": "db('"+db_name+"').table_list()"}
      socket.send(JSON.stringify(payload));
    };
    let tableList = [];
    socket.onmessage = function(event) {
      let recieve = JSON.parse(event.data);
      if(recieve && recieve !== "" && recieve !== "rethinkdb" && typeof recieve === "string"){
        tableList.push(recieve)
      }
    }
    socket.error = function(event) {
      console.log("ERROR GET TABLE LIST RETHINK");
      reject(event)
    };

    socket.onclose = (event) => {
      console.log("CLOSED");
      resolve(tableList)
    };

  });
}

async function createTable(db_name,table_name,usr_token){

  return new Promise(function(resolve, reject) {
    let socket = new WebSocket("wss://api.smartdom.ch/ws/" + usr_token);

    socket.onopen = function(e) {
      let payload;
      payload = {"cmd": "db("+JSON.stringify(db_name)+").table_create("+JSON.stringify(table_name)+")"}
      socket.send(JSON.stringify(payload));
    };
    let test = false;
    socket.onmessage = function(event) {
      //console.log(event)
      let recieve = JSON.parse(event.data);
      if(recieve && recieve === "tables_created")
        test =true
    }
    socket.error = function(event) {
      console.log("ERROR CREATE TABLE RETHINK");
      reject(event)
    };
    socket.onclose = (event) => {
      console.log("CLOSED");
      resolve(test)
    };

  });
}

async function getTableData(db_name,usr_token,table){
  return new Promise(function(resolve, reject) {
    let socket = new WebSocket("wss://api.smartdom.ch/ws/" + usr_token);

    socket.onopen = function(e) {
      let payload;
      payload = {"cmd": "db('"+db_name+"').table('"+table+"').filter('true')"}
      socket.send(JSON.stringify(payload));
    };
    let data = [];
    socket.onmessage = function(event) {
      let recieve = JSON.parse(event.data);
      if(recieve && recieve.id){
        data.push(recieve)
      }
    }
    socket.error = function(event) {
      console.log("ERROR GET TABLE LIST RETHINK");
      reject(event)
    };

    socket.onclose = (event) => {
      console.log("CLOSED");
      resolve(data)
    };

  });
}

async function insert(usr_token, cmd, db , read_change=false){

  return new Promise(function(resolve, reject) {

    let socket = new WebSocket("wss://api.smartdom.ch/ws/" + usr_token);
    let ok = true;
    socket.onopen = function(e) {
      let payload;
      payload = {"cmd": cmd, "db": db, "read_change": read_change}
      socket.send(JSON.stringify(payload));
    };
    socket.onmessage = function(event) {
      if(event && event.data && event.data === "Invalid cmd")
        ok = false;
    }
    socket.error = function(event) {
      console.log("ERROR INSERT RETHINK");
      ok = false
      reject(ok)
    };
    socket.onclose = function(event) {
      resolve(ok)
    };
  });
}

async function remove(usr_token, cmd, db , read_change=false){

  return new Promise(function(resolve, reject) {

    let socket = new WebSocket("wss://api.smartdom.ch/ws/" + usr_token);
    let ok = true;
    socket.onopen = function(e) {
      let payload;
      payload = {"cmd": cmd, "db": db, "read_change": read_change}
      socket.send(JSON.stringify(payload));
    };
    socket.onmessage = function(event) {
      if(event && event.data && event.data === "Invalid cmd")
        ok = false;
    }
    socket.error = function(event) {
      console.log("ERROR INSERT RETHINK");
      ok = false;
      reject(ok)
    };
    socket.onclose = function(event) {
      console.log("CLOSED");
      resolve(ok)
    };

  });
}

async function update(usr_token, cmd, db , read_change=false){

  return new Promise(function(resolve, reject) {

    let socket = new WebSocket("wss://api.smartdom.ch/ws/" + usr_token);
    let ok = true;
    socket.onopen = function(e) {
      let payload;
      payload = {"cmd": cmd, "db": db, "read_change": read_change}
      socket.send(JSON.stringify(payload));
    };
    socket.onmessage = function(event) {
      if(event && event.data && event.data === "Invalid cmd")
        ok = false;
    }
    socket.error = function(event) {
      console.log("ERROR UPDATE RETHINK");
      ok = false;
      reject(ok)
    };
    socket.onclose = function(event) {
      console.log("CLOSED");
      resolve(ok)
    };
  });
}




async function getTableChanges(db_name,table,usr_token,read_change=false){

  return new Promise((resolve, reject) => {
    let socket = new WebSocket("wss://api.smartdom.ch/ws/" + usr_token);

    socket.onopen = function(e) {
      let payload;
      payload = {"cmd": table, "db": db_name, "read_change": read_change}
      socket.send(JSON.stringify(payload));
    };
    let data=[];
    socket.onmessage = function(event) {
      console.log(event)
      let recieve = JSON.parse(event.data);
      //list
      if(recieve.id){
        data.push(recieve);
      }
      //update
      if(recieve.new_val && recieve.old_val){
        let index_to_updated = data.findIndex(x => x.id === recieve.old_val.id)
        data[index_to_updated] = recieve.new_val;
      }
      //insert
      else if(recieve.new_val){
        data.push(recieve.new_val)
      }
      //remove
      else if(recieve.old_val){
        data.splice(data.findIndex(x => x.id === recieve.old_val.id),1);
      }
    }
    socket.error = function(event) {
      console.log("ERROR INITIALISIATION RETHINK");
      reject(event)
    };
    socket.onclose = function(event) {
      resolve(data)
      console.log("CLOSED");
    };

  });
}
async function verfiDB(db_name,usr_token){

  return new Promise(function(resolve, reject) {
    let socket = new WebSocket("wss://api.smartdom.ch/ws/" + usr_token);

    socket.onopen = function(e) {
      let payload;
      payload = {"cmd": "db_list()"}
      socket.send(JSON.stringify(payload));
    };
    let db = [];
    socket.onmessage = function(event) {
      let recieve = JSON.parse(event.data);
      if(recieve && recieve !== "" && recieve !== "rethinkdb" && typeof recieve === "string"){
        db.push(recieve)
      }
    }
    socket.error = function(event) {
      console.log("ERROR VERIF DB RETHINK");
      reject(event)
    };

    socket.onclose = (event) => {
      console.log("CLOSED");
      resolve(db.includes(db_name))
    };

  });
}
async function getTableDataByLabel(db_name,usr_token,table,label,value,order,limit,skip){
  return new Promise(function(resolve, reject) {
    let socket = new WebSocket("wss://api.smartdom.ch/ws/" + usr_token);

    socket.onopen = function(e) {
      let payload;
      payload = {"cmd": "db('"+db_name+"').table('"+table+"').filter({'"+label+"':'"+value+"'}).order_by(r.desc('"+order+"')).limit("+limit+").skip("+skip+")"}
      socket.send(JSON.stringify(payload));
    };
    let data = [];
    socket.onmessage = function(event) {
      let recieve = JSON.parse(event.data);
      if(recieve && recieve.id){
        data.push(recieve)
      }
    }
    socket.error = function(event) {
      console.log("ERROR GET TABLE LIST RETHINK");
      reject(event)
    };

    socket.onclose = (event) => {
      console.log("CLOSED");
      resolve(data)
    };

  });
}






export default {insert,remove,update,verfiDB,createDB,createTable,getTableChanges,tableList,getTableData,getTableDataByLabel};
