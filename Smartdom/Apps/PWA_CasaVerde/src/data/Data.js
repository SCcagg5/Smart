import VideoCallIcon from "@material-ui/icons/VideoCall";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FolderIcon from '@material-ui/icons/Folder';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


let Data = {

    primary_color:"#2CB33A",
    secondary_color:"#ff1493",

    default_b64_logo : "data:image/png;base64,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",

    emailPatern : new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),

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

    ContactsMenuItem : [
        {
            nodeId:"aia",
            title:"Détails",
            icon:PeopleAltIcon
        }
    ],

    SocietyMenuItem : [
        {
            nodeId:"clients_mondat",
            title:"Clients (Mandat)",
            icon:HomeWorkIcon
        }
    ],

    TimeSheetMenuItem : [
        {
            nodeId:"activities",
            title:"Activités",
            icon:VideoCallIcon
        },

        {
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
        },
    ],

    marketplaceMenuItem : [
        {
            nodeId:"recettes",
            title:"Editeur de recettes",
            icon:FastfoodIcon
        },
        {
            nodeId:"RH_CUISINE",
            title:"RH Cuisine",
            icon:FolderIcon
        }
        ,
        {
            nodeId:"RH_Support_markt",
            title:"RH Support markt",
            icon:FolderIcon
        }
        ,
        {
            nodeId:"RH_Distribution",
            title:"RH Distribution",
            icon:FolderIcon
        }
        ,
        {
            nodeId:"RH_Support_ponctuel",
            title:"RH Support Ponctuel",
            icon:FolderIcon
        }
        ,
        {
            nodeId:"RH_DK",
            title:"Ressources Dark Kitchen(Locaux)",
            icon:FolderIcon
        },
        {
            nodeId:"RH_HW_Livr",
            title:"HW Livraison(scooter)",
            icon:FolderIcon
        }
    ],




    fonctions:[
        {value:"avocat",label:"Avocat"},
        {value:"notaire",label:"Notaire"},
        {value:"expert_comptable",label:"Expert comptable"},
        {value:"audit",label:"Audit"},
        {value:"CFO",label:"CFO(financier)"},
    ],

    titres : [
        {value:"",label:""},
        {value:"associe",label:"Associés"},
        {value:"conseil",label:"Conseil"},
        {value:"ollaborateur",label:"Collaborateurs"},
        {value:"avocats-stagiaire",label:"Avocats-stagiaires"},
        {value:"personnel-administratif",label:"Personnel Administratif"}
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

    impot : [
        'Déclaration impôt entreprise',
        'Déclaration impôt privé (pas sur que ça doit faire)',
        'Implémentation régimes fiscal ',
        'Déclaration impôt anticipé divident',
        'Déclaration droit de timbre augumentation capital'
    ],

    domaines:[
        "COMPTABILITÉ","SALAIRES","TVA","IMPOTS","Droit"
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

    secteurs:[
        "","bancaire","Corporate","FinTech","Litige","Droit de bail","Droit du travail"
    ],
    secteurs2:[
        "corporate","litige"
    ],

    Acces: [
        {label:"Lire",value:"read"},
        {label:"Editer",value:"edit"},
        {label:"Administrateur",value:"administrate"},
        {label:"Partager",value:"share"}
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
    ],

    timeSuggestions: [
        "00h05","00h10","00h15","00h30","00h45","01h00","01h15","01h30","01h45","02h00","02h15","02h30","02h45","03h00","03h15","03h30","03h45","04h00","04h15","04h30",
        "04h45","05h00","06h00","07h00","08h00","09h00","10h00"
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




    oa_litige_folders:["ADMIN (Lettre d'engagement)","MÉMOIRE","CHARGE DE PIECES","CONVOCATIONS","COMPTABILITE","CORRESPONDANCE","INTERNE ****","NOTES","PV RENDEZ-VOUS","PROCEDURES","RECHERCHES JURIDIQUES"],
    oa_corporate_folders:["ADMIN (Lettre d'engagement)","ASSEMBLEE GENERALE EXTRAORDINAIRE","ASSEMBLEE GENERALE ORDINAIRE","DECISION DU CONSEIL D'ADMINISTRATION","CONVENTIONS D'ACTIONNAIRES","COMPTABILITE","CONTRATS","CORRESPONDANCE","INTERNE ****","CREATION DE SOCIETE","PV RENDEZ-VOUS","DOCUMENTS","NOTES","RECHERCHES JURIDIQUES"],
    enfin_folders:["Actionnaires","Assistance","Clients.Fournisseur","Clients.Info","Compta client","Compta fournis.","Compta.Autres","Fabrication","Livre banque","Rendez vous","RH","To be signed","Urgence"],



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

    contactTypes:[
        {value:"",label:""},
        {value:"0",label:"Une société"},
        {value:"1",label:"Personne physique"}
    ]
}

export default Data;
