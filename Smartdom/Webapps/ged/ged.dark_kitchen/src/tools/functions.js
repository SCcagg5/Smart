const colors = ['#00AA55', '#e91e63', '#9c27b0', '#939393', '#E3BC00', '#D47500', '#DC2A2A', '#2196f3', '#00bcd4', '#ff9800', '#607d8b'];

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
    },

    buildTree: function (parts, treeNode, name, type, file) {
        if (parts.length === 0) {
            return;
        }
        for (var i = 0; i < treeNode.length; i++) {
            if (parts[0] === treeNode[i].text) {
                this.buildTree(parts.splice(1, parts.length), treeNode[i].children, name, type, file);
                return;
            }
        }
        var newNode = {'text': parts[0], 'children': []};
        if(parts[0].endsWith(".pdf")){
            newNode.name =name;
            newNode.type = type;
            newNode.file = file;
        }
        treeNode.push(newNode);
        this.buildTree(parts.splice(1, parts.length), newNode.children, name,type,file);
    }


}


export default utilFunctions;