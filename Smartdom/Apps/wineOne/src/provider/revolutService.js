
/*public url ==> https://us-central1-recto-verso-27814.cloudfunctions.net/app/api/sendmail*/
/*local url ==> http://localhost:5000/api/sendmail*/

let revolutService = {

    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", 'application/json');
        return headers;
    },

    login(){

        return fetch('http://revolut.eliotctl.fr/login/', {
            method: 'POST',
            body:JSON.stringify({pass:"password"}),
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getAccounts(){

        return fetch('http://revolut.eliotctl.fr/accounts/', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getTransactions(){

        return fetch('http://revolut.eliotctl.fr/transactions/', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    sendAmount(data,token){
        return fetch('http://revolut.eliotctl.fr/send/', {
            method: 'POST',
            body:JSON.stringify(data),
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },



};

export default revolutService;