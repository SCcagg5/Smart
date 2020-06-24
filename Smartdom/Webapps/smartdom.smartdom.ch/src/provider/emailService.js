const endpoint = "http://149.202.172.15:3001/api";
//const endpoint = "http://localhost:3004/api";
//const endpoint = "http://51.15.229.251:3002/api";

let emailService = {

    sendInvitation(data){
        return fetch(endpoint+'/sendInvitationToSignDoc', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    sendmMails(data){
        return fetch(endpoint+'/sendCustomMailsWithUrl', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },




};

export default emailService