const endpoint = "https://docgen.smartdom.ch/api";
//const endpoint = "http://localhost:3005/api";

let DocGenerationService = {

    generateProvision(data){
        return fetch(endpoint+'/generate_oa_provision_doc', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    generate_TN_SARL_Statut(data){
        return fetch(endpoint+'/generate_tn_sarl_statut_doc', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    generate_TN_AugmCapitalNormal(data){
        return fetch(endpoint+'/generate_tn_augmCapital1', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    generate_TN_AugmCapital_with_without_new_assoc(data,type){
        return fetch(endpoint+ (type === "2" ? '/generate_tn_augmCapital2' : '/generate_tn_augmCapital3'), {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    generate_TN_AugmCapital_with_Cession(data){
        return fetch(endpoint+ '/generate_tn_augmCapital4', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    generate_TN_RegActios(data){
        return fetch(endpoint+'/generate_tn_registre_actios', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    generate_FR_SAS_Statut(data){
        return fetch(endpoint+'/generate_fr_sas_statut_doc', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    generate_Tezos_assoc_allocation(data){
        return fetch(endpoint+'/generate_tezos_assoc_allocation', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    generate_Suisse_convertible_loan(data){
        return fetch(endpoint+'/generate_suisse_convertible_loan', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    }




};

export default DocGenerationService;
