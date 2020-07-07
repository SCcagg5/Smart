
/*public url ==> https://us-central1-recto-verso-27814.cloudfunctions.net/app/api/sendmail*/
/*local url ==> http://localhost:5000/api/sendmail*/
const endpoint = "http://51.158.97.220:3001/api";

let maillingService = {

    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", 'application/json');
        return headers;
    },

    sendMailSign(data){

        return fetch('https://apiocr.smartco.link/sign', {
            method: 'POST',
            body:JSON.stringify(data),
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    verifSmartCoUser(data){

        return fetch('http://149.202.172.15:3001/api/verifsmartCoUser', {
            method: 'POST',
            body:JSON.stringify(data),
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        }); 
    },

    addPayUrl(data){

        return fetch('http://149.202.172.15:3001/api/addPayUrl', {
            method: 'POST',
            body:JSON.stringify(data),
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },



};

export default maillingService;