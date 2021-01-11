const endpoint = process.env.REACT_APP_JAWHER_API_ENDPOINT


let  PatientService = {

    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        headers.append("Accept", '*/*');
        return headers;
    },
    loadHeadersImage() {
        let headers = new Headers();
        headers.append("Accept", '*/*');
        return headers;
    },

    CreatePatient(data) {
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint + 'PatientCreate', {
            method: 'POST',
            headers: this.loadHeaders(),
            body: formBody
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    getPatientbyEmail(email){

            return fetch(endpoint+'PatientByEmail/'+email, {
                method: 'GET',
                headers:this.loadHeaders(),
            }).then(response => response.json()).catch(error => {
                console.log(error);
            });

    },
    getPatients(){

        return fetch(endpoint+'Patients', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });

    },
    getProduits(){

        return fetch(endpoint+'produits', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });

    },
    getPatientbyId(id){

        return fetch(endpoint+'PatientById/'+id, {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });

    },
    getDataDashboard(email){

        fetch(endpoint+'questionbyEmail/'+email.trim(),{
            method:'GET',

        }).then((response)=>response.json()).catch( error =>{
            console.log(error);
        });

    },
    UpdatePatient(data) {
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint + 'PatientUpdate', {
            method: 'POST',
            headers: this.loadHeaders(),
            body: formBody
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },
    createProduit(data){
        let formBody = [];
        console.log(data)

        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(endpoint+'ProduitCreate', {
            method: 'POST',
            headers:this.loadHeaders(),
            body:formBody
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });

    },

    uploadImage(input){
        const formData  = new FormData();
        console.log(input.target.files[0])
        formData.append('file', input.target.files[0])



        return fetch(endpoint+'uploadImageProduct', {
            method: 'POST',
            headers:this.loadHeadersImage(),
            body:formData
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });

    },
}


export default PatientService;
