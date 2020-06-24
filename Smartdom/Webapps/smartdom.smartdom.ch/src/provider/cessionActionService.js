//const endpoint = "http://149.202.172.15:3001/api";
//const endpoint = "http://localhost:3004/api";
const endpoint = "http://51.158.97.220/:3001/api";

let cessionService = {


    generateCefaDoc(uid,pays,idCession){
        console.log(endpoint+'/GenerateCerfa/'+uid+'/'+pays+'/'+idCession);
        return fetch(endpoint+'/GenerateCerfa/'+uid+'/'+pays+'/'+idCession, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    generateCefaSuisse(uid,pays,idCession){
        console.log(endpoint+'/GenerateCerfaSuisse/'+uid+'/'+pays+'/'+idCession);
        return fetch(endpoint+'/GenerateCerfaSuisse/'+uid+'/'+pays+'/'+idCession, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    },

    generateCessionActionSuisse(uid,idCession){
        return fetch(endpoint+'/generateContrat/'+uid+'/'+idCession, {
            method: 'GET',
        }).then(response => response.blob()
        ).catch(error => {
            console.log(error);
        });
    }




};

export default cessionService