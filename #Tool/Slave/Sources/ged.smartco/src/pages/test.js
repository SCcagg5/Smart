import React from 'react';
import AtlButton, { ButtonGroup as AltButtonGroup } from '@atlaskit/button';
import { Table } from 'reactstrap';
import rethink from "../controller/rethink"
import { IconButton } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


export default class test extends React.Component{



  state={
    main:false,
    users:[]
  }

  componentDidMount() {
    rethink.initializeApp('test', 'table("users")', "oalegal", true).then( data => {
      console.log("BABBA")
      setTimeout(() => {
        this.setState({ users: data })
      },250);
    })
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
    this.componentDidMount()
  }

  delete(id){
    console.log(id)
    rethink.remove('test', 'table(users).get('+id+').delete()', 'oalegal', false)
    this.componentDidMount()
  }

  render() {
    return(
      <div align="center" className="mt-5">
        <AltButtonGroup>
          <AtlButton onClick={() => this.getAll()}>list</AtlButton>
          <AtlButton onClick={() => this.insert()}>insert</AtlButton>
          <AtlButton onClick={() => this.update()}>upddate</AtlButton>
          <AtlButton onClick={() => {this.setState({main:!this.state.main})}}>delete</AtlButton>
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