import React from 'react';

import Title from './Title';
import List, { Item } from './List';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  title: {
    //fontFamily: 'Lato Bold',
    fontSize: 11,
    marginBottom: 10,
  },
  skills: {
    //fontFamily: 'Lato',
    fontSize: 10,
    marginBottom: 10,
  },
});

const SkillEntry = ({ name, skills }) => (
  <View>
    <List>
      {skills.map((skill, i) => (
        <Item key={i}>{skill}</Item>
      ))}
    </List>
  </View>
);

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
