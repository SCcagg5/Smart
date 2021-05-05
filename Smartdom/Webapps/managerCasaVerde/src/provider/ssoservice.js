import { encode, decode } from 'js-base64';

//const endpoint = process.env.REACT_APP_JAWHER_API_ENDPOINT
const endpoint = process.env.REACT_APP_sso
const url = "http://localhost:3002/"

const username="dev"
const password="RNLqIJ@tSMC*JguZb!uBevx("

let SSOService ={

    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", '*/*');
        headers.append('Cache-Control','no-cache')
        headers.append('Cookie', "usr_token=dsqdqsdqsd;SameSite=None;Secure")


        return headers;
    },

    loadHeaderswithToken(usr_token) {
        console.log()
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", '*/*');
        headers.append('Access-Control-Allow-Origin', "*");
        headers.append('Access-Control-Allow-Headers', "*");

        return headers;
    },




    getClients(){
        return fetch(endpoint+'users?roles=customer', {
            method: 'GET',
            headers:this.loadHeaders(),
            credentials: 'include'
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    CreateUser(data){

        return fetch(endpoint+'signup', {
            method: 'POST',
            headers:this.loadHeaders(),

            body:JSON.stringify(data),

        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    UpdateUser(token,data){
        return fetch(endpoint+'user', {
            credentials: 'include',
            headers:this.loadHeaders(token),
            method: 'PUT',
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

   Login(data){
        console.log(data)
       return fetch(endpoint+'signin', {
           method: 'POST',
           headers:this.loadHeaders(),

           body:JSON.stringify(data),
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



export default SSOService;
