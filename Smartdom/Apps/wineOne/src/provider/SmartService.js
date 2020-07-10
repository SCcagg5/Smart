
const endpoint = "https://api.smartdom.ch"
const password = "password"
const contractAdr = "0x9520c239bae78a4a672a70370d85051fcd8dd6c9"

let SmartService = {

    loadHeaders(token,usrtoken) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", 'application/json');
        headers.append("token", token);
        headers.append("usrtoken", usrtoken);
        return headers;
    },

    getActioByMail(mail){

        return fetch('http://51.158.97.220:3001/api/getActioByEmail/'+mail, {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getToken(){
        return fetch(endpoint + '/login/', {
            method: 'POST',
            headers:this.loadHeaders("",""),
            body:JSON.stringify({pass:password})
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    register(data,token){
        return fetch(endpoint + '/signup/', {
            method: 'POST',
            headers:this.loadHeaders(token,""),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    login(data,token){
        return fetch(endpoint + '/signin/', {
            method: 'POST',
            headers:this.loadHeaders(token,""),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getUserInfo(token,usrtoken){
        return fetch(endpoint + '/infos/', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    updateUserInfo(data,token,usrtoken){
        return fetch(endpoint + '/updateinfos/', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getItems(token){
        return fetch(endpoint + '/website/quinsac/items', {
            method: 'GET',
            headers:this.loadHeaders(token,"")
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    addToCart(data,token){
        return fetch(endpoint + '/website/quinsac/cart/', {
            method: 'POST',
            headers:this.loadHeaders(token,""),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    placeOrder(data,token,usrtoken){
        return fetch(endpoint + '/order/', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    getAssetInfo(asset,token){
        return fetch(endpoint + '/asset/'+asset+'/infos', {
            method: 'GET',
            headers:this.loadHeaders(token,"")
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getCards(token,userToken){
        return fetch(endpoint + '/listcard/', {
            method: 'GET',
            headers:this.loadHeaders(token,userToken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    addCard(data,token,usrtoken){
        return fetch(endpoint + '/addcard/', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getUserWallets(token,usrtoken){
        return fetch(endpoint + '/wallets', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    getWalletEther(adress,token){
        return fetch(endpoint + '/wallet/'+adress, {
            method: 'GET',
            headers:this.loadHeaders(token,"")
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    getWalletBalance(adress,token,usrtoken){
        return fetch(endpoint + '/wallet/'+adress+'/token/'+contractAdr, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    }



};

export default SmartService;