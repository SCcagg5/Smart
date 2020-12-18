import React from 'react';
import AtlButton, { ButtonGroup as AltButtonGroup } from '@atlaskit/button';
import { Table } from 'reactstrap';
import rethink from "../controller/rethink"
import { IconButton } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { EditOutlined } from '@material-ui/icons';

const ged_id = process.env.REACT_APP_GED_ID;
const rethinkdb_begin_name = process.env.REACT_APP_RETHINKDB_BEGIN_NAME;

const db_name = rethinkdb_begin_name+"_"+ged_id.replaceAll("-","");

export default class test extends React.Component{

  state={
    main:false,
    contacts:[]
  }

  componentDidMount() {


    rethink.createDB(db_name,"test").then( r1 => {
      if(r1 === true) console.log("NEW DB CREATED");
      if(r1 === false) console.log("DB ALREADY EXIST");
      rethink.createTable(db_name,"contacts","test").then( r2 => {
        if(r2 === true) {
          console.log("NEW TABLE CREATED")
        }
        if(r2 === false) {
          console.log("TABLE ALREADY EXIST")
        }
        this.getTableChanges('test',db_name,'table("contacts")','contacts');

      }).catch(err => console.log(err))
    }).catch(err => console.log(err))

  }

  getTableChanges(ust_token,db,table,table_name){

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
      this.setState({[table_name]:data})
    }
    socket.error = function(event) {
      console.log("ERROR INITIALISIATION TABLE");
    };
    socket.onclose = function(event) {
      console.log("CLOSED");
    };
  }

  insert_contacts(){
    let data = [
      {
        ID: "wyx87gwlh1k0lbnrks7731",
        Nom: "55th Floor Co",
        Prenom: "",
        Type: "0",
        adress: "17 rue de liberté",
        created_at: "Wed Sep 30 2020",
        date_ouvert_dossier: "2019-02-01",
        email: "test@yopmail.com",
        isActif: "true",
        phone: "+33652878888",
        remarque: "\n"
      },
      {
        ID: "wyx87gwlh1k0lbnrks7732",
        Nom: "Aide & Action",
        Prenom: "",
        Type: "0",
        adress: "17 rue de liberté",
        created_at: "Wed Sep 30 2020",
        email: "babba@yopmail.com",
        isActif: "false",
        phone: "+33652878888"
      },
      {
        ID: "wyx87gwlh1k0lbnrks7733",
        Nom: "Aide & Action 2123",
        Prenom: "hello",
        Type: "1",
        adress: "",
        created_at: "Wed Sep 30 2020",
        email: "babba@yopmail.com",
        isActif: "false"
      }
    ]
    rethink.insert('test', 'table("contacts").insert('+ JSON.stringify(data) + ')', db_name, false)
  }

  delete_contacts(id){
    console.log(id)
    rethink.remove('test', 'table("contacts").get('+JSON.stringify(id)+').delete()', db_name, false)
  }

  update_contacts(item){
    let cp = item;
    cp.adress = "17 rue de liberté";
    cp.langues=[];
    let formatedJsson = JSON.stringify(cp)
    rethink.update('test','table("contacts").get('+JSON.stringify(item.id)+').update('+ formatedJsson + ')',db_name,false);
  }

  replace_contacts(){
  }

  render() {
    return(
      <div align="center" className="mt-5">
        <AltButtonGroup>
          <AtlButton onClick={() => this.insert_contacts()}>insert</AtlButton>
          <AtlButton onClick={() => this.replace_contacts()}>Replace</AtlButton>
        </AltButtonGroup>

        <div className="ml-3 mr-3 mt-3">
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Adress</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {
                this.state.contacts.map((contact,key) =>
                  <tr key={key}>
                    <th>{key+1}</th>
                    <th>{contact.id}</th>
                    <td>{contact.nom}</td>
                    <td>{contact.prenom}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.adress}</td>
                    <td>
                      <IconButton
                        onClick={() => {
                          this.delete_contacts(contact.id)
                        }}
                      >
                        <DeleteOutlineIcon color="error"/>
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          this.update_contacts(contact)
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