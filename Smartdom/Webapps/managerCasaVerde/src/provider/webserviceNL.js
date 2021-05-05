import calendarService from "./calendarService";

const endpoint = "http://174.138.105.134/api/v1/";
const user="mybs"
const password="H6h6r6ek6rHrJKay"

let NlService = {
    loadHeadersWithoutToken() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", '*/*');

        return headers;
    },

    loadHeaders(token) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", '*/*');
        headers.append('Authorization', 'Bearer ' + token)

        return headers;
    },

    getToken() {

        return fetch(endpoint + 'login_check', {
            method: 'POST',
            headers:this.loadHeadersWithoutToken(),
            body: JSON.stringify({
                username: user,
                password: password
            })
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });

    },

    getClients(token) {

        return fetch(endpoint + 'user', {
            method: 'GET',
            headers: this.loadHeaders(token),

        }).then(response => response.json()).catch(error => {
            console.log(error);
        });

    },


    getRecettes() {
        return fetch(endpoint + 'recettesall', {
            method: 'GET',
            headers: this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    getuserDatabyEmail(id) {
        return fetch(endpoint + 'userdata/' + id, {
            method: 'GET',
            headers: this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    CreateQuestions(data) {
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint + 'questionsCreate', {
            method: 'POST',
            headers: this.loadHeaders(),
            body: formBody
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    CreateMiniceur(data) {
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint + 'miniceurCreate', {
            method: 'POST',
            headers: this.loadHeaders(),
            body: formBody
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    CreateSport(data) {
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint + 'sportCreate', {
            method: 'POST',
            headers: this.loadHeaders(),
            body: formBody
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    CreateBienEtre(data) {
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint + 'bienetreCreate', {
            method: 'POST',
            headers: this.loadHeaders(),
            body: formBody
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },


    createIngredient(data) {
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint + 'ingredientsCreate', {
            method: 'POST',
            headers: this.loadHeaders(),
            body: formBody
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });

    },

    getIngredientID(id) {
        return fetch(endpoint + 'ingredients/' + id, {
            method: 'GET',
            headers: this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
}


export default NlService;
