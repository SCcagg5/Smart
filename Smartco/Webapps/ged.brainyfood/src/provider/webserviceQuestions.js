const endpoint = process.env.REACT_APP_endpoint;

let QuestionService ={

    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        headers.append("Accept", '*/*');
        return headers;
    },


    getRecettes(){
        return fetch(endpoint+'recettesall', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    getRecettebyID(id){
        return fetch(endpoint+'recetteByID/'+id, {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    CreateQuestions(data){
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint+'questionsCreate', {
            method: 'POST',
            headers:this.loadHeaders(),
            body:formBody
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    CreateMiniceur(data){
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint+'miniceurCreate', {
            method: 'POST',
            headers:this.loadHeaders(),
            body:formBody
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    CreateSport(data){
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint+'sportCreate', {
            method: 'POST',
            headers:this.loadHeaders(),
            body:formBody
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    CreateBienEtre(data){
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint+'bienetreCreate', {
            method: 'POST',
            headers:this.loadHeaders(),
            body:formBody
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },


    createIngredient(data){
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint+'ingredientsCreate', {
            method: 'POST',
            headers:this.loadHeaders(),
            body:formBody
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });

    },

    getIngredientID(id){
        return fetch(endpoint+'ingredients/'+id, {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
}


export default QuestionService;
