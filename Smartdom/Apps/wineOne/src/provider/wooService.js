
let endpoint = "http://51.158.97.220:3004/api";

let wooService = {

    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", 'application/json');
        return headers;
    },

    getAllCategories(){

        return fetch(endpoint + '/getCategories', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getAllProducts(){

        return fetch(endpoint + '/getAllProducts', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getProductsByCategorie(idCateg){

        return fetch(endpoint + '/getProducts/'+idCateg, {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    addNewOrder(data){
        return fetch(endpoint + '/addNewOrder/', {
            method: 'POST',
            body:JSON.stringify(data),
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },


    getPdf(url){
        return fetch( url, {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.blob() ).catch(error => {
            console.log(error);
        });
    },


};

export default wooService;