let data =[ {
    id : 0,
    next : 1,
    prec : null,
    question : "INFORMATIONS PERSONNELES",
    repType : "button",
    responses : [ {
        text : "HOMME"
    }, {
        text : "FEMME"
    } ]
}, {
    id : 1,
    next : 2,
    prec : 0,
    question : "Est ce que  votre alimentation est ? ",
    repType : "button",
    responses : [ {
        "text" : "J’aime cuisiner"
    }, {
        "text" : "Je veux des recettes simples et sympas"
    } ]
}, {
    id : 2,
    next : 3,
    prec : 1,
    question : "Est ce que  votre alimentation est ?",
    repType : "button",
    responses : [ {
        "text" : "Variée"
    }, {
        "text" : "Trop riche"
    }, {
        "text" : "Toujours la même"
    } ]
}, {
    id : 3,
    next : 4,
    prec : 2,
    ps : "* ( courses, repas pris à l'extérieur, cantine  )",
    question : "Connaissez vous votre budget alimentaire par semaine ?* ",
    repType : "button",
    responses : [ {
        "text" : "< 30 euros"
    }, {
        "text" : "Entre 30 et 50 euros"
    }, {
        "text" : "Entre 50 et 70 euros"
    }, {
        "text" : "> 70 euros"
    } ]
}, {
    id : 4,
    next : 5,
    prec : 3,
    ps : "* ( courses, repas pris à l'extérieur, cantine  )",
    question : "Combien consommez-vous de féculents (pâtes, riz, pommes de terre, pain, légumineuses…) (1 portion = 1 poignée) ? ",
    repType : "button",
    responses : [ {
        "text" : "Plus de 3 portions par jour"
    }, {
        "text" : "2 à 3 portions par jour"
    }, {
        "text" : "0 à 1 portion par jour"
    } ]
}, {
    id : 5,
    next : 6,
    prec : 4,
    question : "Combien consommez-vous de légumes (soupe, crudités, légumes cuits) (1 portion = 2 poignées) ?",
    repType : "button",
    responses : [ {
        "text" : "Plus de 3 portions par jour"
    }, {
        "text" : "2 à 3 portions par jour"
    }, {
        "text" : "0 à 1 portion par jour"
    } ]
}, {
    id : 6,
    next : 7,
    prec : 5,
    question : "Combien consommez-vous de fruits (frais, compotes, salade, jus)  (1 portion = 1 poignée ou 1 verre) ?",
    repType : "button",
    responses : [ {
        "text" : "Plus de 3 portions par jour"
    }, {
        "text" : "2 à 3 portions par jour"
    }, {
        "text" : "0 à 1 portion par jour"
    } ]
}, {
    id : 7,
    next : 8,
    prec : 6,
    question : "Combien consommez-vous de viande, poisson, légumes secs (1 portion = 1 paume de main) ou œuf (1 portion = 2 oeufs) ?",
    repType : "button",
    responses : [ {
        "text" : "Plus de 3 portions par jour"
    }, {
        "text" : "2 à 3 portions par jour"
    }, {
        "text" : "0 à 1 portion par jour"
    } ]
}, {
    id : 8,
    next : 9,
    prec : 7,
    question : "Combien consommez-vous de produits laitiers (lait, yaourt, fromage, fromage blanc…) ?",
    repType : "button",
    responses : [ {
        "text" : "Plus de 3 portions par jour"
    }, {
        "text" : "2 à 3 portions par jour"
    }, {
        "text" : "0 à 1 portion par jour"
    } ]
}, {
    id : 9,
    next : 10,
    prec : 8,
    question : "Quelle est votre fréquence de consommation de produits gras (charcuteries, fritures, viennoiseries…) ?",
    repType : "button",
    responses : [ {
        "text" : "Plusieurs fois par jour"
    }, {
        "text" : "Tous les jours"
    }, {
        "text" : "2-3 fois par semaine"
    }, {
        "text" : "1 fois par semaine ou moins"
    } ]
}, {
    id : 10,
    next : 11,
    prec : 9,
    question : "Quelle est votre fréquence de consommation de produits sucrés (sodas, gâteaux, biscuits, glaces, crèmes dessert, chocolat, viennoiseries…) ?",
    repType : "button",
    responses : [ {
        "text" : "Plusieurs fois par jour"
    }, {
        "text" : "Tous les jours"
    }, {
        "text" : "2-3 fois par semaine"
    }, {
        "text" : "1 fois par semaine ou moins"
    } ]
}, {
    id : 11,
    next : 12,
    prec : 10,
    question : "Quelle est votre consommation d'alcool ?",
    repType : "button",
    responses : [ {
        "text" : "Plusieurs verres par jour"
    }, {
        "text" : "1 verre par jour"
    }, {
        "text" : "Le week-end ou jours de fête"
    }, {
        "text" : "Je ne consomme pas d’alcool"
    } ]
}, {
    id : 12,
    next : 13,
    prec : 11,
    question : "Est ce que vous grignotez ?",
    repType : "button",
    responses : [ {
        "text" : "OUI"
    }, {
        "text" : "NON"
    } ]
}, {
    id : 13,
    next : 14,
    prec : 12,
    question : "Est ce que vous sauté des repas ? ",
    repType : "button",
    responses : [ {
        "text" : "SOUVENT"
    }, {
        "text" : "PARFOIT"
    }, {
        "text" : "JAMAIS"
    } ]
}, {
    id : 14,
    next : 15,
    prec : 13,
    question : "Si oui, Lequel ?",
    repType : "button",
    responses : [ {
        "text" : "PETIT-DEJEUNER"
    }, {
        "text" : "DEJEUNER"
    }, {
        "text" : "DINER"
    } ]
}, {
    id : 15,
    next : 16,
    prec : 14,
    question : "Avez-vous par jour au moins 30 minutes d'activité ? ",
    repType : "button",
    responses : [ {
        "text" : "Domestique (ménage, repassage, entretien de la maison ...)"
    }, {
        "text" : "Travail (manutention, transport, marche ...)"
    }, {
        "text" : "Loisir (jardinage, bricolage, randonnées, marche rapide, vélo ...)"
    } ]
}, {
    id : 16,
    next : 17,
    prec : 15,
    question : "Combien d'heures de sport faites-vous par semaine ?",
    repType : "button",
    responses : [ {
        "text" : "< 1h"
    }, {
        "text" : "de  1 à 2h"
    }, {
        "text" : "de 3 à 5h"
    }, {
        "text" : "de 5 à 10h"
    }, {
        "text" : "> 10h"
    } ]
}, {
    id : 17,
    next : 18,
    prec : 16,
    question : "TRAVAILLEZ-VOUS EN HORAIRES DÉCALÉS ?",
    repType : "button",
    responses : [ {
        "text" : "OUI"
    }, {
        "text" : "NON"
    } ]
}, {
    id : 18,
    next : 19,
    prec : 17,
    question : "Avez-vous des problèmes de … ? ",
    repType : "button",
    responses : [ {
        "text" : "Sommeil Fatigue"
    }, {
        "text" : "Circulation"
    }, {
        "text" : "Digestion Transit"
    }, {
        "text" : "Rien de tous cela"
    }, {
        "text" : "Anxiété"
    }, {
        "text" : "Articulation"
    }, {
        "text" : "Infections répétées"
    } ]
}, {
    id : 19,
    prec : 18,
    question : "Vos objectifs ? ",
    repType : "button",
    responses : [ {
        "text" : "Minceur"
    }, {
        "text" : "Sport"
    }, {
        "text" : "Bien-être"
    } ]
}, {
    id : 20,
    next : 21,
    prec : 19,
    question : "Poids souhaité ? ",
    repType : "text",
    responses : [ {
        "placeholder" : "en kg (p.ex.93)",
        "text" : "Poids:"
    } ]
}, {
    id : 21,
    next : 22,
    prec : 20,
    question : "Où se situe votre surpoids ?",
    repType : "button",
    responses : [ {
        "text" : "Ventre"
    }, {
        "text" : "Hanches et fesses"
    }, {
        "text" : "Les deux"
    } ]
}, {
    id : 22,
    next : 26,
    prec : 21,
    question : "Cause de votre prise de poids ?",
    repType : "button",
    responses : [ {
        "text" : "Mauvaises Habitudes"
    }, {
        "text" : "Grossesse"
    }, {
        "text" : "Stress fatigue"
    }, {
        "text" : "Maladie / Médicaments"
    }, {
        "text" : "Compulsion / envies"
    }, {
        "text" : "Reprise de poids"
    }, {
        "text" : "Manque d’activité"
    }, {
        "text" : "Ménopause"
    }, {
        "text" : "Arrêt du tabac"
    }, {
        "text" : "Emploi du temps Surchargé"
    }, {
        "text" : "Manque de motivation"
    }, {
        "text" : "Rien de tous cela"
    } ]
}, {
    id : 23,
    next : 26,
    prec : 21,
    question : "Cause de votre prise de poids ?",
    repType : "button",
    responses : [ {
        "text" : "Mauvaises Habitudes"
    }, {
        "text" : "Stress fatigue"
    }, {
        "text" : "Maladie / Médicaments"
    }, {
        "text" : "Compulsion / envies"
    }, {
        "text" : "Reprise de poids"
    }, {
        "text" : "Manque d’activité"
    }, {
        "text" : "Arrêt du tabac"
    }, {
        "text" : "Emploi du temps Surchargé"
    }, {
        "text" : "Manque de motivation"
    }, {
        "text" : "Rien de tous cela"
    } ]
}, {
    id : 24,
    next : 26,
    prec : 19,
    question : "Quelles sont vos motivations ? ",
    repType : "button",
    responses : [ {
        "text" : "Prise masse musculaire"
    }, {
        "text" : "Illumination fringales"
    }, {
        "text" : "Digestion optimisée"
    }, {
        "text" : "Augmentation des Perf. Sportives"
    }, {
        "text" : "Récuperation"
    } ]
}, {
    id : 25,
    next : 26,
    prec : 19,
    question : "Quelles sont vos motivations ? ",
    repType : "button",
    responses : [ {
        "text" : "Retrouver un  confort digestif"
    }, {
        "text" : "Retrouver du tonus de l'énergie"
    }, {
        "text" : "Détoxifier mon organisme"
    }, {
        "text" : "Mieux dormir"
    }, {
        "text" : "Manger équilibré en évitant les carences"
    } ]
}, {
    id : 26,
    next : 29,
    prec : 15,
    question : "Souffrez-vous des pathologies suivante ?",
    repType : "button",
    responses : [ {
        "text" : "troubles alimentaires"
    }, {
        "text" : "Insuffisance rénale"
    }, {
        "text" : "Maladie inflammatoire des intestins"
    }, {
        "text" : "Je suis diabétique"
    }, {
        "text" : "Troubles de la thyroide"
    }, {
        "text" : "Autre Pathalogie"
    } ]
}, {
    id : 27,
    next : 28,
    prec : 26,
    question : "Quelle est cette pathologie ?",
    repType : "text",
    responses : [ {
        "placeholder" : "Indiquer votre pathologie ",
        "text" : "Pathologie :  "
    } ]
}, {
    id : 28,
    next : 29,
    prec : 26,
    question : "Avez-vous des allergies ou des intolérances alimentaires ?",
    repType : "text",
    responses : [ {
        "placeholder" : "Indiquer votre allergies ou intolérance  ",
        "text" : "Si oui, indiquer la "
    } ]
}, {
    id : 29,
    next : 31,
    prec : 28,
    question : "FUMEZ-VOUS RÉGULIÉREMENT ?",
    repType : "button",
    responses : [ {
        "text" : "OUI"
    }, {
        "text" : "NON"
    } ]
}, {
    id : 30,
    next : 31,
    prec : 29,
    question : "Souhaitez-vous arrêter de fumer ?",
    repType : "button",
    responses : [ {
        "text" : "OUI"
    }, {
        "text" : "NON"
    } ]
}, {
    id : 31,
    next : 32,
    prec : 29,
    question : "INFORMATIONS PERSONNELES",
    repType : "text",
    responses : [ {
        "placeholder" : "en année (p.ex 26)",
        "text" : "Age:"
    } ]
}, {
    id : 32,
    next : 33,
    prec : 31,
    question : "INFORMATIONS PERSONNELES",
    repType : "text",
    responses : [ {
        "placeholder" : "en cm (p.ex. 175)",
        "text" : "Taille:"
    } ]
}, {
    id : 33,
    next : 34,
    prec : 32,
    question : "Votre poids actuels ? ",
    repType : "text",
    responses : [ {
        "placeholder" : "en kg (p.ex 93)",
        "text" : "Poids:"
    } ]
}, {
    id : 34,
    next : 35,
    prec : 33,
    question : "Quels est votre degré de motivation pour atteindre vos objectifs  ",
    repType : "icon",
    responses : [ {
        "icon" : "Poids:",
        "placeholder" : "en kg (p.ex 93)"
    } ]
}, {
    id : 35,
    next : null,
    prec : 34,
    question : "Quel est l'adresse de messagerie de votre conseiller ?",
    repType : "email",
    responses : [ {
        "placeholder" : "email",
        "text" : "votre email "
    } ]
} ]

export default data
