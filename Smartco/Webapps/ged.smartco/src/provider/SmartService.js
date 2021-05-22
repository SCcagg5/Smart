const endpoint = "https://api.smartdom.ch"
const password = "password"
const OALegalGedId = "896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf9"
/*const odoo_id = "796dc0ed-8b4a-40fd-aeff-7ce26ee1bcf9"*/
const contractAdr = "0x9520c239bae78a4a672a70370d85051fcd8dd6c9"

const quelifiedSignEndpoint = "https://sign.1.smartdom.ch/sign/qualified";

let SmartService = {

    loginSSO(data){
        return fetch("http://localhost:8081" + '/signin', {
            method: 'POST',
            headers:this.loadHeadersWithoutToken(),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    loadHeadersWithoutToken() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", 'application/json');
        return headers;
    },

    loadQualifiedSignHeaders(){
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

    getActioByMail(mail){

        return fetch('http://51.158.97.220:3001/api/getActioByEmail/'+mail, {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getInfoGed(token,usrtoken){
        return fetch(endpoint + '/ged/'+OALegalGedId, {
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
        return fetch(endpoint + '/ged/'+OALegalGedId+'/doc', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    getFile(fileId,token,usrtoken){
        return fetch(endpoint + '/ged/'+OALegalGedId+'/doc/'+ fileId, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    deleteFile(fileId,token,usrtoken){
        return fetch(endpoint + '/ged/'+OALegalGedId+'/doc/'+ fileId, {
            method: 'DELETE',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    updateFileName(data,fileId,token,usrtoken){
        console.log(data)
        console.log(fileId)
        return fetch(endpoint + '/ged/'+OALegalGedId+'/doc/'+ fileId, {
            method: 'PUT',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    addFolder(data,token,usrtoken){
        return fetch(endpoint + '/ged/'+OALegalGedId+'/doc/addfolder', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    addFile(data,token,usrtoken){
        return fetch(endpoint + '/ged/'+OALegalGedId+'/doc/addfile', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:data,
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    addFileFromBas64(data,token,usrtoken){
        return fetch(endpoint + '/ged/'+OALegalGedId+'/doc/addb64file', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    share(id,data,token,usrtoken){
        return fetch(endpoint + '/ged/'+OALegalGedId+'/doc/'+id+'/share', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    search(text,token,usrtoken){
        return fetch(endpoint + '/ged/'+OALegalGedId+'/doc/search?search='+ text, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    /*Rooms*/

    addRoom(data,token,usrtoken){
        return fetch(endpoint + '/ged/'+OALegalGedId+'/room', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getAllRooms(token,usrtoken){
        return fetch(endpoint + '/ged/'+OALegalGedId+'/rooms', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    addFileInRoom(data,roomId,token,usrtoken){
        return fetch(endpoint + '/ged/'+OALegalGedId+'/rooms/'+roomId+'/file', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getRoomFiles(token,usrtoken,rommId){
        return fetch(endpoint + '/ged/'+OALegalGedId+'/rooms/'+rommId+'/files', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },


    create_company(odoo_id,token,usrtoken,data){
        return fetch(endpoint + '/odoo/'+odoo_id+'/company', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    create_client(odoo_id,token,usrtoken,data){
        return fetch(endpoint + '/odoo/'+odoo_id+'/user', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    create_client_folder(odoo_id,token,usrtoken,data){
        return fetch(endpoint + '/ged/'+OALegalGedId+'/odoo/'+odoo_id+'/case', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    create_facture_odoo(odoo_id,token,usrtoken,data){
        return fetch(endpoint + '/odoo/'+odoo_id+'/bill', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    validate_facture_odoo(odoo_id,token,usrtoken,data){
        return fetch(endpoint + '/odoo/'+odoo_id+'/bill/validate', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    update_facture_odoo(odoo_id,token,usrtoken,data){
        return fetch(endpoint + '/odoo/'+odoo_id+'/bill/edit', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    details_facture_odoo(odoo_id,token,usrtoken,id){
        return fetch(endpoint + '/odoo/'+odoo_id+'/bill/'+id+'/details', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    generate_facture_odoo(odoo_id,token,usrtoken,id,accestoken){
        return fetch(endpoint + '/odoo/'+odoo_id+'/bill/'+id+'?access_token='+accestoken, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    get_tax_odoo(odoo_id,token,usrtoken){
        return fetch(endpoint + '/odoo/'+odoo_id+'/get/tax_id', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    get_tax_odoo_byID(odoo_id,id,token,usrtoken){
        return fetch(endpoint + '/odoo/'+odoo_id+'/get/tax?id='+id, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    get_paymentTerm_odoo(odoo_id,token,usrtoken){
        return fetch(endpoint + '/odoo/'+odoo_id+'/get/payment_term_id', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    get_paymentTerm_odoo_byID(odoo_id,id,token,usrtoken){
        return fetch(endpoint + '/odoo/'+odoo_id+'/get/payment_term?id='+id, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    get_odoo_countries(odoo_id,token,usrtoken){
        return fetch(endpoint + '/odoo/'+odoo_id+'/get/country?arg=&limit=1000', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    get_odoo_country_states(odoo_id,id,token,usrtoken){
        return fetch(endpoint + '/odoo/'+odoo_id+'/get/country_state?arg=&limit=1000000&id=' + id, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    update_odoo_client(odoo_id,data,token,usrtoken){
        return fetch(endpoint + '/odoo/'+odoo_id+'/contact', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    mergePdf(token,usrtoken,data){
        return fetch(endpoint + '/ged/'+OALegalGedId+'/merge', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
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

    getUserSignatures(token,usrtoken){
        return fetch(endpoint + '/ged/' + OALegalGedId + '/sign', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getSignatureById(id,token,usrtoken){
        return fetch(endpoint + '/ged/' + OALegalGedId + '/sign/'+ id, {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    deleteSignatureById(id,token,usrtoken){
        return fetch(endpoint + '/ged/' + OALegalGedId + '/sign/'+ id, {
            method: 'DELETE',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    addSignature(data,token,usrtoken){
        return fetch(endpoint + '/ged/' + OALegalGedId + '/sign', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    signDoc(data, doc_id, sign_id,token,usrtoken){
        return fetch(endpoint + '/ged/' + OALegalGedId + '/doc/' + doc_id + '/sign/' + sign_id, {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },



    getBouteilleCadeaux(token,id){
        return fetch(endpoint + '/asset/54daf43b-9226-4277-b9a2-155fa656a324/'+id, {
            method: 'GET',
            headers:this.loadHeaders(token)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    sendBouteilleCadeau(token,usrtoken,data){
        return fetch(endpoint + '/asset/54daf43b-9226-4277-b9a2-155fa656a324', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },



    reportClient(data,token,usrtoken){
        return fetch(endpoint + '/ged/' + OALegalGedId + '/report', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    reportContact(data,token,usrtoken){
        return fetch(endpoint + '/ged/' + OALegalGedId + '/report', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },


    signQualifiedDoc(data,token,usrtoken){
        return fetch(quelifiedSignEndpoint, {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data),
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
    getOrders(token,usrtoken){
        return fetch(endpoint + '/history/', {
            method: 'GET',
            headers:this.loadHeaders(token,usrtoken)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    getOrderDetail(data,token,usrtoken){
        return fetch(endpoint + '/orderdetail/', {
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
    sendAsset(data,asset,token,usrtoken){
        return fetch(endpoint + '/asset/'+asset+'/transfert', {
            method: 'POST',
            headers:this.loadHeaders(token,usrtoken),
            body:JSON.stringify(data)
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
    },



    getContratCession(data){
        return fetch('http://51.158.97.220:3001/api/generateCesionActionSuisse', {
            method: 'POST',
            headers:this.loadHeadersWithoutToken(),
            body:JSON.stringify(data)
        }).then(response => response.blob()).catch(error => {
            console.log(error);
        });
    }



};

export default SmartService;
