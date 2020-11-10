
const endpoint = "http://localhost:3001/api/"

let  PatientService = {

    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
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

    sendMailDevi(data){
        return fetch(endpoint + 'MailDevi', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data),
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
    getPatients(){

        return fetch(endpoint+'Patients', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
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
}


export default PatientService;