import React from 'react';
import AtlButton, { ButtonGroup as AltButtonGroup } from '@atlaskit/button';

function call(usr_token, cmd, db = "test", read_change=false){
  let socket = new WebSocket("wss://api.smartdom.ch/ws/" + usr_token);
  socket.onopen = function(e) {
    console.log("[open] Connection established");
    let payload;
    payload = {"cmd": cmd, "db": db, "read_change": read_change}
    socket.send(JSON.stringify(payload));
  };
  let data=[];
  socket.onmessage = function(event) {
    console.log(event.data)
    let recieve = JSON.parse(event.data);
    console.log(recieve)
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
    //console.log(data)
  };
  socket.error = function(event) {
    console.log(`[error]`);
  };
  socket.onclose = function(event) {
    console.log(`[close]`);
  };
}

export default class test extends React.Component{


  state={

  }

  //call('test', 'table("authors")', "test", true) // controle changes
  //call('test', "table_create('users33')", "test", true)  // create table

  getAll(){


  }

  insert(){
    let jsoon = [
      {
        name:"facture 2023",
        created_at:new Date(),
        total :2023,
        lignes_factures:[
          {
            title:"lf-1",
            prix:1200,
          },
          {
            title:"lf-2",
            prix:560,
          }
        ]
      }
    ]
    let formatedJsson = JSON.stringify(jsoon)
    call('test', 'table("factures").insert('+ formatedJsson + ')', "test", false)  //
  }

  update(){

  }

  delete(){

  }



  render() {
    return(
      <div align="center" className="mt-5">
        <AltButtonGroup>
          <AtlButton onClick={() => this.getAll()}>list</AtlButton>
          <AtlButton onClick={() => this.insert()}>insert</AtlButton>
          <AtlButton onClick={() => this.update()}>upddate</AtlButton>
          <AtlButton onClick={() => this.delete()}>delete</AtlButton>
        </AltButtonGroup>

      </div>
    )

  }


}