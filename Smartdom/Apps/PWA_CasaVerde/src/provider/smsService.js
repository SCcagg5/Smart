//const endpoint = "https://docgen.smartdom.ch/api";
const endpoint = "http://localhost:3005/api";

let smsService = {

    send_verif_code(data){
        return fetch(endpoint+'/send_sms_verifCode', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },




};

export default smsService;