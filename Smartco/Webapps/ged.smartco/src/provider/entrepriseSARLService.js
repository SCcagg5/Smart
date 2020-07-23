//const endpoint = "http://149.202.172.15:3001/api";
//const endpoint = "http://localhost:3004/api";
const endpoint = "http://51.158.97.220:3002/api";

let entrepriseSARLService = {

    GenerateStatut(uid,pays){

        return fetch(endpoint +'/getword/'+uid+'/'+pays, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    GenerateActeConstitutif(uid,pays){

        return fetch(endpoint +'/GenerateActeConstitutif/'+uid+'/'+pays, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    GenerateProcuration(uid,pays){

        return fetch(endpoint +'/GenerateProcuration/'+uid+'/'+pays, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    GenerateDeclaration(uid,pays){

        return fetch(endpoint +'/GenerateDeclaration/'+uid+'/'+pays, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    GenerateOptingOutGerant(uid,pays){

        return fetch(endpoint +'/GenerateOptingOutGerant/'+uid+'/'+pays, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    GenerateRequisition(uid,pays){

        return fetch(endpoint +'/GenerateRequisition/'+uid+'/'+pays, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },


    GenerateObligationBonds(uid, pays, numEmission){
        console.log(endpoint+'/GenerateProspectusGet/'+uid+'/'+pays+'/'+numEmission);
        return fetch(endpoint+'/GenerateProspectusGet/'+uid+'/'+pays+'/'+numEmission, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    generateProspectusPP(uid, numEmission){
        console.log(endpoint+'/generateProspectusPP/'+uid+'/'+numEmission);
        return fetch(endpoint+'/generateProspectusPP/'+uid+'/'+numEmission, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },




    getDocSARLDocDigest(name,uid,pays){
        return fetch('http://149.202.172.15:3001/api/getDocSARLDigest/'+name+'/'+uid+'/'+pays, {
            method: 'GET',
        }).then(response => response.json()
        ).catch(error => {
            console.log(error);
        });
    },


    loginGeneve(){

        return fetch('http://51.15.229.251:8087/login/', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                pass:"password"
            })
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });

    },


    signGeneveDoc(name,digest,token,id,firstname,lastname){
        console.log(id,firstname,lastname);
        return fetch('http://51.15.229.251:8087/sign/', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({
                token:token,
                id:id.toString(),
                name:name,
                firstname:firstname,
                lastname:lastname,
                digest:digest
            })
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },


    generateTransformationAugmDoc(uid,numAugm){
        console.log(endpoint+'/generateRapportFondation/'+uid+'/'+numAugm);
        return fetch(endpoint+'/generateRapportFondation/'+uid+'/'+numAugm, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },
};

export default entrepriseSARLService