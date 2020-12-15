const endpoint = "http://localhost:8080"
//const endpoint = process.env.REACT_APP_ENDPOINT
const password = "password"

let masterNodeService = {

    loadHeadersWithoutToken() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", 'application/json');
        return headers;
    },

    loadHeaders(token,usrtoken) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", 'application/json');
        headers.append("token", token);
        headers.append("usrtoken", usrtoken);
        return headers;
    },

    getLogo(){
        return fetch(endpoint + '/', {
            method: 'GET',
            headers:this.loadHeadersWithoutToken()
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getInfoGed(token,usrtoken){
        return fetch(endpoint + '/ged', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getToken(){
        return fetch(endpoint + '/login', {
            method: 'POST',
            headers:this.loadHeaders("",""),
            body:JSON.stringify({pass:password})
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    register(data,token){
        return fetch(endpoint + '/signup', {
            method: 'POST',
            headers:this.loadHeaders(token,""),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    login(data,token){
        return fetch(endpoint + '/signin', {
            method: 'POST',
            headers:this.loadHeaders(token,""),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getUserInfo(token,usrtoken){
        return fetch("https://api.smartdom.ch" + '/infos/', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    updateUserInfo(data,token,usrtoken){
        return fetch(endpoint + '/updateinfos', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getGed(token,usrtoken){
        return fetch(endpoint + '/ged/doc', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    getFile(fileId,token,usrtoken){
        return fetch(endpoint + '/ged/doc/'+ fileId, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    deleteFile(fileId,token,usrtoken){
        return fetch(endpoint + '/ged/doc/'+ fileId, {
            method: 'DELETE',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    updateFileName(data,fileId,token,usrtoken){
        console.log(data)
        console.log(fileId)
        return fetch(endpoint + '/ged/doc/'+ fileId, {
            method: 'PUT',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    addFolder(data,token,usrtoken){
        return fetch(endpoint + '/ged/doc/addfolder', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    addFile(data,token,usrtoken){
        return fetch(endpoint + '/ged/doc/addfile', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:data,
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    addFileFromBas64(data,token,usrtoken){
        return fetch(endpoint + '/ged/doc/addb64file', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    share(id,data,token,usrtoken){
        return fetch(endpoint + '/ged/doc/'+id+'/share', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    search(text,token,usrtoken){
        return fetch(endpoint + '/ged/doc/search?search='+ text, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    /*Rooms*/

    addRoom(data,token,usrtoken){
        return fetch(endpoint + '/ged/room', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getAllRooms(token,usrtoken){
        return fetch(endpoint + '/ged/rooms', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    addFileInRoom(data,roomId,token,usrtoken){
        return fetch(endpoint + '/ged/rooms/'+roomId+'/file', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getRoomFiles(token,usrtoken,rommId){
        return fetch(endpoint + '/ged/rooms/'+rommId+'/files', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },


    create_company(token,usrtoken,data){
        return fetch(endpoint + '/odoo/company', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    create_client(token,usrtoken,data){
        return fetch(endpoint + '/odoo/user', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    create_client_folder(token,usrtoken,data){
        return fetch(endpoint + '/ged/odoo/case', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    create_facture_odoo(token,usrtoken,data){
        return fetch(endpoint + '/odoo/bill', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    generate_facture_odoo(token,usrtoken,id,accestoken){
        return fetch(endpoint + '/odoo/bill/'+id+'?access_token='+accestoken, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },



    getActioByMail(mail){

        return fetch('http://51.158.97.220:3001/api/getActioByEmail/'+mail, {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

};

export default masterNodeService;