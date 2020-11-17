import React from 'react';

import Title from './Title';
import List, {Item} from './List';
import {View, StyleSheet} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingLeft: 15,
        '@media max-width: 400': {
            paddingTop: 10,
            paddingLeft: 0,
        },
    },
    entryContainer: {
        marginBottom: 10,
    },
    date: {
        fontSize: 11,
        //fontFamily: 'Lato Italic',
    },
    detailContainer: {
        flexDirection: 'row',
    },
    detailLeftColumn: {
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
    },
    detailRightColumn: {
        flexDirection: 'column',
        flexGrow: 9,
    },
    bulletPoint: {
        fontSize: 10,
    },
    details: {
        fontSize: 10,
        //fontFamily: 'Lato',
    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    leftColumn: {
        flexDirection: 'column',
        flexGrow: 9,
    },
    rightColumn: {
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'flex-end',
        justifySelf: 'flex-end',
    },
    title: {
        fontSize: 11,
        color: 'black',
        textDecoration: 'none',
        //fontFamily: 'Lato Bold',
    },
});

const Experience = (props) => (
    <View style={styles.container}>
        {
            props.parcoursP.length > 0 &&
            <View>
                <Title>Parcours professionnel</Title>
                <List>
                    {(props.parcoursP || []).map((item, i) => (
                        <Item key={i} style={styles.detailContainer}>
                            {item}
                        </Item>
                    ))}
                </List>
            </View>
        }
        {
            props.formations.length > 0 &&
            <View style={{marginTop: 30}}>
                <Title>Formations</Title>
                <List>
                    {(props.formations || []).map((item, i) => (
                        <Item key={i} style={styles.detailContainer}>
                            {item}
                        </Item>
                    ))}
                </List>
            </View>
        }
      {
        props.affiliations.length > 0 &&
        <View style={{marginTop: 30}}>
          <Title>Affiliations</Title>
          <List>
            {(props.affiliations || []).map((item, i) => (
                <Item key={i} style={styles.detailContainer}>
                  {item}
                </Item>
            ))}
          </List>
        </View>

      }
      {
        props.domainesAct.length > 0 &&
        <View style={{marginTop: 30}}>
          <Title>Domaines d'activités</Title>
          <List>
            {(props.domainesAct || []).map((item, i) => (
                <Item key={i} style={styles.detailContainer}>
                  {item}
                </Item>
            ))}
          </List>
        </View>

      }


    </View>
);

export default Experience;
