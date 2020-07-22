const endpoint = "https://pdf.smartdom.ch/";


let DocSearchService = {

    login(){
        return fetch(endpoint+'login/', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({pass:"password"})
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    ocr(data){
        return fetch(endpoint+'ocr/', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    search(data,token){
        return fetch(endpoint+'search/', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json','token':token},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getText(data){
        return fetch(endpoint+'text/', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },




};

export default DocSearchService;