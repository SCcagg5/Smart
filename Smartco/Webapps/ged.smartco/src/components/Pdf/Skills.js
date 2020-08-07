import React from 'react';
import Title from './Title';
import List, { Item } from './List';
import {View} from '@react-pdf/renderer';

const Skills = (props) => (
  <View style={{marginTop:40}}>
    <Title>Domaines d'intérêt, loisirs et sports</Title>
      <List>
          {(props.hobbies || []).map((item, i) => (
              <Item key={i}>{item}</Item>
          ))}
      </List>
  </View>
);
export default Skills;