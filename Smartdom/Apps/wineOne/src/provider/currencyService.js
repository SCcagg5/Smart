let currencyService = {

    loadHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Accept", 'application/json');
        return headers;
    },

    getExchangeRates(data){

        return fetch('https://api.exchangeratesapi.io/latest?symbols=USD,CHF', {
            method: 'GET',
            headers:this.loadHeaders(),
        }).then(response => response.json()).catch(error => {
            console.log(error);
        });
    }



};

export default currencyService;