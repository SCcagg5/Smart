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
          {props.element.title}
        </Card.Title>
        <Card.Subtitle>
          {props.element.value}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
export default CardComponent;
