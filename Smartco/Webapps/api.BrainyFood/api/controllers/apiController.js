'use strict';

var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
const ejs = require("ejs");
var fs = require('fs');
var nodemailer = require('nodemailer')
var path = require('path');
var moment = require('moment');
var  firebase = require("firebase-admin")
const Employee = require('../models/recette.model');
const Questions = require('../models/questions.model');
const Miniceur = require('../models/miniceur.model');
const Sport = require('../models/sport.model');
const BienEtre = require('../models/bienetre.model');
const bodyCheck= require('../models/bodycheck.model')
const htmlDocx = require ('html-docx-js')



const ing = require('../models/ingredient.model');


var serviceAccount = require("./firebase/beautysane-61cf2-firebase-adminsdk-omyqd-9ee561645c.json");
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://beautysane-61cf2.firebaseio.com",
});

exports.sendNLMailWithUrl2 = function (req, res) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "smartco.majordhome2019@gmail.com",
            pass: "Majordhome2019"
        }
    });
    let body = req.body

    let nom = body.nom

    let email = body.email


        ejs.renderFile(path.join(__dirname, '../html/beefree-2b2xcad5wbw.html'),{nom :nom



                }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var mainOptions = {
                    from: '"BrainyFood  " <noreply@smartco.fr>',
                    to: email,
                    subject: 'résultats de votre bodycheck, by Beautysané',
                    html: data

                };
                //console.log("html data ======================>", mainOptions.html);

                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        res.json({
                            msg: 'fail'
                        })
                    } else {
                        res.json({
                            msg: 'success'
                        })
                    }
                });
            }
        });




    };




exports.sendNLMailWithUrl = function (req, res) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "smartco.majordhome2019@gmail.com",
            pass: "Majordhome2019"
        }
    });


    var body = req.body


    var email = body[35].rep


    var objectif =(body[19].rep)


        var imct=""

        var taille = parseFloat( (body[32].rep)/100)
        var poids = parseInt(body[33].rep)
        var age = parseInt(body[31].rep)
        var imc = poids / (taille * taille )
        var mb
        var dej
        var cuisine =""
        var alimentation=""
        var legume =""
        var viande =""
        var feculent =""
        var notrePoduit=""
        var text =" Voici notre sélection de produits pour manger équilibré et rester en forme."
        var grignotez =""
        var sautez_repas =""

        var horraire_decale =""

        var depense_enegitique=""
        var probleme =""
        var pathologies =""
        var allergie =""
        var fummeur=""

   if (imc > 18 && imc < 25){
       imct ="Votre IMC est compris entre 18 et 25, ce qui indique une corpulence normale. Cependant, vous pouvez désirer perdre quelques kilos pour retrouver votre poids de forme et vous sentir mieux dans son corps."

   }else if (imc > 25 && imc < 30){
       imct ="Votre IMC est supérieur à 25. A moins que vous ne fassiez partie de certaines catégories spécifiques de personnes (ex : sportifs de haut niveau), cela signifie que vous êtes en surpoids."
   }else if(imc > 30){
       imct="Votre IMC est supérieur à 30. A moins que vous ne fassiez partie de certaines catégories spécifiques de personnes (ex : sportifs de haut niveau), cela signifie que vous êtes en surpoids, voire  en  situation d’obésité. Nous vous conseillons avant toute chose d’en parler à votre médecin."
   }


//// calcule mb
        if (body[0].rep ==="HOMME"){
            mb =  259* (Math.pow(poids,0.48) )* (Math.pow(taille,0.5) )* ( Math.pow(age,-0.13))

        }else{
           mb = 230* (Math.pow(poids,0.48) )* (Math.pow(taille,0.5) )* ( Math.pow(age,-0.13))

        }
///////////// Calcule Dej        /////
        if (body[16].rep==="< 1h"){
            dej =  mb*1.37
        }else if (body[16].rep==="de  1 à 2h"|| body[16].rep==="de 3 à 5h"){
            dej =  mb*1.55
        }else if (body[16].rep==="de 5 à 10h"|| body[16].rep==="> 10h"){
            dej =  mb*1.80

        }

        console.log("taille:" + taille)
        console.log("imc:" + imc.toFixed(2))
        console.log("calories:" + dej.toFixed(2))
        console.log(email)

//////////  Cuisine         /////////////

        if (body[1].rep==="J’aime cuisiner "){
            cuisine = "Vous aimez cuisiner ? Ca tombe bien nous aussi ! Nous avons des centaines de recettes gourmandes et équilibrées à vous proposer."
        }else if (body[1].rep==="Je veux des recettes simples et sympas "){
            cuisine = "Vous souhaitez des idées recettes pour faciliter votre quotidien ? Nous avons des centaines de recettes simples et équilibrées à vous proposer.\n"
        }

//////////////////// Alimentation /////////////

        if (body[2].rep==="Variée"){
            alimentation ="Votre alimentation est variée. Bravo, c’est essentiel pour être en bonne santé !"
        }else if (body[2].rep==="Trop riche"){
            alimentation = "Votre alimentation est trop riche. Nous allons voir ensemble comment alléger vos repas, tout en mangeant équilibré et en gardant le plaisir !"
        }else if (body[2].rep==="Toujours la même"){
            alimentation="Votre alimentation est toujours la même. Manger varié et équilibré, c’est la clé pour rester en forme. Nous allons vous aider à modifier vos habitudes alimentaires !"

        }
/////////// legume ///////////
        if (body[5].rep==="Plus de 3 portions par jour"){
            legume ="💚 Vous mangez suffisamment de fruits et légumes"
        }else{
            legume= "⬈  Mangez plus de fruits et légumes et augmentez vos apports en vitamines et minéraux"

        }
/////////////// fruit ////////////
        if (body[7].rep ==="0 à 1 portion par jour"){
            viande ="⬈ Mangez plus de viande, poisson, oeufs, légumineuses et augmentez vos apports en protéines."
        }else if(body[7].rep ==="2 à 3 portions par jour"){
            viande ="💚 Vous mangez suffisamment de produits riches en protéines."
        }

 ////// feculent ///////////
        if (body[4].rep ==="0 à 1 portion par jour"){
            feculent= "⬈ Mangez plus de féculents et augmentez vos apports en glucides complexes."
        }else if(body[4].rep ==="2 à 3 portions par jour"){
            feculent="💚 Vous mangez suffisamment de glucides complexes."
        }else if(body[4].rep==="Plus de 3 portions par jour "){
            feculent==" ⬊ Réduisez votre consommation de glucides."
        }

        /////////// grignotez //////////

        if (body[12].rep ==="OUI"){
            grignotez ="Vous grignotez. Mais vous pouvez troquer vos grignotages contre une pause légère et équilibrée. Beautysané propose des collations gourmandes et variées, goûtez-les !"
        }else {
            grignotez ="Eviter de grignoter est une excellente façon de garder la ligne, félicitations !"
        }

////////////sauter repas /////////////////

        if (body[13].rep==="SOUVENT"||body[13].rep==="PARFOIT"){
            sautez_repas="Vous sautez des repas. Le problème, c’est qu’au repas suivant, vous risquez de compenser par une prise alimentaire plus importante. Bonne nouvelle, Beautysané propose des repas équilibrés, prêts en 2 minutes chrono !"
        }else {
            sautez_repas ="Vous avez une journée structurée avec 3 repas par jour. Très bien ! Cela fait partie de l’équilibre alimentaire."
        }

//////////////// depense enegitique ///////////////////////

    if ((body[15].rep==="Domestique (ménage, repassage, entretien de la maison ...) " ||
        body[15].rep==="Travail (manutention, transport, marche ...)" ||
    body[15].rep==="Loisir (jardinage, bricolage, randonnées, marche rapide, vélo ...)")&& body[16].rep ==="< 1h"){
        depense_enegitique = "Vos dépenses énergétiques semblent insuffisantes. Savez-vous qu’il existe de nombreuses astuces pour rendre vos journées plus actives de façon ludique ?"
    }else if ((body[15].rep==="Domestique (ménage, repassage, entretien de la maison ...) " ||
        body[15].rep==="Travail (manutention, transport, marche ...)" ||
        body[15].rep==="Loisir (jardinage, bricolage, randonnées, marche rapide, vélo ...)")&& (body[16].rep ==="de  1 à 2h"|| body[16].rep ==="de 3 à 5h" || body[16].rep==="de 5 à 10h")) {

        depense_enegitique="Vos dépenses énergétiques sont suffisantes, mais sachez que vous pouvez encore les améliorer ! Savez-vous qu’il existe de nombreuses astuces pour rendre vos journées plus actives de façon ludique ?"
    }else if((body[15].rep==="Domestique (ménage, repassage, entretien de la maison ...) " ||
        body[15].rep==="Travail (manutention, transport, marche ...)" ||
        body[15].rep==="Loisir (jardinage, bricolage, randonnées, marche rapide, vélo ...)")&& body[16].rep ==="> 10h") {
        depense_enegitique="Bravo ! Vos dépenses énergétiques sont excellentes. Vous variez les plaisirs en multipliant les activités et vous êtes suffisamment actif pour conserver votre masse musculaire. En plus du programme nutritionnel adapté proposé, nous vous encourageons à maintenir ce niveau d’activité !"

    }


    ///////////////// horraire decale ////////////////////////////////////

    if (body[17].rep==="OUI"){
        horraire_decale="Vous travaillez en horaires décalés, mais rassurez-vous, il existe des solutions pour manger équilibré et de façon structurée !"
    }

//////////////////////// Probleme ////////////////////

    if (body[18].rep==="Sommeil Fatigue "){
        probleme="Vous semblez avoir des difficultés à vous endormir et vous vous sentez fatigué.\n" +
            "Beautysané propose un complément alimentaire Sommeil qui associe houblon, aubépine, passiflore et tryptophane. Il contient également de la vitamine B6 qui contribue au fonctionnement normal du système nerveux et de la valériane qui favorise l’endormissement et le sommeil."
    }else  if (body[18].rep==="Anxiété"){
        probleme ="Le stress peut être un facteur de prise de poids, indépendamment de toute prise alimentaire, en raison d’un bouleversement hormonal. En effet, le cortisol sécrété augmente l’appétit et conduit à la consommation d’aliments gras/sucrés, souvent source de réconfort. Le fait de savoir gérer son stress permet de ne pas compenser par une alimentation déséquilibrée. Le complément alimentaire Omega3 de Beautysané participe au bon fonctionnement du système nerveux."
    }else if (body[18].rep==="Circulation"){
        probleme ="Aujourd’hui, près de 18 millions d’adultes se plaignent d’inconfort et de fourmillement dans les jambes. Le complément Circulation de Beautysané associe orange amère, vitamine C et petit houx qui soutient la circulation veineuse et soulage les jambes lourdes et fatiguées. La vitamine C contribue à la formation normale du collagène pour assurer le fonctionnement normal des vaisseaux sanguins."
    }else  if (body[18].rep ==="Articulation"){
        probleme="Le complément Articulations de Beautysané associe de la prêle, du lithothamne et de la chondroïtine de requin. Il contient également de l’harpagophytum qui aide à renforcer le système locomoteur et à maintenir la flexibilité des articulations et des tendons."
    }else if (body[18].rep ==="Infections répétées "){

        probleme="Face aux multiples agressions extérieures que l’organisme subit, les experts Beautysané ont mis au point la formule exclusive, Immunité composée de ferments lactiques, vitamines, minéraux et plantes dont l’échinacée (utilisée par les indiens d’Amérique du nord), qui contribue à la défense de l’organisme. Tout comme le zinc et le sélénium, la vitamine C contribue au bon fonctionnement des défenses immunitaires."

    }else if(body[18].rep==="Digestion Transit "){
        probleme="Les produits Beautysané sont sans gluten* et hautement digestes, grâce à un complexe enzymatique exclusif, le système HD, présent dans les gammes Energy Diet et Energy Diet+. Ce complexe améliore la digestion du lactose, des glucide complexes et des protéines." +
            "*excepté pour les saveurs Energy Diet Pain, P’tit déjeuner, Parmentier, Galettes et Energy Snack ."
    }else if (body[18].rep ==="Rien de tous cela " ){
        probleme="Bravo, vous n’avez pas de problèmes de santé particuliers !"
    }

    if (objectif==="Minceur"){
        var poids_souhaite =body[20].rep

        var calcul_pourcentage_poids=(poids*0.15)

        var calcul_difference_poids = (poids - parseFloat(poids_souhaite))
        var objectif_perte =""
        var poids_minimum = 18.5 *(taille * taille)
        var poids_maximum =25 *(taille * taille)
        var text_poids =""
        var surpoids = ""
        var cause_prise_poids =""
        if (calcul_difference_poids > calcul_pourcentage_poids){
             objectif_perte ="Votre objectif de perte de ​poids est supérieur à 15% de votre poids actuel. Nous vous recommandons dans un premier temps de vous limiter à ces 15%. Votre conseiller Beautysané va vous aider à fixer les différentes  étapes intermédiaires."
        }else {
            objectif_perte = "Votre objectif de perte de poids est < à 15% de votre poids actuel et donc tout à fait réalisable"
        }

        if ((poids_maximum<poids_souhaite) && (poids_souhaite<poids_maximum)){
            text_poids = "Par ailleurs, vous nous avez indiqué que votre objectif était d’atteindre "+toString(poids_souhaite)+" kg . Ce poids est tout à fait dans la norme conseillée pour votre taille, c'est-à-dire compris entre "+toString(poids_minimum)+" kg  et "+toString(poids_maximum)+"  kg . "
        }else if (poids_souhaite<poids_minimum){
            text_poids ="Par ailleurs, le poids que vous souhaitez atteindre est inférieur à la norme conseillée pour votre taille, qui est de "+toString(poids_minimum)+" kg (. Votre conseiller va vous aider à déterminer un objectif de poids optimal,  pour un résultat No Yoyo  ! "
        }else if(poids_souhaite>poids_maximum){
            text_poids ="Par ailleurs, le poids que vous souhaitez atteindre est  supérieur à la norme conseillée pour votre taille qui est de"+toString(poids_maximum)+" kg. Cependant, ce qui est important c'est votre poids de forme, c'est à dire celui auquel vous vous sentez bien et qu’il faudra maintenir sur le long terme. "
        }

        if (body[21].rep==="Ventre "){
            surpoids="D’après vous, la localisation de votre surpoids se situe essentiellement au niveau du ventre. Cela correspond à ce que l’on appelle la graisse « androïde ». Cette graisse abdominale peut avoir des conséquences sur votre santé. Elle est souvent liée à une consommation excessive d’aliments trop gras ou trop sucrés et à un manque d’activité physique. Nous allons vous accompagner jour après jour et vous aider à suivre un programme minceur et des exercices physiques adaptés."

        }else if(body[21].rep==="Hanches et fesses "){
            surpoids="Vous observez une localisation du surpoids au niveau de vos hanches. Cela correspond à ce qu’on appelle la graisse « gynoïde ». La fatigue, le travail, le surmenage, l’alimentation déséquilibrée et le manque d’exercice quotidien contribuent à cette graisse rebelle. Nous allons vous accompagner jour après jour et vous aider à suivre un programme minceur et des exercices physiques adaptés."
        }else if (body[21].rep==="Les deux"){
            surpoids="Concernant votre silhouette, elle est à la fois : androïde et gynoïde, ronde mais harmonieuse."
        }

        if (body[22].rep==="Mauvaises Habitudes "){
            cause_prise_poids="D’après vous, votre prise de poids semble liée à de mauvaises habitudes alimentaires. Pour atteindre votre objectif de perte de poids, votre programme doit marquer une vraie rupture avec vos habitudes alimentaires passées. Il est indispensable de les faire évoluer durablement pour retrouver une alimentation quotidienne réellement équilibrée."
        }else if(body[22].rep==="Grossesse"){
            cause_prise_poids="D’après vous, votre prise de poids est partiellement ou totalement due à une grossesse passée. Fixez-vous des objectifs faciles à atteindre. Pour réussir votre programme minceur, vos objectifs doivent être réalisables. Il vous faut un programme adapté, pour une perte de poids en douceur et motiver la jeune maman que vous êtes !"
        }else if(body[22].rep==="Ménopause  "){
            cause_prise_poids="D’après vous, votre prise de poids peut être liée au bouleversement hormonal qui accompagne la ménopause. Pour perdre du poids pendant ou après celle-ci, il est indispensable de diminuer vos apports caloriques en douceur tout en augmentant simultanément les apports en protéines, fibres et glucides complexes."

        }else if (body[22].rep==="Manque d’activité  "){
            cause_prise_poids="D’après vous, votre prise de poids semble être liée à un manque d’activité physique. Sachez que lorsque nous diminuons notre activité physique, nous diminuons également les besoins énergétiques de notre corps. C’est à ce moment là que nous prenons du poids. Nous allons vous proposer un programme adapté à la situation et vous motiver jour après jour pour atteindre votre objectif."
        }else if(body[22].rep==="Stress fatigue"){
            cause_prise_poids="D’après vous, votre prise de poids semble être liée au stress ou à la fatigue. Dans une telle situation le corps sécrète du cortisol (qu’on appelle aussi «l’hormone du stress») qui envoie de puissants signaux au cerveau afin de stimuler l’appétit et provoquer dans certains cas de véritables fringales. Adoptez un équilibre alimentaire et une bonne hygiène de vie. Nous allons vous accompagner jour après jour pour retrouver la forme et une silhouette\n" +
                "harmonieuse."
        }else if(body[22].rep==="Maladie / Médicaments"){
            cause_prise_poids="D’après vous, votre prise de poids est peut être liée à des problèmes de santé. Certains traitements ou maladies peuvent effectivement être responsables d’une prise de poids. Nous vous conseillons de demander l’avis de votre médecin traitant avant de commencer un programme minceur."
        }else if(body[22].rep==="Arrêt du tabac  "){
            cause_prise_poids="Vous avez récemment arrêté de fumer, bravo ! Une étude datant de 1991 montre qu’à l’arrêt du tabac, le gain de poids moyen est de 2.8 kg pour les hommes et de 3.8 kg pour les femmes. En effet, les anciens fumeurs ont tendance à manger davantage et voient leurs dépenses énergétiques diminuer. Vous avez besoin d’un programme adapté, pour un nouveau succès !"
        }else if(body[22].rep==="Emploi du temps Surchargé "){
            cause_prise_poids="Vous pensez que votre emploi du temps surchargé vous empêche de garder ou retrouver votre ligne. Vous déjeunez peut-être mal et trop vite, à la cantine ou dans un fast food car vous n’avez pas le temps de faire une vraie pause à midi ?" +
                "C’est une mauvaise habitude hélas très répandue... Car si une alimentation déséquilibrée (du type «fast food») est préjudiciable pour la santé, manger vite est également une véritable erreur nutritionnelle qui ne pardonne pas côté ligne. En alliant programme minceur et suivi personnalisé par des conseillers toujours à votre écoute, vous saurez comment vous alimenter de façon équilibrée et rassasiante, même si vous ne disposez que de peu de temps."

        }else if(body[22].rep==="Compulsion / envies "){
            cause_prise_poids="Vous pensez que ce sont des compulsions qui vous empêchent de garder ou retrouver votre ligne. Pour beaucoup d’entre nous, cela se traduit par des fringales irrésistibles, ou l’impression d’avoir faim tout le temps. On cède alors à la tentation du grignotage et si on essaye de résister il arrive que l’on ressente de la fatigue, voire de l’irritabilité. Nous allons vous donner des astuces pour réfréner vos envies de grignoter en augmentant votre sensation de satiété."

        }else if(body[22].rep==="Manque de motivation "){
            cause_prise_poids="Vous dites que c’est votre manque de motivation qui vous empêche de garder ou retrouver votre ligne. Gardez confiance ! C’est précisément parce que la motivation est la clé de la réussite que l’accompagnement est au coeur de la méthode Beautysané."
        }else if(body[22].rep==="eprise de poids  "){
            cause_prise_poids="Vous pensez avoir des difficultés pour stabiliser votre poids. Vous avez peut-être suivi auparavant un ou plusieurs programmes minceur après lesquels vous avez repris tout ou une partie du poids perdu, voire davantage. L’essentiel est de savoir stabiliser son poids en modifiant ses habitudes alimentaires sur le long terme. Le suivi spécifique proposé par votre conseiller Beautysané, permet de surmonter facilement cette difficulté et de conserver durablement le fruit de vos efforts."

        }else if(body[22].rep==="Rien de tous cela"){
            cause_prise_poids="Vous ne semblez pas connaître les raisons de votre prise de poids. Nous vous aiderons à les identifier afin de trouver ensemble un programme adapté à votre situation."
        }

        if(body[26].rep!=""||body[26].rep!=null){
            pathologies="Vous souffrez d’une pathologie ? Il est préférable de demander l’avis de votre médecin traitant avant de commencer un programme."
        }

        if (body[28].rep!="" || body[26].rep!=null){
            allergie="Vous êtes intolérant et/ou allergique à un aliment : il est préférable d’en parler à votre conseiller Beautysané."
        }

        if (body[29].rep==="OUI"){
            fummeur="Vous êtes fumeur. L’arrêt du tabac est un point de départ vers une meilleure hygiène de vie : alimentation équilibrée, activité physique, temps pour soi,... Si vous craignez la prise de poids à l’arrêt du tabac, nous avons des solutions simples à vous proposer."
        }

        ejs.renderFile(path.join(__dirname, '../html/Miniceur.ejs'),{imc:imc.toFixed(2),poids :poids , taille : taille , dej:dej.toFixed(2),
            cuisine :cuisine ,
            alimentation:alimentation,
            legume :legume,
            viande:viande,
            feculent:feculent,
            imct:imct,
            objectif_perte:objectif_perte,
            text_poids:text_poids,
            surpoids:surpoids,
            cause_prise_poids:cause_prise_poids,


            pathologies:pathologies,
            allergie:allergie,
            fummeur:fummeur,
            depense_enegitique:depense_enegitique,
            horraire_decale:horraire_decale,
            probleme:probleme,

            text :" Voici notre sélection de produits pour manger équilibré et rester en forme.",
            grignotez :grignotez,
            sautez_repas : sautez_repas}, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var mainOptions = {
                    from: '"NL BodyCheck " <noreply@smartco.fr>',
                    to: email,
                    subject: 'résultats de votre bodycheck, by Beautysané',
                    html: data

                };
                //console.log("html data ======================>", mainOptions.html);

                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        res.json({
                            msg: 'fail'
                        })
                    } else {
                        res.json({
                            msg: 'success'
                        })
                    }
                });
            }
        });




    }else if(objectif==="Sport"){
        var motivations =""

        if (body[24].rep==="Prise masse musculaire"){
            motivations="Vous souhaitez adopter une nutrition sportive adaptée et équilibrée, pour pouvoir gagner en masse musculaire et prendre du poids.\n" +
                "Nous avons des programmes adaptés, qui correspondent à vos besoins."
        }else if (body[24].rep==="Augmentation des Perf. Sportives"){

            motivations ="Vous souhaitez adopter une nutrition sportive adaptée et équilibrée, pour augmenter vos performances sportives. Les enjeux sont de taille : fournir à votre\n" +
                "corps l’énergie nécessaire à l’effort, à juste dose ! Les produits Beautysané sont formulés dans ce sens, et nous proposons des programmes adaptés à votre\n" +
                "activité sportive."

        }else if (body[24].rep==="Digestion optimisée "){
            motivations="Vous souffrez de troubles digestifs à l’effort, qui vous empêchent d’optimiser vos performances sportives. Beautysané vous offre une nutrition sportive optimale et un confort digestif, grâce au système HD (Haute Digestibilité), testé et adopté par tous nos ambassadeurs sportifs !"

        }else if(body[24].rep==="Récuperation"){
            motivations="Les heures suivant l’effort physique sont essentielles à la bonne récupération de l’organisme. Il est important de bien choisir votre boisson de récupération, pour optimiser la reconstruction musculaire et la restitution des réserves énergétiques. Un apport en BCAA, en vitamines et en minéraux est conseillé en cas d’effort intense sur le plan énergétique et/ou musculaire. Les produits Beautysané sont formulés dans ce sens."
        }else if(body[24].rep==="Illumination fringales "){
            motivations ="Vous rencontrez souvent des “coups de pompe” pendant l’effort et/ou vous souffrez de fringales qui vous poussent à manger de façon compulsive. Grâce à une nutrition sportive adaptée et équilibrée, vous supprimerez ces effets indésirables."
        }


        if(body[26].rep!=""||body[26].rep!=null){
            pathologies="Vous souffrez d’une pathologie ? Il est préférable de demander l’avis de votre médecin traitant avant de commencer un programme."
        }

        if (body[28].rep!="" || body[26].rep!=null){
            allergie="Vous êtes intolérant et/ou allergique à un aliment : il est préférable d’en parler à votre conseiller Beautysané."
        }

        if (body[29].rep==="OUI"){
            fummeur="Vous êtes fumeur. L’arrêt du tabac est un point de départ vers une meilleure hygiène de vie : alimentation équilibrée, activité physique, temps pour soi,... Si vous craignez la prise de poids à l’arrêt du tabac, nous avons des solutions simples à vous proposer."
        }

        ejs.renderFile(path.join(__dirname, '../html/sport.ejs'),{imc:imc.toFixed(2),poids :poids , taille : taille , dej:dej.toFixed(2),
            cuisine :cuisine ,
            alimentation:alimentation,
            legume :legume,
            viande:viande,
            feculent:feculent,
            imct:imct,
            motivations:motivations,
            pathologies:pathologies,
            allergie:allergie,
            fummeur:fummeur,
            depense_enegitique:depense_enegitique,
            horraire_decale:horraire_decale,
            probleme:probleme,

            text :" Voici notre sélection de produits pour manger équilibré et rester en forme.",
            grignotez :grignotez,
            sautez_repas : sautez_repas}, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var mainOptions = {
                    from: '"NL BodyCheck " <noreply@smartco.fr>',
                    to: email,
                    subject: 'résultats de votre bodycheck, by Beautysané',
                    html: data

                };
                //console.log("html data ======================>", mainOptions.html);

                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        res.json({
                            msg: 'fail'
                        })
                    } else {
                        res.json({
                            msg: 'success'
                        })
                    }
                });
            }
        });


    }else if (objectif==="Bien-être"){
        var BienEtreMotivations=""

        if (body[25].rep==="Manger équilibré en évitant les carences"){
            BienEtreMotivations="Combler les carences d’une alimentation pauvre en nutriments, à la qualité nutritionnelle parfois douteuse, c’est facile ! Beautysané vous propose des produits sains et équilibrés. Ils sont rassasiants et vous apportent tout ce dont vous avez besoin, en 5 minutes maxi de préparation."
        }else if (body[25].rep==="Retrouver un  confort digestif"){
            BienEtreMotivations="Les produits Beautysané sont sans gluten* et hautement digestes, grâce à un complexe enzymatique exclusif, le système HD, présent dans les gammes Energy Diet et Energy Diet+.\n" +
                "*excepté pour les saveurs Energy Diet Pain, P’tit déjeuner, Parmentier, Galettes et Energy Snack."
        }else if(body[25].rep==="Détoxifier mon organisme "){
            BienEtreMotivations="Démarrez un programme spécifique pour détoxifier votre corps ! Vous nettoyez votre organisme et faites le plein d’antioxydants, grâce à une alimentation appropriée. En effet, les produits Beautysané sont sans pesticides ni métaux lourds. Cette détox permet à votre organisme de fonctionner à nouveau de façon optimale !"
        }else if (body[25].rep==="Retrouver du tonus de l'énergie "){
            BienEtreMotivations ="Avec Beautysané, faites le plein de nutriments essentiels (omega3, vitamines, minéraux…) pour retrouver la forme et gagner en vitalité ! L’apport optimal en protéines permet également de fournir à votre corps les neurotransmetteurs nécessaires au bon fonctionnement du système hormonal. Votre énergie est ainsi reboostée !"
        }else if(body[25].rep==="Mieux dormir"){
            BienEtreMotivations="Malgré vos journées intenses, vous n’arrivez pas à trouver le sommeil ? Et si votre difficulté d’endormissement était due à votre alimentation ? Pour une qualité de sommeil optimale, il faut manger assez (le jambon/salade ne suffisent pas !), tout en privilégiant des aliments de qualité, ni trop gras, ni trop sucrés. En suivant les programmes proposés par Beautysané, améliorez votre sommeil rapidement, en toute sérénité !"
        }

        if(body[26].rep!=""||body[26].rep!=null){
            pathologies="Vous souffrez d’une pathologie ? Il est préférable de demander l’avis de votre médecin traitant avant de commencer un programme."
        }

        if (body[28].rep!="" || body[26].rep!=null){
            allergie="Vous êtes intolérant et/ou allergique à un aliment : il est préférable d’en parler à votre conseiller Beautysané."
        }

        if (body[29].rep==="OUI"){
            fummeur="Vous êtes fumeur. L’arrêt du tabac est un point de départ vers une meilleure hygiène de vie : alimentation équilibrée, activité physique, temps pour soi,... Si vous craignez la prise de poids à l’arrêt du tabac, nous avons des solutions simples à vous proposer."
        }

       let  bs={
        imc:imc.toFixed(2),poids :poids , taille : taille , dej:dej.toFixed(2),
            cuisine :cuisine ,
            alimentation:alimentation,
            legume :legume,
            viande:viande,
            feculent:feculent,
            imct:imct,
            BienEtreMotivations:BienEtreMotivations,
            pathologies:pathologies,
            allergie:allergie,
            fummeur:fummeur,
            depense_enegitique:depense_enegitique,
            horraire_decale:horraire_decale,
            probleme:probleme,

            text :" Voici notre sélection de produits pour manger équilibré et rester en forme.",
            grignotez :grignotez,
            sautez_repas : sautez_repas
        }

        ejs.renderFile(path.join(__dirname, '../html/helloWorld.ejs'),{imc:imc.toFixed(2),poids :poids , taille : taille , dej:dej.toFixed(2),
            cuisine :cuisine ,
            alimentation:alimentation,
            legume :legume,
            viande:viande,
            feculent:feculent,
            imct:imct,
            BienEtreMotivations:BienEtreMotivations,
            pathologies:pathologies,
            allergie:allergie,
            fummeur:fummeur,
            depense_enegitique:depense_enegitique,
            horraire_decale:horraire_decale,
            probleme:probleme,

            text :" Voici notre sélection de produits pour manger équilibré et rester en forme.",
            grignotez :grignotez,
            sautez_repas : sautez_repas}, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var mainOptions = {
                    from: '"NL BodyCheck " <noreply@smartco.fr>',
                    to: email,
                    subject: 'résultats de votre bodycheck, by Beautysané',
                    html: data

                };
                //console.log("html data ======================>", mainOptions.html);

                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        res.json({
                            msg: 'fail'
                        })
                    } else {
                        res.json({
                            msg: 'success'
                        })
                    }
                });
            }
        });
    }

    if(body[26].rep!=""||body[26].rep!=null){
           pathologies="Vous souffrez d’une pathologie ? Il est préférable de demander l’avis de votre médecin traitant avant de commencer un programme."
    }

    if (body[28].rep!="" || body[26].rep!=null){
        allergie="Vous êtes intolérant et/ou allergique à un aliment : il est préférable d’en parler à votre conseiller Beautysané."
    }

    if (body[29].rep==="OUI"){
        fummeur="Vous êtes fumeur. L’arrêt du tabac est un point de départ vers une meilleure hygiène de vie : alimentation équilibrée, activité physique, temps pour soi,... Si vous craignez la prise de poids à l’arrêt du tabac, nous avons des solutions simples à vous proposer."
    }












/*
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "smartco.majordhome2019@gmail.com",
            pass: "Majordhome2019"
        }
    });

    const ejs = require("ejs");

    ejs.renderFile(path.join(__dirname, '../html/helloWorld.ejs'), function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var mainOptions = {
                from: '"NL BodyCheck " <noreply@smartco.fr>',
                to: "jawher.zairi@sesame.com.tn",
                subject: 'Nl body Check',
                html: data
            };
            //console.log("html data ======================>", mainOptions.html);

            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    res.json({
                        msg: 'fail'
                    })
                } else {
                    res.json({
                        msg: 'success'
                    })
                }
            });
        }
    });

*/
};
exports.sendCustomMailWithUrl = function (req, res) {

    console.log("Begin Sending")

    var ret = { 'status': 500, 'type': null, 'data': null, 'error': null };


    var emailsReciver = req.body.emailReciver;
    var subject = req.body.subject;
    var linkUrl = req.body.linkUrl;
    var url = req.body.url;
    var msg = req.body.msg;
    var footerMsg = req.body.footerMsg;


    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "smartco.majordhome2019@gmail.com",
            pass: "Majordhome2019"
        }
    });



    transporter.sendMail({
        from: '"BrainyFood " <noreply@assemblee.fr>',
        to: emailsReciver,
        subject: subject,
        text: msg,
        html: msg + linkUrl.link(url) + footerMsg

    }).then(result => {
        console.log(result.messageId);
        ret.status = 200;
        ret.data = "EMAIL SENDED";
        res.status(ret.status);
        res.json(ret);

    }).catch(err => {
        console.log("ERROR SEND EMAIL")
        console.log(err);
        ret.status = 500;
        ret.data = " ERROR, EMAIL NOT SENDED";
        ret.error = err;
        res.status(ret.status);
        res.json(ret);
    });

};
exports.createBodyCheck = function (req,res){




    const new_questions = new bodyCheck(req.body)

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        bodyCheck.create(new_questions, function(err, employee) {
            if (err)
                res.send(err);
            res.json({error:false,message:"Employee added successfully!",data:employee});
        });
    }



}
exports.createQuestions = function (req,res){




const new_questions = new Questions(req.body)

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Questions.create(new_questions, function(err, employee) {
            if (err)
                res.send(err);
            res.json({error:false,message:"Employee added successfully!",data:employee});
        });
    }



}

exports.getQuestionByEmail=function(req,res){
    Questions.findByEmail(req.params.id, function(err, employee) {
        if (err)
            res.send(err);
        res.json(employee);
    });

}
exports.getBodyCheckByEmail=function(req,res){
    bodyCheck.findByEmail(req.params.id, function(err, employee) {
        if (err)
            res.send(err);
        res.json(employee);
    });

}
exports.createMiniceur = function (req,res){




    const new_miniceur = new Miniceur(req.body)

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Miniceur.create(new_miniceur, function(err, employee) {
            if (err)
                res.send(err);
            res.json({error:false,message:"Miniceur added successfully!",data:employee});
        });
    }



}
exports.createSport = function (req,res){




    const new_sport = new Sport(req.body)

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Sport.create(new_sport, function(err, employee) {
            if (err)
                res.send(err);
            res.json({error:false,message:"Sport added successfully!",data:employee});
        });
    }



}
exports.createBienEtre = function (req,res){




    const new_bienetre = new BienEtre(req.body)

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        BienEtre.create(new_bienetre, function(err, employee) {
            if (err)
                res.send(err);
            res.json({error:false,message:"Bien etre added successfully!",data:employee});
        });
    }



}

exports.getRecettes = async function (req,res) {
   getrecettes(req,res)

}

async function getrecettes(req,res) {
    let ret = { "status":500,"error":null,"data":null,"length":0}

    var db = firebase.database().ref('/recettes');
    var snapshot = await db.once('value');
    var data = snapshot.val();
    var arrayData= Object.values(data)
    let dataF=[]

    arrayData.map((item,key)=>{
        dataF.push(
            {
                id:key,
                nom:item.nomRecette,
                ingredient:item.Ingredients,

            }
        )

    });
    ret.status =200;
    ret.length = data.length;
    ret.data = dataF ;
    res.json(ret);




}

exports.getRecettebyId = async function (req,res) {
    getrecettebyId(req,res)

}

async function getrecettebyId(req,res) {
    let ret = { "status":500,"error":null,"data":null,"length":0}
    let id =req.params.id

    var db = firebase.database().ref('/recettes');
    var snapshot = await db.once('value');
    var data = snapshot.val();
    var arrayData= Object.values(data)
    let dataF={
        id:id,
        nom:arrayData[id].nomRecette,
        ingredient:arrayData[id].Ingredients,
    }


    ret.status =200;
    ret.data = dataF ;
    res.json(ret);




}

exports.findAll = async function(req, res) {
    console.log("work")
    Employee.findAll(function(err, employee) {
        console.log('controller')
        if (err)
            res.send(err);
        res.send(employee);
    });
};

///////////////// recettes //////////////
exports.createRecette = async function(req, res) {
    const new_employee = new Employee(req.body);
//handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Employee.create(new_employee, function(err, employee) {
            if (err)
                res.send(err);
            res.json({error:false,message:"Employee added successfully!",data:employee});
        });
    }
};

exports.findById = function(req, res) {
    Employee.findById(req.params.id, function(err, employee) {
        if (err)
            res.send(err);
        res.json(employee);
    });
};

/////////ingredient ////////////
exports.createIngredient = async function(req, res) {
    const new_employee = new ing(req.body);
//handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        ing.create(new_employee, function(err, employee) {
            if (err)
                res.send(err);
            res.json({error:false,message:"Ingredients added successfully!",data:employee});
        });
    }
};

exports.getIngredients = function(req, res) {
    ing.findById(req.params.id, function(err, ing) {
        if (err)
            res.send(err);
        res.json(ing);
    });
};
exports.getBodyCheckData= function (req,res) {
    let data ={
        data:{}
    }

    bodyCheck.findByEmail(req.params.id,function (err,question) {
        if (err){
            res.send(err);
        }else {

            if (question.length!=0) {

                data.data.question = question[0]

                if (question[0].objectif === "Minceur") {
                    Miniceur.findById(question[0].id_q, function (err2, minceur) {
                        if (err) {
                            res.send(err);
                        } else {
                            data.data.objectif = minceur[0]
                            res.json(data);
                        }
                    })
                } else if (question[0].objectif === "Sport") {
                    Sport.findById(question[0].id_q, function (err2, sport) {
                        if (err) {
                            res.send(err);
                        } else {
                            data.data.objectif = sport[0]
                            res.json(data);
                        }
                    })
                } else if (question[0].objectif === "Bien-être") {
                    BienEtre.findById(question[0].id_q, function (err2, bienetre) {
                        if (err) {
                            res.send(err);
                        } else {
                            data.data.objectif = bienetre[0]
                            res.json(data);
                        }
                    })
                }
            }else {
                data.data=""
                res.json(data)
            }
        }


    })

}
exports.getQuestionData= function (req,res) {
    let data ={
        data:{}
    }

  Questions.findById(req.params.id,function (err,question) {
      if (err){
          res.send(err);
      }else {

          if (question.length!=0) {

              data.data.question = question[0]

              if (question[0].objectif === "Minceur") {
                  Miniceur.findById(question[0].id_q, function (err2, minceur) {
                      if (err) {
                          res.send(err);
                      } else {
                          data.data.objectif = minceur[0]
                          res.json(data);
                      }
                  })
              } else if (question[0].objectif === "Sport") {
                  Sport.findById(question[0].id_q, function (err2, sport) {
                      if (err) {
                          res.send(err);
                      } else {
                          data.data.objectif = sport[0]
                          res.json(data);
                      }
                  })
              } else if (question[0].objectif === "Bien-être") {
                  BienEtre.findById(question[0].id_q, function (err2, bienetre) {
                      if (err) {
                          res.send(err);
                      } else {
                          data.data.objectif = bienetre[0]
                          res.json(data);
                      }
                  })
              }
          }else {
              data.data=""
              res.json(data)
          }
      }


  })

}
async function generateContratpdf(req, res,sUid,index) {

    var json = {};







    var template = "../DOC/BStemplate.docx";
    var dataDOC = await GenerateWordwithImg(template, json, 150, 50);

    var code = "bodycheck";

    var dataPdf = await ConvertDOcVerPdf(dataDOC, code);

    //delete file
    const path1 = 'C:\\tmp\\' + code + '.docx';
    const path2 = 'C:\\tmp\\' + code + '.pdf';
    try {
        fs.unlinkSync(path1);
        fs.unlinkSync(path2);
        //file removed
    } catch (err) {
        console.error(err)
    }


    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=SARLTRANS-RapportFondation2020.pdf',
        'Content-Length': dataPdf.length
    });


    res.status(200);
    console.log("****End Generate Doc****");
    res.end(dataPdf);


}
 exports.generateDoc=function generateDoc(req, res) {

    var PizZip = require('pizzip');
    var Docxtemplater = require('docxtemplater');

    var fs = require('fs');
    var path = require('path');

//Load the docx file as a binary
    var content = fs
        .readFileSync(path.resolve(__dirname, 'DOC/BStemplate.docx'), 'binary');

    var zip = new PizZip(content);

    var doc = new Docxtemplater();
    doc.loadZip(zip);

//set the templateVariables

    try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render()
    }
    catch (error) {
        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
        }
        console.log(JSON.stringify({error: e}));
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
    }

    var buf = doc.getZip()
        .generate({type: 'nodebuffer'});

// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    fs.writeFileSync(path.resolve(__dirname, 'beautysaneBodyCheck.docx'), buf);



    const file = `${__dirname}/beautysaneBodyCheck.docx`;

    res.download(file)




};
function ConvertDOcVerPdf(json, code) {

    return new Promise((resolve, reject) => {
        fs.writeFileSync('C:\\tmp\\' + code + '.docx', json);
        resolve(code + '.docx');
    })

        .then((file) => {

            return new Promise((resolve, reject) => {
                const word2pdf = require('word2pdf');
                word2pdf('C:\\tmp\\' + file).then(data => {
                    fs.writeFileSync('C:\\tmp\\' + code + '.pdf', data);
                    resolve(code + ".pdf");

                }).catch(err => {
                    console.log(err)
                });
            })
        })
        .then((file) => {
            return new Promise((resolve, reject) => {
                var content2 = fs.readFileSync('C:\\tmp\\' + file);
                var buf = new Buffer(content2);
                resolve(buf);
            })
        });
}


exports.wordQuill=function wordQuill(req,res){

     const  text = req.body.text


    const docx = htmlDocx.asBlob(text);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=test.docx`);
    res.setHeader('Content-Length', docx.length);
    res.send(docx);



}
exports.wordtohtml=function wordtohtml(req,res){

    const  file = req.body.file
    var docx2html=require('docx2html')
    docx2html(file).then(function(html){
        html.toString()
    })


    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=test.docx`);
    res.setHeader('Content-Length', docx.length);
    res.send(docx);



}
