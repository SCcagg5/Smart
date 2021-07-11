const endpoint = "http://51.158.97.220:3002/api";

let tokenizationService = {


    transferToken(data){
        console.log(data);
        return fetch('https://test.openfiz.com/api/tokens/0x868034992A1DAA792409A685b62CB055c9907c2B/transfer', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json','Authorization': 'Basic '+btoa('demo:demo'), },
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },




};

export default tokenizationService;