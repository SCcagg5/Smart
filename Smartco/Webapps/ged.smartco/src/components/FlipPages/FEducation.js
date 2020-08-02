import React from 'react';
import Title from './FTitle';

export default (props) => (
  <div style={{marginTop: 20,}}>
    <Title>Langues</Title>
      {
          (props.langues || []).map((item,key) =>
              <div key={key} style={{fontSize: 10,}}>{item}</div>
          )
      }
  </div>
);
