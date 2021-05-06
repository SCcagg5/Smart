const endpoint = "https://docgen.smartdom.ch/api";
//const endpoint = "http://localhost:3005/api";

let maillingService = {

    send_odoo_facture(data){
        return fetch(endpoint+'/sendMailWithAttach', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    }
};

export default maillingService;
