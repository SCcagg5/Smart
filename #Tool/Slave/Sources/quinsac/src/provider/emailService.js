const endpoint = "http://149.202.172.15:3001/api";
//const endpoint = "http://localhost:3001/api";
//const endpoint = "http://51.15.229.251:3002/api";

let emailService = {


    sendMailToEmp(data) {
        return fetch(endpoint + '/sendMailToEmp', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    sendEmailToRespSmartCo(data) {
        return fetch(endpoint + '/sendEmailToRespSmartCo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });

    },

    sendEmailToInvAfterSignUp(data) {
        return fetch(endpoint + '/sendEmailToInvAfterSignUp', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });

    }





};

export default emailService;