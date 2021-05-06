const endpoint = "http://51.210.243.179:8071/"

let LabelService ={

    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", '*/*');
        return headers;
    },


    getCodes(id){
        return fetch(endpoint+"asset/"+id+"/code", {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },



    createAsset(data){
             console.log(data)
        return fetch(endpoint+'asset', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },






}



export default LabelService;
