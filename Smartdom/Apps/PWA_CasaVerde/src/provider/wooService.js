//const endpoint = "http://192.168.0.113:3004/api/"
const endpoint = process.env.REACT_APP_WOO_API_ENDPOINT

let WooService ={

    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        headers.append("Accept", '*/*');
        return headers;
    },


    getCategories(){
        return fetch("https://green.1.rocketbonds.ch/wp-json/wc/store/products/categories", {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getCategoriesV2(){
        return fetch(endpoint +"getCategories", {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getProductByCat(id){
        return fetch(endpoint+"getProducts/"+id, {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch( error => {
            console.log(error);
        });
    },

    getProductByid(id){
        return fetch(endpoint+"getProduct/"+id, {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    get_stripe_client_secret(data){
        return fetch(endpoint+'get_stripe_client_secret', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    addOrder(data){
        return fetch(endpoint+'addOrder', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getOrders(){
        return fetch(endpoint+"getOrders", {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getPayment_gateways(){
        return fetch(endpoint+"getPayment_gateways", {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },


    generateTicket(data){

        return fetch(endpoint+'generateEtiquette', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },








}



export default WooService;
