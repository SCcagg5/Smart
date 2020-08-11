import FireplaceIcon from "@material-ui/icons/Fireplace";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

let Data = {
    endpoint : "https://api.smartdom.ch",
    emailPatern : new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),

    sideBarItems: [
        {key: "coffre", title: "Drive", icon: "fe-folder", to: "/drive"},
        {key: "rooms", title: "Rooms", icon: "fe-grid", to: "/rooms"},
        {key: "Meet", title: "Meet", icon: "fe-video", to: "/meet"},
        {key: "Chat", title: "Chat", icon: "fe-message-circle", to: "/chat"},
        {key: "avocat", title: "Avocats", icon: "fe-users", to: "/avocats"},
    ],

    MeetMenuItem : [
        {
            nodeId:"01",
            title:"Démarer une réunion",
            icon:VideoCallIcon
        },
        {
            nodeId:"02",
            title:"Réjoindre une réunion",
            icon:MeetingRoomIcon
        },
    ],

    rooms:[
        {
            nodeId: "1",
            title: "Project Clover",
            desc: "***",
            icon: FireplaceIcon,
            assignedTo: [],
            tasks: [],
            chat: [],
            files: [],
            created_at: new Date(),
        },
        {
            nodeId: "2",
            title: "Salona vidéo",
            desc: "***",
            icon: FireplaceIcon,
            assignedTo: [],
            tasks: [],
            chat: [],
            files: [],
            created_at: new Date(),
        },
        {
            nodeId: "3",
            title: "It white papers",
            desc: "***",
            icon: FireplaceIcon,
            assignedTo: [],
            tasks: [],
            chat: [],
            files: [],
            created_at: new Date(),
        }
    ],

    titres : [
        "","Associés", "Conseil", "collaborateurs", "Avocats-stagiaires", "Personnel Administratif"
    ],
    comptabilite : [
        'Tenue de la comptabilité financiére',
        'Bouclement des comptes',
        'Tenue de la comptabilité des debiteurs',
        'Tenue de la comptabilité des salaires',
        'Tenue de la comptabilité des titres',
        'Tenue de la comptabilité des immobilisations',
        'Comptabilisation augumentation de capital',
        'Budgétisation , plan de trésorerie',
        'Plan financier',
        'Reporting et controlling',
        'preparation compte annuels',
        'Consolidation',
        'IFRS'
    ],

    salaire : [
        'Fiche de salaires',
        'Souscription assurances sociales',
        'Entrées / sorties employées',
        'Impôt à la source',
        'Décomptes assurances sociales',
        'Certificats de salaire',
        'Choix / analyse de régime TVA',
        'Asujettisement',
        'Décomptes TVA'
    ],

    domainesAct : [
        "Droits des sociétés et contrats commerciaux" , "Droit bancaire et financier", "Négoce de valeurs mobilières" ,
        "Matières premières et transport maritime" , "Contentieux" ,"Permis de séjour et de travail","Naturalisation suisse",
        "Droit pénal / Criminalité économique" , "Expatriés et relocalisation" , "Droit immobilier",
        "Toutes questions légales en relation avec les expatriés en Suisse",
    ],
    affiliations : [
        "Membre de l’Ordre des Avocats de Genève",
        "Membre de l’Association Genevoise des Droits des Affaires",
        "Membre de l’Association des avocats d’affaires internationaux (AIBL)",
        "Membre de l’Association Genevoise des Droits des Affaires",
        "Membre de l’Association du Barreau de New York",
        "Membre de l’Association du Barreau Américain (ABA)"
    ],
    langues : [
        "Anglais","Français","Allemand","Espagnol"
    ],

    impot : [
        'Déclaration impôt entreprise',
        'Déclaration impôt privé (pas sur que ça doit faire)',
        'Implémentation régimes fiscal ',
        'Déclaration impôt anticipé divident',
        'Déclaration droit de timbre augumentation capital'
    ],

    Acces: [
        'Lire',
        'Editer',
        'Administrateur',
        'Partager',
    ],


    results: {
        result: [
            {
                "ext": "pdf",
                "date": "1597055800355",
                "file_id": "7b54a2a6-2059-467f-a415-17b1ada7c043",
                "name": "D_Vertrag",
                "score": 1.4843425,
                "match": {
                    "perfect": 20,
                    "partial": 38,
                    "text": [
                        "for Test Account         ",
                        "for Test Account All-in Signing",
                        "a test account for Swisscom's",
                        "to test the interaction of its",
                        "several test accounts The structure of",
                        "and Test Scenarios (Claimed ID) Please",
                        "All test certificates are in principle",
                        "as test certificates. These cannot therefore",
                        "your test account for personal signatures",
                        "can test your subscriber application depending",
                        "the test situation. These also differ",
                        "the test account jurisdiction CH (ZertES",
                        "the test account jurisdiction EU (eIDAS",
                        "want test without identification of the",
                        "the test phase but first test",
                        "to test the connection to the"
                    ]
                }
            },
            {
                "ext": "pdf",
                "date": "1597080579123",
                "file_id": "0b24ae1a-b604-45a7-9a80-8305d58a24ff",
                "name": "ExamC",
                "score": 1.4577513,
                "match": {
                    "perfect": 20,
                    "partial": 140,
                    "text": [
                        "de test ?  a) Prévention des",
                        "de test qui pourrait être utilis",
                        "ce test unitaire efficacement ? a) Bonnes",
                        "de test suivantes : 1. Sélection",
                        "de test et à la manière",
                        "le test va contribuer au succ",
                        "de test ? a) Analyser un d",
                        "de test c) Attribution d'une",
                        "de test d) Écrire une user",
                        "un test de performances dans le",
                        "ce test ? a) Un test fonctionnel",
                        "du test d'intégration b",
                        "Un test non fonctionnel au niveau",
                        "du test d'intégration c",
                        "Un test fonctionnel pendant le niveau",
                        "de test des composants d) Un",
                        " test non fonctionnel pendant le",
                        "de test des composants 10/ Laquelle",
                        "de test Lequel de la liste",
                        "de test avec le type de"
                    ]
                }
            },
            {
                "ext": "pdf",
                "date": "1597080523532",
                "file_id": "9eaa9a8d-0ce5-4a9c-8bf1-dfe2892185b5",
                "name": "CTFL-Syllabus-2018",
                "score": 1.3861768,
                "match": {
                    "perfect": 20,
                    "partial": 2253,
                    "text": [
                        "2 Test et débogage ..",
                        "et test ..............",
                        "de test ..............",
                        "de test dans le contexte ..",
                        "du test ..............",
                        "de test et les produits d",
                        "du test...............",
                        "1 Test de composants .....",
                        "2 Test d'intégration ..",
                        "3 Test système .....",
                        "4 Test d'acceptation .....",
                        "de test et niveaux de test",
                        "de test et leurs caractéristiques"
                    ]
                }
            }
        ],
        possible: []
    },
}
export default Data;