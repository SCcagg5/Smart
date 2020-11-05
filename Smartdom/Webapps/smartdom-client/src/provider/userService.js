const endpoint = "http://51.15.229.251:3002/api";
//const endpoint = "http://localhost:3004/api";
//const endpoint = "http://51.15.229.251:3002/api";

let userService = {

    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", 'application/json');
        return headers;
    },

    generateCesionActionSuisse(data){
        //console.log(data) 
        return fetch(endpoint+'/generateCesionActionSuisse', {
            method: 'POST',
            headers:this.loadHeaders(),
            body: JSON.stringify(data)
        }).then(response => response.blob()).catch(error => {
            console.log(error);
        });
    }

};

export default userService