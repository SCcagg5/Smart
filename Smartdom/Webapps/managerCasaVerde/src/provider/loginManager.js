import { encode, decode } from 'js-base64';

//const endpoint = process.env.REACT_APP_JAWHER_API_ENDPOINT
const endpoint = process.env.REACT_APP_endpointWP
const url = "http://localhost:3002/"

const username="dev"
const password="RNLqIJ@tSMC*JguZb!uBevx("

let LoginManagerService ={

    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        headers.append("Accept", '*/*');
        headers.append("Authorization" , 'Basic '+encode(username+":"+password));
        return headers;
    },

    loadHeadersLogin(username,password) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        headers.append("Accept", '*/*');
        headers.append("Authorization" , 'Basic '+encode(username+":"+password));
        return headers;
    },


    getClients(){
        return fetch(endpoint+'users?context=edit&roles=customer', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    getManagers(){
        return fetch(endpoint+'users?context=edit&roles=om', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    CreateUser(data){
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint+'users', {
            method: 'POST',
            headers:this.loadHeaders(),
            body:formBody
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    searchUser(email){
        return fetch(endpoint+'users/?search='+email, {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },


    getUserMe(username,password){
        return fetch(endpoint+'users/me', {
            method: 'GET',
            headers:this.loadHeadersLogin(username,password),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },



}



export default LoginManagerService;
