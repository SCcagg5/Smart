import React from 'react';
import AtlButton, { ButtonGroup as AltButtonGroup } from '@atlaskit/button';
import { Table } from 'reactstrap';
import rethink from "../controller/rethink"
import { IconButton } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { EditOutlined } from '@material-ui/icons';

export default class test extends React.Component{



  state={
    main:false,
    users:[]
  }

  componentDidMount() {
    this.initialiseRethinkDB('test','oalegal','table("users")');
  }

  initialiseRethinkDB(ust_token,db,table){

    let socket = new WebSocket("wss://api.smartdom.ch/ws/" + ust_token);

    socket.onopen = (e) => {
      console.log("Connection established");
      let payload;
      payload = {"cmd": table, "db": db, "read_change": true}
      socket.send(JSON.stringify(payload));
    };
    let data=[];
    socket.onmessage = (event) => {

      let recieve = JSON.parse(event.data);
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
      this.setState({users:data})
    }
    socket.error = function(event) {
      console.log("ERROR INITIALISIATION RETHINK");
    };
    socket.onclose = function(event) {
      console.log("CLOSED");
    };
  }


  insert(){
    let jsoon = [
      {
        fname:"Babba",
        lname:"Amine",
        username :"Babba1313",
      }
    ]
    let formatedJsson = JSON.stringify(jsoon)
    rethink.insert('test', 'table("users").insert('+ formatedJsson + ')', "oalegal", false)
  }

  delete(id){
    console.log(id)
    rethink.remove('test', 'table("users").get('+JSON.stringify(id)+').delete()', 'oalegal', false)
  }

  update(item){
    let cp = item;
    cp.username = "Amine Babba"
    let formatedJsson = JSON.stringify(cp)
    rethink.update('test','table("users").get('+JSON.stringify(item.id)+').update('+ formatedJsson + ')','oalegal',false);
  }

  render() {
    return(
      <div align="center" className="mt-5">
        <AltButtonGroup>
          <AtlButton onClick={() => this.getAll()}>list</AtlButton>
          <AtlButton onClick={() => this.insert()}>insert</AtlButton>
        </AltButtonGroup>

        <div className="ml-3 mr-3 mt-3">
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {
                this.state.users.map((user,key) =>
                  <tr key={key}>
                    <th>{key+1}</th>
                    <th>{user.id}</th>
                    <td>{user.fname}</td>
                    <td>{user.lname}</td>
                    <td>{user.username}</td>
                    <td>
                      <IconButton
                        onClick={() => {
                          this.delete(user.id)
                        }}
                      >
                        <DeleteOutlineIcon color="error"/>
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          this.update(user)
                        }}
                      >
                        <EditOutlined color="primary"/>
                      </IconButton>
                    </td>
                  </tr>
                )
              }
              </tbody>
            </Table>
          </div>

      </div>
    )

  }


}