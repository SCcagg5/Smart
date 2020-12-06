

function initializeApp(usr_token, table, db = "oalegal", read_change=false){


  return new Promise((resolve, reject) => {
    let socket = new WebSocket("wss://api.smartdom.ch/ws/" + usr_token);

    socket.onopen = function(e) {
      console.log("Connection established");
      let payload;
      payload = {"cmd": table, "db": db, "read_change": read_change}
      socket.send(JSON.stringify(payload));
    };
    let data=[];
    socket.onmessage = function(event) {

      console.log("CHANGES")

      let recieve = JSON.parse(event.data);

      //console.log(recieve)
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
      resolve(data)
    }
    socket.error = function(event) {
      console.log("ERROR INITIALISIATION RETHINK");
    };
    socket.onclose = function(event) {
      console.log("CLOSED");
    };

  });

}


function insert(usr_token, cmd, db = "oalegal", read_change=false){

  let socket = new WebSocket("wss://api.smartdom.ch/ws/" + usr_token);

  socket.onopen = function(e) {
    console.log("Connection for insert established");
    let payload;
    payload = {"cmd": cmd, "db": db, "read_change": read_change}
    socket.send(JSON.stringify(payload));
  };
  let data=[];
  socket.onmessage = function(event) {
    //console.log("ON MESSAGE INSERT")
    //console.log(event);
  }
  socket.error = function(event) {
    console.log("ERROR INSERT RETHINK");
  };
  socket.onclose = function(event) {
    console.log("CLOSED");
  };

}

function remove(usr_token, cmd, db = "oalegal", read_change=false){

  let socket = new WebSocket("wss://api.smartdom.ch/ws/" + usr_token);

  socket.onopen = function(e) {
    console.log("Connection for delete established");
    let payload;
    payload = {"cmd": cmd, "db": db, "read_change": read_change}
    socket.send(JSON.stringify(payload));
  };
  let data=[];
  socket.onmessage = function(event) {
    //console.log("ON MESSAGE INSERT")
    console.log(event);
  }
  socket.error = function(event) {
    console.log("ERROR INSERT RETHINK");
  };
  socket.onclose = function(event) {
    console.log("CLOSED");
  };

}



export default {initializeApp,insert,remove};