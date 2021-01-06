const endpoint = "http://149.202.172.15:3001/api";

let maillingService = {

    sendCustomMailsWithUrl(data){
        return fetch(endpoint+'/sendCustomMailsWithUrl', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },




};

export default maillingService;