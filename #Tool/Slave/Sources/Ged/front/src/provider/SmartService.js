const endpoint = process.env.REACT_APP_ENDPOINT;
const ged_id = process.env.REACT_APP_GED_ID;
const odoo_id = process.env.REACT_APP_ODOO_ID;
const password = "password"

let SmartService = {

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
        headers.append("Access-Control-Allow-Origin", "*")
        return headers;
    },


    getLogo(){
        return fetch(endpoint + '/' + ged_id, {
            method: 'GET',
            headers:this.loadHeadersWithoutToken()
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getInfoGed(token,usrtoken){
        console.log(endpoint + '/ged/'+ged_id)
        return fetch(endpoint + '/ged/'+ged_id, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
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
    getGed(token,usrtoken){
        return fetch(endpoint + '/ged/'+ged_id+'/doc', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    getFile(fileId,token,usrtoken){
        return fetch(endpoint + '/ged/'+ged_id+'/doc/'+ fileId, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    getFileByGed(Ged_id,fileId,token,usrtoken){
        return fetch(endpoint + '/ged/'+Ged_id+'/doc/'+ fileId, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    deleteFile(fileId,token,usrtoken){
        return fetch(endpoint + '/ged/'+ged_id+'/doc/'+ fileId, {
            method: 'DELETE',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    updateFileName(data,fileId,token,usrtoken){
        console.log(data)
        console.log(fileId)
        return fetch(endpoint + '/ged/'+ged_id+'/doc/'+ fileId, {
            method: 'PUT',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    addFolder(data,token,usrtoken){
        return fetch(endpoint + '/ged/'+ged_id+'/doc/addfolder', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    addFile(data,token,usrtoken){
        return fetch(endpoint + '/ged/'+ged_id+'/doc/addfile', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:data,
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    addFileFromBas64(data,token,usrtoken){
        return fetch(endpoint + '/ged/'+ged_id+'/doc/addb64file', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    share(id,data,token,usrtoken){
        return fetch(endpoint + '/ged/'+ged_id+'/doc/'+id+'/share', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    move(id,to_folder_id,token,usrtoken){
        return fetch(endpoint + '/ged/'+ged_id+'/doc/'+id+'/move/'+to_folder_id, {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    search(text,token,usrtoken){
        return fetch(endpoint + '/ged/'+ged_id+'/doc/search?search='+ text, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getUserSignatures(token,usrtoken){
        return fetch(endpoint + '/ged/' + ged_id + '/sign', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getUserSignaturesByGed(Ged_id,token,usrtoken){
        return fetch(endpoint + '/ged/' + Ged_id + '/sign', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getSignatureById(id,token,usrtoken){
        return fetch(endpoint + '/ged/' + ged_id + '/sign/'+ id, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getSignatureByIdByGed(Ged_id,id,token,usrtoken){
        return fetch(endpoint + '/ged/' + ged_id + '/sign/'+ id, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    deleteSignatureById(id,token,usrtoken){
        return fetch(endpoint + '/ged/' + ged_id + '/sign/'+ id, {
            method: 'DELETE',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    deleteSignatureByGedById(Ged_id,id,token,usrtoken){
        return fetch(endpoint + '/ged/' + Ged_id + '/sign/'+ id, {
            method: 'DELETE',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    addSignature(data,token,usrtoken){
        return fetch(endpoint + '/ged/' + ged_id + '/sign', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    addSignatureByGed(Ged_id,data,token,usrtoken){
        return fetch(endpoint + '/ged/' + Ged_id + '/sign', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    signDoc(data, doc_id, sign_id,token,usrtoken){
        return fetch(endpoint + '/ged/' + ged_id + '/doc/' + doc_id + '/sign/' + sign_id, {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    signDocByGed(Ged_id,data, doc_id, sign_id,token,usrtoken){
        return fetch(endpoint + '/ged/' + Ged_id + '/doc/' + doc_id + '/sign/' + sign_id, {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    /*Rooms*/

    addRoom(data,token,usrtoken){
        return fetch(endpoint + '/ged/'+ged_id+'/room', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getAllRooms(token,usrtoken){
        return fetch(endpoint + '/ged/'+ged_id+'/rooms', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    addFileInRoom(data,roomId,token,usrtoken){
        return fetch(endpoint + '/ged/'+ged_id+'/rooms/'+roomId+'/file', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getRoomFiles(token,usrtoken,rommId){
        return fetch(endpoint + '/ged/'+ged_id+'/rooms/'+rommId+'/files', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },


    create_company(token,usrtoken,data){
        return fetch(endpoint + '/odoo/'+odoo_id+'/company', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    create_client(token,usrtoken,data){
        return fetch(endpoint + '/odoo/'+odoo_id+'/user', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    create_client_folder(token,usrtoken,data){
        return fetch(endpoint + '/ged/'+ged_id+'/odoo/'+odoo_id+'/case', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    create_facture_odoo(token,usrtoken,data){
        return fetch(endpoint + '/odoo/'+odoo_id+'/bill', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    validate_facture_odoo(token,usrtoken,data){
        return fetch(endpoint + '/odoo/'+odoo_id+'/bill/validate', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    update_facture_odoo(token,usrtoken,data){
        return fetch(endpoint + '/odoo/'+odoo_id+'/bill/edit', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    update_odoo_client(data,token,usrtoken){
        return fetch(endpoint + '/odoo/'+odoo_id+'/contact', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    details_facture_odoo(token,usrtoken,id){
        return fetch(endpoint + '/odoo/'+odoo_id+'/bill/'+id+'/details', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    generate_facture_odoo(token,usrtoken,id,accestoken){
        return fetch(endpoint + '/odoo/'+odoo_id+'/bill/'+id+'?access_token='+accestoken, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    get_tax_odoo(token,usrtoken){
        return fetch(endpoint + '/odoo/'+odoo_id+'/get/tax_id', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    get_tax_odoo_byID(id,token,usrtoken){
        return fetch(endpoint + '/odoo/'+odoo_id+'/get/tax?id='+id, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    get_paymentTerm_odoo(token,usrtoken){
        return fetch(endpoint + '/odoo/'+odoo_id+'/get/payment_term_id', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    get_paymentTerm_odoo_byID(id,token,usrtoken){
        return fetch(endpoint + '/odoo/'+odoo_id+'/get/payment_term?id='+id, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    get_odoo_countries(token,usrtoken){
        return fetch(endpoint + '/odoo/'+odoo_id+'/get/country?arg=&limit=1000', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    get_odoo_country_states(id,token,usrtoken){
        return fetch(endpoint + '/odoo/'+odoo_id+'/get/country_state?arg=&limit=1000000&id=' + id, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
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

    addUserToGed(data,token,usrtoken){
        return fetch(endpoint + '/ged/'+ged_id + '/adduser', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
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

    getActioByMail(mail){

        return fetch('http://51.158.97.220:3001/api/getActioByEmail/'+mail, {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },



};

export default SmartService;
