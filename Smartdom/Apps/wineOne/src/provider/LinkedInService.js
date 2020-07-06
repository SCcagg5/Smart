let LinkedInService = {

    getProfileEmail(token){

        return fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },

    getProfileData(token){
        return fetch('https://api.linkedin.com/v2/me', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    }



};

export default LinkedInService;