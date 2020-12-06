const endpoint = "http://149.202.172.15:3001/api";
//const endpoint = "http://localhost:3003/api";

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

        console.log(uid,pays);
        return fetch(endpoint+'/getword/'+uid+'/'+pays, {
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
    }













};

export default augmCapitalService