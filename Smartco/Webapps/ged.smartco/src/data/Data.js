import VideoCallIcon from "@material-ui/icons/VideoCall";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

let Data = {

    oa_odoo_languages:[
        {label:"Français",value:"fr_CH"},
        {label:"Anglais",value:"en_US"}
    ],

    oa_comptes_bank_factures_david: [
        {
            title: "BANQUE RAIFFEISEN DE LA VERSOIX 11, place Charles-David 1290 Versoix",
            swift_bic: "RAIFCH22XXX",
            clearing: "80808",
            label: "Compte exploitation",
            code: "CH67 8080 8002 2638 9935 8",
            odoo_id:157
        },
        {
            title: "BANQUE RAIFFEISEN DE LA VERSOIX 11, place Charles-David 1290 Versoix",
            swift_bic: "RAIFCH22XXX",
            clearing: "80808",
            label: "Compte avoirs clients",
            code: "CH02 8080 8008 5392 0077 7",
            odoo_id:156
        }
    ],
    oa_comptes_bank_factures: [
        {
            title: "BANQUE RAIFFEISEN DE LA VERSOIX 11, place Charles-David 1290 Versoix",
            swift_bic: "RAIFCH22XXX",
            clearing: "80808",
            label: "Compte exploitation CHF",
            code: "CH95 8080 8001 1709 3913 2",
            odoo_id:1
        },
        {
            title: "BANQUE RAIFFEISEN DE LA VERSOIX 11, place Charles-David 1290 Versoix",
            swift_bic: "RAIFCH22XXX",
            clearing: "80808",
            label: "Compte exploitation EURO",
            code: "CH72 8080 8001 7984 2430 1",
            odoo_id:6
        },
        {
            title: "BANQUE RAIFFEISEN DE LA VERSOIX 11, place Charles-David 1290 Versoix",
            swift_bic: "RAIFCH22XXX",
            clearing: "80808",
            label: "Compte avoirs clients",
            code: "CH83 8080 8003 4728 9475 1",
            odoo_id:4
        },
        {
            title: "BANQUE RAIFFEISEN DE LA VERSOIX 11, place Charles-David 1290 Versoix",
            swift_bic: "RAIFCH22XXX",
            clearing: "80808",
            label: "Compte courant Collaborateurs",
            code: "CH92 8080 8002 1556 2401 6",
            odoo_id:60
        },
        {
            title: "BANQUE RAIFFEISEN DE LA VERSOIX 11, place Charles-David 1290 Versoix",
            swift_bic: "RAIFCH22XXX",
            clearing: "80808",
            label: "Compte courant Camille",
            code: "CH76 8080 8007 0616 4364 7",
            odoo_id:135
        },
        {
            title: "BANQUE RAIFFEISEN DE LA VERSOIX 11, place Charles-David 1290 Versoix",
            swift_bic: "RAIFCH22XXX",
            clearing: "80808",
            label: "Compte exploitation DAVID KOHLER",
            code: "CH67 8080 8002 2638 9935 8",
            odoo_id:139
        },
        {
            title: "BANQUE RAIFFEISEN DE LA VERSOIX 11, place Charles-David 1290 Versoix",
            swift_bic: "RAIFCH22XXX",
            clearing: "80808",
            label: "Compte avoirs clients DAVID KOHLER",
            code: "CH02 8080 8008 5392 0077 7",
            odoo_id:137
        }

    ],

    oa_comptes_bank_provision: [
        {
            title: "BANQUE RAIFFEISEN DE LA VERSOIX 11, place Charles-David 1290 Versoix",
            swift_bic: "RAIFCH22XXX",
            clearing: "80808",
            label: "Compte provision",
            code: "CH11 8080 8001 1046 8489 1",
            odoo_id:5
        },
        {
            title: "BANQUE RAIFFEISEN DE LA VERSOIX 11, place Charles-David 1290 Versoix",
            swift_bic: "RAIFCH22XXX",
            clearing: "80808",
            label: "Compte provisions Collaborateurs",
            code: "CH76 8080 8005 1626 9511 4",
            odoo_id:125
        },
        {
            title: "BANQUE RAIFFEISEN DE LA VERSOIX 11, place Charles-David 1290 Versoix",
            swift_bic: "RAIFCH22XXX",
            clearing: "80808",
            label: "Compte provision Camille",
            code: "CH23 8080 8009 8912 1947 6",
            odoo_id:133
        },
        {
            title: "BANQUE RAIFFEISEN DE LA VERSOIX 11, place Charles-David 1290 Versoix",
            swift_bic: "RAIFCH22XXX",
            clearing: "80808",
            label: "Compte provision DAVID KOHLER",
            code: "CH90 8080 8001 0324 9927 0",
            odoo_id:141
        },
    ],

    oa_provision_taxs : [
        {
            label:"TVA 7.7 % incluse",
            value:"TVA 7.7 % incluse"
        },
        {
            label:"Hors TVA",
            value:"Hors TVA"
        },

    ],

    endpoint: "https://api.smartdom.ch",
    emailPatern: new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),

    sideBarItems: [
        {key: "coffre", title: "Drive", icon: "fe-folder", to: "/drive"},
        {key: "rooms", title: "Rooms", icon: "fe-grid", to: "/rooms"},
        {key: "Meet", title: "Meet", icon: "fe-video", to: "/meet"},
        {key: "Chat", title: "Chat", icon: "fe-message-circle", to: "/chat"},
        {key: "avocat", title: "Avocats", icon: "fe-users", to: "/avocats"},
    ],

    MeetMenuItem: [
        {
            nodeId: "new",
            title: "Démarrer une réunion",
            icon: VideoCallIcon
        },
        {
            nodeId: "rejoin",
            title: "Rejoindre une réunion",
            icon: MeetingRoomIcon
        },
    ],

    SocietyMenuItem: [
        {
            nodeId: "clients",
            title: "Client (Mandat)",
            icon: HomeWorkIcon
        },
        {
            nodeId: "cadeau_Entx",
            title: "Cadeau Entx",
            icon: HomeWorkIcon
        }
        /*{
            nodeId:"prospAc",
            title:"Prospect à contacter",
            icon:HomeWorkIcon
        },
        {
            nodeId:"prospEc",
            title:"Prospect en cours",
            icon:HomeWorkIcon
        }*/
    ],

    ContactsMenuItem: [
        {
            nodeId: "aia",
            title: "Détails",
            icon: PeopleAltIcon
        }
        /*{
            nodeId:"ae",
            title:"Annuaire Ecosystème",
            icon:PeopleAltIcon
        }*/
    ],

    TimeSheetMenuItem: [
        {
            nodeId: "activities",
            title: "Activités",
            icon: VideoCallIcon
        }

        /*{
            nodeId:"dashboard",
            title:"DashBoard Team",
            icon:MeetingRoomIcon
        },
        {
            nodeId:"dashboardPerson",
            title:"DashBoard Person / Week",
            icon:MeetingRoomIcon
        },
        {
            nodeId:"dashboardProject",
            title:"DashBoard Project",
            icon:MeetingRoomIcon
        },*/
    ],


    dashboardTab: {
        monday: {
            date: "8 may ",
            data: [
                {
                    title: "Internal Office (Descovery Design)",
                    work: "Emails - Good morning",
                    value: "0.25"
                },
                {
                    title: "Signage Redesign 2017 (Britsh Musuem)",
                    work: "Graphic Design - Exhibition Signage",
                    value: "1.50"
                },
                {
                    title: "Signage Redesign 2017 (Britsh Musuem)",
                    work: "Project Management - Design Review",
                    value: "1.50"
                },
                {
                    title: "Autumn 2016 Campaign Launch ",
                    work: "Emails - Good mornin",
                    value: "2.00"
                }
            ]
        }

    },

    dashbordProject: {
        acme: [
            {
                title: "Autumn 2016 Campaign Launch",
                budget: "$15,000.00",
                spent: "$4,710.00",
                chart: 30,
                romaining: "$10,290.00",
                purcent: "69%",
                costs: "$19,500.00"

            },
            {
                title: "Website Redesign 2017 - Phase 1",
                budget: "500.00",
                spent: "268.83",
                chart: 50,
                romaining: "231.17",
                purcent: "46%",
                costs: "$34,190.00"

            },

        ],
        astorian: [
            {
                title: "Penguin Tour Campaign",
                budget: "$50,000.00",
                spent: "$61,089.00",
                chart: 90,
                romaining: "-$11,089.00",
                purcent: "-22%",
                costs: "$26,471.90"

            },
            {
                title: "Print Campaign",
                budget: "500.00",
                spent: "268.83",
                chart: 40,
                romaining: "231.17",
                purcent: "46%",
                costs: "$34,190.00"

            },
            {
                title: "Web Design",
                budget: "500.00",
                spent: "268.83",
                chart: 70,
                romaining: "231.17",
                purcent: "46%",
                costs: "$34,190.00"

            },
        ],
        barrington: [
            {
                title: "Magazine Design",
                budget: "300.00  ",
                spent: "167.49",
                chart: 60,
                romaining: "132.51",
                purcent: "44%",
                costs: "$21,190.00"

            },
            {
                title: "Spring 2017 Product Launch ",
                budget: "500.00",
                spent: "268.83",
                chart: 50,
                romaining: "231.17",
                purcent: "46%",
                costs: "$34,190.00"

            },

        ],
        british: [
            {
                title: "Signage Redsign 2017",
                budget: "500.00",
                spent: "268.83",
                chart: 50,
                romaining: "231.17",
                purcent: "46%",
                costs: "$34,190.00"

            },
        ],
        broadstreet: [
            {
                title: "Product launch",
                budget: "500.00",
                spent: "268.83",
                chart: 10,
                romaining: "231.17",
                purcent: "46%",
                costs: "$34,190.00"

            },
        ]
    },


    titres: [
        {value: "", label: ""},
        {value: "associe", label: "Associés"},
        {value: "conseil", label: "Conseil"},
        {value: "ollaborateur", label: "Collaborateurs"},
        {value: "avocats-stagiaire", label: "Avocats-stagiaires"},
        {value: "personnel-administratif", label: "Personnel Administratif"}
    ],
    comptabilite: [
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

    salaire: [
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

    domainesAct: [
        "Droits des sociétés et contrats commerciaux", "Droit bancaire et financier", "Négoce de valeurs mobilières",
        "Matières premières et transport maritime", "Contentieux", "Permis de séjour et de travail", "Naturalisation suisse",
        "Droit pénal / Criminalité économique", "Expatriés et relocalisation", "Droit immobilier",
        "Toutes questions légales en relation avec les expatriés en Suisse",
    ],
    affiliations: [
        "Membre de l’Ordre des Avocats de Genève",
        "Membre de l’Association Genevoise des Droits des Affaires",
        "Membre de l’Association des avocats d’affaires internationaux (AIBL)",
        "Membre de l’Association Genevoise des Droits des Affaires",
        "Membre de l’Association du Barreau de New York",
        "Membre de l’Association du Barreau Américain (ABA)"
    ],
    langues: [
        "Anglais", "Français", "Allemand", "Espagnol"
    ],

    impot: [
        'Déclaration impôt entreprise',
        'Déclaration impôt privé (pas sur que ça doit faire)',
        'Implémentation régimes fiscal ',
        'Déclaration impôt anticipé divident',
        'Déclaration droit de timbre augumentation capital'
    ],

    Acces: [
        {label: "Lire", value: "read"},
        {label: "Editer", value: "edit"},
        {label: "Administrateur", value: "administrate"},
        {label: "Partager", value: "share"}
    ],

    times: [
        {text: "08:00", showConfirm: false, show: true},
        {text: "08:30", showConfirm: false, show: true},
        {text: "09:00", showConfirm: false, show: true},
        {text: "09:30", showConfirm: false, show: true},
        {text: "10:00", showConfirm: false, show: true},
        {text: "10:30", showConfirm: false, show: true},
        {text: "11:00", showConfirm: false, show: true},
        {text: "11:30", showConfirm: false, show: true},
        {text: "12:00", showConfirm: false, show: true},
        {text: "12:30", showConfirm: false, show: true},
        {text: "13:00", showConfirm: false, show: true},
        {text: "13:30", showConfirm: false, show: true},
        {text: "14:00", showConfirm: false, show: true},
        {text: "14:30", showConfirm: false, show: true},
        {text: "15:00", showConfirm: false, show: true},
        {text: "15:30", showConfirm: false, show: true},
        {text: "16:00", showConfirm: false, show: true},
        {text: "16:30", showConfirm: false, show: true},
        {text: "17:00", showConfirm: false, show: true},
    ],

    datas: {
        labels: ['January'],
        datasets: [
            {
                label: 'My First dataset',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 10,
                pointRadius: 1,
                pointHitRadius: 20,
                data: [
                    {
                        x: 15,
                        y: 7.5,
                        r: 15
                    }
                ]
            }, {
                label: 'My First dataset',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'red',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 10,
                pointRadius: 1,
                pointHitRadius: 20,
                data: [
                    {
                        x: 5,
                        y: 15,
                        r: 15
                    }
                ]
            }
        ]
    },
    MenuProps: {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    },
    secteurs: [
        "", "bancaire", "Corporate", "FinTech", "Litige", "Droit de bail", "Droit du travail"
    ],
    secteurs2: [
        "corporate", "litige"
    ],
    contactTypes: [
        {value: "", label: ""},
        {value: "0", label: "Corporate"},
        {value: "1", label: "Litige"}
    ],

    timeSuggestions: [
        "00h05", "00h10", "00h15", "00h30", "00h45", "01h00", "01h15", "01h30", "01h45", "02h00", "02h15", "02h30", "02h45", "03h00", "03h15", "03h30", "03h45", "04h00", "04h15", "04h30",
        "04h45", "05h00", "06h00", "07h00", "08h00", "09h00", "10h00"
    ],

    lf_templates: [
        {value: "0", label: "Date seulement"},
        {value: "1", label: "Date + Description"},
        {value: "2", label: "Date + Nom avocat"},
        {value: "3", label: "Date + Description + Nom avocat"},
        {value: "4", label: "Description seulemnt"},
        {value: "5", label: "Nom avocat seulemnt"},
        {value: "6", label: "Nombre d'heures seulemnt"},
        {value: "7", label: "Description + Nom avocat"},
        {value: "8", label: "Description + Nombre d'heures"},
        {value: "9", label: "Description + Nom avocat + Nombre d'heures"},
    ],

    oa_litige_folders: ["ADMIN (Lettre d'engagement)", "MÉMOIRE", "CHARGE DE PIECES", "CONVOCATIONS", "COMPTABILITE", "CORRESPONDANCE", "INTERNE ****", "NOTES", "PV RENDEZ-VOUS", "PROCEDURES", "RECHERCHES JURIDIQUES"],
    oa_corporate_folders: ["ADMIN (Lettre d'engagement)", "ASSEMBLEE GENERALE EXTRAORDINAIRE", "ASSEMBLEE GENERALE ORDINAIRE", "DECISION DU CONSEIL D'ADMINISTRATION", "CONVENTIONS D'ACTIONNAIRES", "COMPTABILITE", "CONTRATS", "CORRESPONDANCE", "INTERNE ****", "CREATION DE SOCIETE", "PV RENDEZ-VOUS", "DOCUMENTS", "NOTES", "RECHERCHES JURIDIQUES"]
}
export default Data;
