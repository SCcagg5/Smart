
const endpoint = "https://api.smartdom.ch"
const password = "password"

let SmartService = {

    loadHeaders(token,usrtoken) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", 'application/json');
        headers.append("token", token);
        headers.append("usrtoken", usrtoken);
        headers.append("Connection","keep-alive");

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

    paymentdetaile(data){
        return fetch(endpoint + '/paymentdetails/', {
            method: 'POST',
            headers:{

                "Cache-Control":"no-cache",
                "Content-Type":"application/json",
                "Accept":"*/*",
                "Accept-Encoding":"gzip, deflate, br",
                "Connection":"keep-alive",


            },
            body:JSON.stringify(data)
        }).then(response => console.log( response.json())).catch(error => {
            console.log(error);
        });
    }



};

export default SmartService;
