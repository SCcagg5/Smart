import React from 'react';
import Title from './FTitle';

const FSkills = (props) => (
  <div style={{marginTop:40}}>
    <Title>Domaines d'intérêt, loisirs et sports</Title>
      <ul>
          {(props.hobbies || []).map((item, i) => (
              <li key={i}>{item}</li>
          ))}
      </ul>
  </div>
);

export default FSkills;
