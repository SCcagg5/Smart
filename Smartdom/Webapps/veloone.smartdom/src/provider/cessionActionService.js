const endpoint = "http://149.202.172.15:3001/api";
//const endpoint = "http://localhost:3004/api";

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




};

export default cessionService