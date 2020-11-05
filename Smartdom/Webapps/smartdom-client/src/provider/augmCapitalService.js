//const endpoint = "http://149.202.172.15:3001/api";
//const endpoint = "http://localhost:3003/api";
const endpoint = "http://51.15.229.251:3002/api";

let augmCapitalService = {




    getDocAugmCapitalTunisie(uid,key){

        return fetch(endpoint+'/getAugmentationDeCapitalTunisie/'+uid+'/'+key, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });


    },


    getBSADoc(uid,actiokey,type,titrekey,opkey){

        console.log(endpoint+'/creationBSATunisieGET/'+uid+'/'+actiokey+'/'+type+'/'+titrekey+'/'+opkey);
        return fetch(endpoint+'/creationBSATunisieGET/'+uid+'/'+actiokey+'/'+type+'/'+titrekey+'/'+opkey, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    getEntrepriseStatut(uid,pays){

        return fetch("http://149.202.172.15:3001/api"+'/getword/'+uid+'/'+pays, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    getSocietyPDFAGE(uid, numAugmentation) {

        return fetch(endpoint+'/getAugmentationDeCapitalTunisie/' + uid +'/'+numAugmentation, {
            method: 'GET',
        }).then(response => response.blob()).catch(error => {
            console.log(error);
        });
    },

    sendEmailEndSignatures(uid, pays) {

        console.log("***BEGIN SEND***");

        return fetch(endpoint+'/getbasedatawordFinDesiganture', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({code: uid, pays: pays})
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getBSASuisseDoc(uid,actiokey,type,titrekey,opkey){

        console.log(endpoint+'/creationBSASuisseGET/'+uid+'/'+actiokey+'/'+type+'/'+titrekey+'/'+opkey);
        return fetch(endpoint+'/creationBSASuisseGET/'+uid+'/'+actiokey+'/'+type+'/'+titrekey+'/'+opkey, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },


    getSARLStatut_Augm(uid,key){
        return fetch(endpoint+'/generateSARLStatusAfterAugmCapital/'+uid+'/'+key, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    getSARLrapport_Augm(uid,key){
        return fetch(endpoint+'/generateRapportAugmCapital/'+uid+'/'+key, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    getSARLrequisitionAugm(uid,key){
        return fetch(endpoint+'/generateAgeSARLRequis/'+uid+'/'+key, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    getSARLDeclarationAugm(uid,key){
        return fetch(endpoint+'/generateDeclarationAfterAugmCapital/'+uid+'/'+key, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    getSARLPvAGEAugm(uid,key){
        return fetch(endpoint+'/generatePvAGEAugmCapital/'+uid+'/'+key, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    getSARLBulletinSouscripAugm(uid,key1,key2){
        return fetch(endpoint+'/generateBulletinSouscripAugmCapital/'+uid+'/'+key1+'/'+key2, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    generateRapportFondation(uid,key){
        return fetch(endpoint+'/generateRapportFondation/'+uid+'/'+key, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    }















};

export default augmCapitalService