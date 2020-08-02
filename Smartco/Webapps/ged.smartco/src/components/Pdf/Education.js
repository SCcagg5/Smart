import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';
import Title from './Title';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  school: {
    //fontFamily: 'Lato Bold',
    fontSize: 10,
  },
  degree: {
    //fontFamily: 'Lato',
    fontSize: 10,
  },
  candidate: {
    //fontFamily: 'Lato Italic',
    fontSize: 10,
  },
});

export default (props) => (
  <View style={styles.container}>
    <Title>Langues</Title>
      {
          (props.langues || []).map((item,key) =>
              <Text key={key} style={styles.school}>{item}</Text>
          )
      }
  </View>
);
