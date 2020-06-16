const endpoint = "http://51.158.97.220:8086";

let gCalendarService = {

    getEvents(data){
        return fetch(endpoint+'/dispo/', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    },




};

export default gCalendarService;