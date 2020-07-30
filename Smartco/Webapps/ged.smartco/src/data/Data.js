import FireplaceIcon from "@material-ui/icons/Fireplace";

let Data = {
    endpoint : "http://51.210.4.161:8080",

    sideBarItems: [
        {key: "coffre", title: "Coffre-fort", icon: "fe-folder", to: "/coffre-fort"},
        {key: "rooms", title: "Rooms", icon: "fe-grid", to: "/rooms"},
        {key: "Meet", title: "Meet", icon: "fe-video", to: "/meet"},
        {key: "Chat", title: "Chat", icon: "fe-message-circle", to: "/chat"},
        {key: "avocat", title: "Avocats", icon: "fe-users", to: "/avocats"},
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
    ]
}
export default Data;