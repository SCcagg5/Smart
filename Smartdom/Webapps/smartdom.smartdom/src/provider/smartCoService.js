const endpoint = "http://51.158.97.220:3001/api";
//const endpoint = "http://localhost:3004/api";
//const endpoint = "http://51.15.229.251:3002/api";

let smartCoService = {

    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", 'application/json');
        return headers;
    },

    getSocietyData(uid){
        return fetch(endpoint+'/getSociety/' + uid , {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    }

};

export default smartCoService;