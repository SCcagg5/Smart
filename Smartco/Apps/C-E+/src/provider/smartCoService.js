const endpoint = "http://51.158.97.220:3001/api";
/*public url ==> https://us-central1-recto-verso-27814.cloudfunctions.net/app/api/sendmail*/
/*local url ==> http://localhost:5000/api/sendmail*/

let smartCoService = {

    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", 'application/json');
        return headers;
    },

    getAllBonds(data){

        return fetch(endpoint+'/getAllBonds', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    generateCesionActionSuisse(data){
        return fetch(endpoint+'/generateCesionActionSuisse', {
            method: 'POST',
            headers:this.loadHeaders(),
            body: JSON.stringify(data)
        }).then(response => response.blob()).catch(error => {
            console.log(error);
        });
    }



};

export default smartCoService;