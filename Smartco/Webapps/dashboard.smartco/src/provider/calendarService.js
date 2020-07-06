const endpoint = "http://51.158.97.220:8086/";

let calendarService = {


    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", 'application/json');
        return headers;
    },

    getDispo(data){

        return fetch(endpoint + 'dispo/', {
            method: 'POST',
            body:JSON.stringify(data),
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch( error => {
            console.log(error);
        });
    },

    reserveDate(data){

        return fetch(endpoint + 'add/', {
            method: 'POST',
            body:JSON.stringify(data),
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    }


};

export default calendarService;