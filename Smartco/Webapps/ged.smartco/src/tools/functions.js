const colors = ['#00AA55', '#e91e63', '#9c27b0', '#939393', '#E3BC00', '#D47500', '#DC2A2A','#2196f3','#00bcd4','#ff9800','#607d8b'];

let utilFunctions = {

    getCharColor: function (text) {
        return colors[this.numberFromText(text) % colors.length]
    },

    numberFromText: function (text) {
        let charCodes = text
            .split('') // => ["A", "A"]
            .map(char => char.charCodeAt(0)) // => [65, 65]
            .join(''); // => "6565"
        return parseInt(charCodes, 10);
    }


}




export default utilFunctions;