const endpoint = "http://34.250.15.8/api/";

let recetteService ={

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
    CreateRecette(data){
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint+'recetteCreate', {
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

    pdfRecette(id){

        return fetch(endpoint+'generateDocRecette/'+id, {
            method: 'GET',
            headers:this.loadHeaders(),

        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    }
}


export default recetteService;
