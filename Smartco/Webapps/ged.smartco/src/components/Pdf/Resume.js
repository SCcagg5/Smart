import React from 'react';

import ReactPDF, {
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
        //fontFamily: 'Lato Bold',
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

/*Font.register( {
    family: 'Open Sans',
    src: `./fonts/fonts/Open_Sans/OpenSans-Regular.ttf`,
});
Font.register( {
    family: 'Lato',
    src: `./fonts/fonts/Lato/Lato-Regular.ttf`,
});
Font.register( {
    family: 'Lato Italic',
    src: `./fonts/fonts/Lato/Lato-Italic.ttf`,
});
Font.register( {
    family: 'Lato Bold',
    src: `./fonts/fonts/Lato/Lato-Bold.ttf`,
});*/

const Content = props => (
    <Page key={2} {...props} style={styles.page}>
        <Header name={props.name} speciality={props.speciality} email={props.email} />
        <View>
            <Image
            src={props.image}
            style={styles.image}
            />
        </View>
        <View style={{marginTop:30}}>
            <Title>À propos</Title>
            <Text style={{fontSize: 10}}>{props.about || ""}</Text>
        </View>
        <View style={{marginTop:30}}>
            <Title>Famille & Vie privée</Title>
            <Text style={{fontSize: 10}}>{props.personalLife || ""}</Text>
        </View>
        <View style={styles.container}>
            <View style={styles.leftColumn}>
                {/*<Image
                    src={props.image}
                    style={styles.image}

                />*/}
                <Education langues={props.langues} />
                <Skills hobbies={props.hobbies} />
            </View>
            <Experience parcoursP={props.parcoursP} formations={props.formations} />
        </View>
        {/*<Text style={styles.footer}>This IS the candidate you are looking for</Text>*/}
    </Page>
);

const Resume = (props) => (
    console.log(props),
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
        />
        {/*<Resume orientation="landscape" size="A4" />
        <Resume size={[380, 1250]} />*/}
    </Document>
);

export default Resume;
