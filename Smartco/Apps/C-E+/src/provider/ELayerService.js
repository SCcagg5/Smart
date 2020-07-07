const endpoint = "https://api.smartdom.ch/";

const contractAdr = "0x70dc7BE0c79159FffcE171CcA2C11Af5cb8552d4";
const ElayerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTMyMjY3MDAsInBhc3N3b3JkIjoxMzMxMTI1ODA4OTM3MTM1NzR9.NkwBntdWyPkmGts8Sr7kJ-nb15vJdcPYXbVqz-NRxLU";
const ElayerUserToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTMzMTMxMzIsImlkIjoiYzIxYmZmM2ItNWUxYi00ODQ3LWE2MTktN2E5ODM2MmVjNTkyIiwicGFzc3dvcmQiOi04MzYwMTU4MjcyNjkzMzAwMzB9.zz5ahhydWfwDD2yJQMlqVs8AFciNZZcHXAVVL76wU6s";

let ELayerService = {

    signIn(){
        return fetch(endpoint+'signin/', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({email:"test@test.fr",password1:"test"})
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    createWallet(){
        return fetch(endpoint+'wallet/create/', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json','token':ElayerToken,'usrtoken':ElayerUserToken}
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getWallets(token){
        return fetch(endpoint+'wallets', {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json','usrtoken':token}
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getWalletByAdr(adress){
        return fetch(endpoint+'wallet/'+adress, {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    addFund(data,adress){
        return fetch(endpoint+'wallet/'+adress+'/token/'+contractAdr+'/fund', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json','token':ElayerToken,'usrtoken':ElayerUserToken},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    transfer(data,adress){
        return fetch(endpoint+'wallet/'+adress+'/token/'+contractAdr+'/send', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json','token':ElayerToken,'usrtoken':ElayerUserToken},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },



};

export default ELayerService;