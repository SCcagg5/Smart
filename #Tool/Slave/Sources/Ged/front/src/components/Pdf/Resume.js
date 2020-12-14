import React from 'react';
import{
    Text,
    Document,
    Page,
    StyleSheet,
    Image,
    View,
} from '@react-pdf/renderer';
import Header from './Header';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';
import Title from "./Title";

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        '@media max-width: 400': {
            flexDirection: 'column',
        },
    },
    image: {
        marginTop:20,
        marginBottom: 10,
        width:200,height:200,objectFit:"cover"
    },
    leftColumn: {
        flexDirection: 'column',
        width: 170,
        paddingTop: 30,
        paddingRight: 15,
        '@media max-width: 400': {
            width: '100%',
            paddingRight: 0,
        },
        '@media orientation: landscape': {
            width: 200,
        },
    },
    footer: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 25,
        paddingTop: 10,
        borderWidth: 3,
        borderColor: 'gray',
        borderStyle: 'dashed',
        '@media orientation: landscape': {
            marginTop: 10,
        },
    },
});

const Content = props => (
    <Page key={2} {...props} style={styles.page}>
        <Header name={props.name} speciality={props.speciality} email={props.email} />
        <View>
            <Image
            src={props.image}
            style={styles.image}
            />
        </View>
        {
            props.about &&
            <View style={{marginTop:30}}>
                <Title>À propos</Title>
                <Text style={{fontSize: 10}}>{props.about || ""}</Text>
            </View>
        }
        {
            props.personalLife &&
            <View style={{marginTop:30}}>
                <Title>Famille & Vie privée</Title>
                <Text style={{fontSize: 10}}>{props.personalLife || ""}</Text>
            </View>
        }
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                {
                    props.langues.length > 0 &&
                    <Education langues={props.langues} />
                }
                {
                    props.hobbies.length > 0 &&
                    <Skills hobbies={props.hobbies} />
                }
            </View>
            <Experience parcoursP={props.parcoursP} formations={props.formations} affiliations={props.affiliations} domainesAct={props.domainesAct} />
        </View>
    </Page>
);

const Resume = (props) => (
    <Document
        author={props.author || ""}
        keywords=""
        subject={props.subject || ""}
        title={props.title || ""}
    >
        <Page key={1} {...props} style={{padding: 15}}>
            <View>
                <Image src={props.firstPageImage}/>
            </View>
        </Page>
        <Content size="A4" name={props.name} speciality={props.speciality} email={props.email} image={props.image}
                 about={props.about} personalLife={props.personalLife} parcoursP={props.parcoursP}
                 langues={props.langues} hobbies={props.hobbies} formations={props.formations}
                 affiliations={props.affiliations}
                 domainesAct={props.domainesAct}
        />
    </Document>
);
export default Resume;