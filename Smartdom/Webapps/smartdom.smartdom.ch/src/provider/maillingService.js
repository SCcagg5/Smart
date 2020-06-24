let maillingService = {

    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", 'application/json');
        return headers;
    },

    sendMailSign(data){

        return fetch('https://apiocr.smartco.link/sign', {
            method: 'POST',
            body:JSON.stringify(data),
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    verifSmartCoUser(data){

        return fetch('http://149.202.172.15:3001/api/verifsmartCoUser', {
            method: 'POST',
            body:JSON.stringify(data),
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    addSmartCoUser(data){

        return fetch('http://149.202.172.15:3001/api/addsmartCoUser', {
            method: 'POST',
            body:JSON.stringify(data),
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    sendDocsToAssociesAfterAugmCapital(data){

        return fetch('http://149.202.172.15:3001/api/sendMailtoAsscieAfterAumgCapital', {
            method: 'POST',
            body:JSON.stringify(data),
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },



};

export default maillingService;