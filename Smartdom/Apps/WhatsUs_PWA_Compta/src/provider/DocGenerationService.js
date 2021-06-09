//const endpoint = "https://docgen.smartdom.ch/api";
const endpoint = "http://localhost:3005/api";

let DocGenerationService = {

    generateProcuration(data){
        return fetch(endpoint+'/generate_oa_procuration_doc', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },




};

export default DocGenerationService;