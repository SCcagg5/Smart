import React from 'react';
import Title from './FTitle';
import FList, { Item } from './FList';

const FExperience = (props) => (
  <div style={{flex: 1,
    paddingTop: 30,
    paddingLeft: 15,
    '@media maxWidth: 400': {
      paddingTop: 10,
      paddingLeft: 0,
    }}}>
    <Title>Parcours professionnel</Title>
    <FList>
      {(props.parcoursP  || []).map((item, i) => (
          <Item key={i} style={{flexDirection: 'row'}}>
            {item}
          </Item>
      ))}
    </FList>
    <div style={{marginTop:30}}>
      <Title>Formations</Title>
      <FList>
        {(props.formations || []).map((item, i) => (
            <Item key={i} style={{flexDirection: 'row',}}>
              {item}
            </Item>
        ))}
      </FList>
    </div>

  </div>
);

export default FExperience;
