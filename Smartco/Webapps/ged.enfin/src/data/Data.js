import VideoCallIcon from "@material-ui/icons/VideoCall";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

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
            nodeId:"new",
            title:"Démarrer une réunion",
            icon:VideoCallIcon
        },
        {
            nodeId:"rejoin",
            title:"Rejoindre une réunion",
            icon:MeetingRoomIcon
        },
    ],

    SocietyMenuItem : [
        {
            nodeId:"clients_mondat",
            title:"Client (Mandat)",
            icon:HomeWorkIcon
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

    ContactsMenuItem : [
        {
            nodeId:"aia",
            title:"Détails",
            icon:PeopleAltIcon
        }
        /*{
            nodeId:"ae",
            title:"Annuaire Ecosystème",
            icon:PeopleAltIcon
        }*/
    ],

    TimeSheetMenuItem : [
        {
            nodeId:"activities",
            title:"Activités",
            icon:VideoCallIcon
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


    dashboardTab:{
        monday:{
            date:"8 may ",
            data:[
                {
                    title:"Internal Office (Descovery Design)",
                    work:"Emails - Good morning",
                    value:"0.25"
                },
                {
                    title:"Signage Redesign 2017 (Britsh Musuem)",
                    work:"Graphic Design - Exhibition Signage",
                    value:"1.50"
                },
                {
                    title:"Signage Redesign 2017 (Britsh Musuem)",
                    work:"Project Management - Design Review",
                    value:"1.50"
                },
                {
                    title:"Autumn 2016 Campaign Launch ",
                    work:"Emails - Good mornin",
                    value:"2.00"
                }
            ]
        }

    },

    dashbordProject:{
        acme:[
            {
                title:"Autumn 2016 Campaign Launch",
                budget:"$15,000.00",
                spent:"$4,710.00",
                chart:30,
                romaining:"$10,290.00",
                purcent:"69%",
                costs:"$19,500.00"

            },
            {
                title:"Website Redesign 2017 - Phase 1",
                budget:"500.00",
                spent:"268.83",
                chart:50,
                romaining:"231.17",
                purcent:"46%",
                costs:"$34,190.00"

            },

        ],
        astorian:[
            {
                title:"Penguin Tour Campaign",
                budget:"$50,000.00",
                spent:"$61,089.00",
                chart:90,
                romaining:"-$11,089.00",
                purcent:"-22%",
                costs:"$26,471.90"

            },
            {
                title:"Print Campaign",
                budget:"500.00",
                spent:"268.83",
                chart:40,
                romaining:"231.17",
                purcent:"46%",
                costs:"$34,190.00"

            },
            {
                title:"Web Design",
                budget:"500.00",
                spent:"268.83",
                chart:70,
                romaining:"231.17",
                purcent:"46%",
                costs:"$34,190.00"

            },
        ],
        barrington:[
            {
                title:"Magazine Design",
                budget:"300.00  ",
                spent:"167.49",
                chart:60,
                romaining:"132.51",
                purcent:"44%",
                costs:"$21,190.00"

            },
            {
                title:"Spring 2017 Product Launch ",
                budget:"500.00",
                spent:"268.83",
                chart:50,
                romaining:"231.17",
                purcent:"46%",
                costs:"$34,190.00"

            },

        ],
        british:[
            {
                title:"Signage Redsign 2017",
                budget:"500.00",
                spent:"268.83",
                chart:50,
                romaining:"231.17",
                purcent:"46%",
                costs:"$34,190.00"

            },
        ],
        broadstreet:[
            {
                title:"Product launch",
                budget:"500.00",
                spent:"268.83",
                chart:10,
                romaining:"231.17",
                purcent:"46%",
                costs:"$34,190.00"

            },
        ]
    },


    titres : [
        "","Associés", "Conseil", "collaborateurs", "Avocats-stagiaires", "Personnel Administratif"
    ],

    domaines:[
        "COMPTABILITÉ","SALAIRES","TVA","IMPOTS","Droit"
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
        "Droits des sociétés et contrats commerciaux" ,
        "Droit bancaire et financier",
        "Négoce de valeurs mobilières" ,
        "Matières premières et transport maritime" ,
        "Contentieux" ,
        "Permis de séjour et de travail",
        "Naturalisation suisse",
        "Droit pénal / Criminalité économique" ,
        "Expatriés et relocalisation" ,
        "Droit immobilier",
        "Toutes questions légales en relation avec les expatriés en Suisse",
    ],
    affiliations : [
        "Membre de l’Ordre des Avocats de Genève",
        "Membre de l’Association Genevoise des Droits des Affaires",
        "Membre de l’Association des avocats d’affaires internationaux (AIBL)",
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

    datas : {
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
            },{
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
    MenuProps : {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    },
    secteurs:[
        "","bancaire","Corporate","FinTech","Litige","Droit de bail","Droit du travail"
    ],
    secteurs2:[
        "corporate","litige"
    ],
    contactTypes:[
        {value:"",label:""},
        {value:"0",label:"Corporate"},
        {value:"1",label:"Litige"}
    ],

    timeSuggestions: [
        "0:10","0:15","0:20","0:30","0:40","0:50","0:60","0:70","0:80","0:90","1","1:5","2","2:5","3","3:5","4","4:5","5"
    ],

    lf_templates:[
        {value:"0",label:"Date seulement"},
        {value:"1",label:"Date + Description"},
        {value:"2",label:"Date + Nom avocat"},
        {value:"3",label:"Date + Description + Nom avocat"},
        {value:"4",label:"Description seulemnt"},
        {value:"5",label:"Nom avocat seulemnt"},
        {value:"6",label:"Nombre d'heures seulemnt"},
        {value:"7",label:"Description + Nom avocat"},
        {value:"8",label:"Description + Nombre d'heures"},
        {value:"9",label:"Description + Nom avocat + Nombre d'heures"},
    ]
}
export default Data;