const endpoint = "http://149.202.172.15:3001/api";
//const endpoint = "http://localhost:3004/api";

let signatureService = {

    sendSignDocStatutMailToActio(data){
        return fetch(endpoint+'/sendSignDocStatutMailToActio', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    sendSMSToActio(data){
        console.log(data);
        return fetch(endpoint+'/sendSMSToActio', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },




};

export default signatureService