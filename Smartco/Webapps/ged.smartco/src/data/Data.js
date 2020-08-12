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
            nodeId:"new",
            title:"Démarer une réunion",
            icon:VideoCallIcon
        },
        {
            nodeId:"rejoin",
            title:"Réjoindre une réunion",
            icon:MeetingRoomIcon
        },
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
    ]
}
export default Data;