const endpoint = "http://149.202.172.15:3001/api";
//const endpoint = "http://localhost:3004/api";

let entrepriseSARLService = {

    GenerateStatut(uid,pays){

        console.log(endpoint+'/getword/'+uid+'/'+pays);
        return fetch(endpoint+'/getword/'+uid+'/'+pays, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    GenerateActeConstitutif(uid,pays){

        console.log(endpoint+'/GenerateActeConstitutif/'+uid+'/'+pays);
        return fetch(endpoint+'/GenerateActeConstitutif/'+uid+'/'+pays, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    GenerateProcuration(uid,pays){

        console.log(endpoint+'/GenerateProcuration/'+uid+'/'+pays);
        return fetch(endpoint+'/GenerateProcuration/'+uid+'/'+pays, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    GenerateDeclaration(uid,pays){

        console.log(endpoint+'/GenerateDeclaration/'+uid+'/'+pays);
        return fetch(endpoint+'/GenerateDeclaration/'+uid+'/'+pays, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    GenerateOptingOutGerant(uid,pays){

        console.log(endpoint+'/GenerateOptingOutGerant/'+uid+'/'+pays);
        return fetch(endpoint+'/GenerateOptingOutGerant/'+uid+'/'+pays, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    GenerateRequisition(uid,pays){

        console.log(endpoint+'/GenerateRequisition/'+uid+'/'+pays);
        return fetch(endpoint+'/GenerateRequisition/'+uid+'/'+pays, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    sendInvitation(data){
        return fetch(endpoint+'/sendInvitationToSignDoc', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    sendEmailNotifToGerant(data){
        return fetch(endpoint+'/sendEmailNotifToGerant', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },


    getDocSARLDocDigest(name,uid,pays){
        return fetch(endpoint+'/getDocSARLDigest/'+name+'/'+uid+'/'+pays, {
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
        console.log(id,firstname,lastname)
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
    }






};

export default entrepriseSARLService