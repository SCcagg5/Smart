import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const CardComponent = (props) => {
  const style = {
    backgroundColor: '#272727',
    color: '#ffffff'
  };
  return (
    <Card  className="mb-2 text-center" style={style}>
      <Card.Body>
        <Card.Title>
          <text style={{color:"white"}}>   {props.element.title}</text>
        </Card.Title>
        <Card.Subtitle>
          <text style={{color:"white"}}>   {props.element.value}</text>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
export default CardComponent;
