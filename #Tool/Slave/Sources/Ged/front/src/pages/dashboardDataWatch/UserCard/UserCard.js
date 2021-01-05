import React from 'react';
import { Card } from 'react-bootstrap';
const UserCard = (props) => {
  const style = {
    backgroundColor: '#272727',
    color: '#ffffff'
  };
  return (
    <Card  className="mb-2 text-center" style={style}>
      <Card.Body>
        <Card.Title>
          <text style={{color:"white"}}> {props.user.nom + " "+ props.user.prenom}</text>
        </Card.Title>
        <Card.Subtitle>
          <text style={{color:"white"}}>  Google Fit Stats are aggregated below! </text>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
export default UserCard;
