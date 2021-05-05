
//const endpoint = process.env.REACT_APP_JAWHER_API_ENDPOINT
const endpoint = process.env.REACT_APP_endpoint
const url = "http://localhost:3002/"

let CheckoutService ={

    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        headers.append("Accept", '*/*');
        return headers;
    },
    loadHeadersJSON() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", '*/*');
        return headers;
    },
    getCQM(){

        return fetch(endpoint+'getBodycheck', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });

    },

    getClient(){
        return fetch(endpoint+'getCustomers', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    getOrders(){
        return fetch(endpoint+'getOrders', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    generateFacture(data){
        console.log(data)
        return fetch(endpoint+'factureBS',{
            method:'POST',
            headers:this.loadHeadersJSON(),
            body:JSON.stringify(data)
        }).then(response => response.blob()).catch(error => {
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
    CreateProspect(data){
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint+'createProspect', {
            method: 'POST',
            headers:this.loadHeaders(),
            body:formBody
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getProspects(){
        return fetch(endpoint+'getProspects', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    CreateCheckout(data){
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint+'CheckoutCreate', {
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
    addOrder(data){

        return  fetch(endpoint+'addOrder', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        })
    },
    sendMail(mail,id){
        let dd={
            emailReciver:mail,
            subject:"Majorsante",
            linkUrl :"clicker ici pour voir votre facture",
            url:url+"/checkoutInfo/"+id,
            msg:" ",
            footerMsg : "merci"
        }
       return  fetch(endpoint+'sendCustomMailWithUrl', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(dd)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        })
    },

    getCheckout(id){
        return fetch(endpoint+'Checkout/'+id, {
            method: 'GET',
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });

    },

    getNewsletters(){

        return fetch(endpoint+'newsletters', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });

    },

    sendNewsletter(mail,newsletter){
        let dd={

           email:mail,
            nom:newsletter
        }
        return  fetch(endpoint+'sendNewsLetterMail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(dd)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        })
    },

}



export default CheckoutService;
