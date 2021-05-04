const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
var QRCode = require('qrcode')
const { PDFDocument,rgb, degrees,
} = require('pdf-lib');
const fontKit = require ('@pdf-lib/fontkit')
const fs = require('fs');
const path = require('path');
const assert = require('assert');


const wooapi = new WooCommerceRestApi({
    url: process.env.WOO_URL,
    consumerKey: process.env.WOO_CONSUMER_KEY,
    consumerSecret: process.env.WOO_CONSUMER_SECRET,
    version: process.env.WOO_VERSION
});

const stripe = require('stripe')(process.env.STRIPE_SK)

exports.stripePayment= async function stripePayment(req, res) {

    var ret = { 'status': 500, 'type': null, 'data': null, 'error': null };

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: req.body.currency
    });

    ret.status = 200;
    ret.data = {clientSecret: paymentIntent.client_secret};
    res.status(ret.status);
    res.json(ret);

}


exports.getAllProducts = function (req, res) {

    var ret = { 'status': 500, 'type': null, 'data': null, 'error': null };

    wooapi.get("products", {
        per_page: 10, // 5 products per page
    }).then((response) => {
            ret.status = response.status;
            ret.data = response.data;
            res.status(ret.status);
            res.json(ret);
        })
        .catch((error) => {
            ret.status = error.response.status;
            ret.data = null;
            ret.error = error;
            res.status(ret.status);
            res.json(ret);
        });

};

exports.getProductsByCategorie = function (req, res) {

    var ret = { 'status': 500, 'type': null, 'data': null, 'error': null };

    wooapi.get("products", {
        category: req.params.idCateg,
        per_page: 100
    }).then((response) => {
        ret.status = response.status;
        ret.data = response.data;
        res.status(ret.status);
        res.json(ret);
    })
        .catch((error) => {
            ret.status = error.response.status;
            ret.data = null;
            ret.error = error;
            res.status(ret.status);
            res.json(ret);
        });

};

exports.getCategories = function (req, res) {

    var ret = { 'status': 500, 'type': null, 'data': null, 'error': null };

    wooapi.get("products/categories").then((response) => {
        ret.status = response.status;
        ret.data = response.data;
        res.status(ret.status);
        res.json(ret);
    })
        .catch((error) => {
            ret.status = error.response.status;
            ret.data = null;
            ret.error = error;
            res.status(ret.status);
            res.json(ret);
        });

};

exports.getProductById = function (req, res) {

    var ret = { 'status': 500, 'type': null, 'data': null, 'error': null };

    wooapi.get("products/"+req.params.id).then((response) => {
        ret.status = response.status;
        ret.data = response.data;
        res.status(ret.status);
        res.json(ret);
    })
        .catch((error) => {
            ret.status = error.response.status;
            ret.data = null;
            ret.error = error;
            res.status(ret.status);
            res.json(ret);
        });

};

exports.addCustomer = function (req, res) {

    var ret = { 'status': 500, 'type': null, 'data': null, 'error': null };
    let data = req.body;

    wooapi.post("customers",data).then((response) => {
        ret.status = response.status;
        ret.data = response.data;
        res.status(ret.status);
        res.json(ret);
    })
        .catch((error) => {
            ret.status = error.response.status;
            ret.data = null;
            ret.error = error;
            res.status(ret.status);
            res.json(ret);
        });

};

exports.addOrder = function (req, res) {

    var ret = { 'status': 500, 'type': null, 'data': null, 'error': null };
    let data = req.body;

    wooapi.post("orders",data).then((response) => {
        ret.status = response.status;
        ret.data = response.data;
        res.status(ret.status);
        res.json(ret);
    })
        .catch((error) => {
            ret.status = error.response.status;
            ret.data = null;
            ret.error = error;
            res.status(ret.status);
            res.json(ret);
        });
};

exports.getOrdersByCustomer = function (req, res) {

    var ret = { 'status': 500, 'type': null, 'data': null, 'error': null };

    wooapi.get("orders?customer="+req.params.customerId).then((response) => {
        ret.status = response.status;
        ret.data = response.data;
        res.status(ret.status);
        res.json(ret);
    })
        .catch((error) => {
            ret.status = error.response.status;
            ret.data = null;
            ret.error = error;
            res.status(ret.status);
            res.json(ret);
        });

};

exports.getOrders = function (req, res) {

    var ret = { 'status': 500, 'type': null, 'data': null, 'error': null };

    wooapi.get("orders",{per_page: 100}).then((response) => {
        ret.status = response.status;
        ret.data = response.data;
        res.status(ret.status);
        res.json(ret);
    })
        .catch((error) => {
            ret.status = error.response.status;
            ret.data = null;
            ret.error = error;
            res.status(ret.status);
            res.json(ret);
        });

};

exports.getPayment_gateways = function (req, res) {

    var ret = { 'status': 500, 'type': null, 'data': null, 'error': null };

    wooapi.get("payment_gateways").then((response) => {
        ret.status = response.status;
        ret.data = response.data;
        res.status(ret.status);
        res.json(ret);
    })
        .catch((error) => {
            ret.status = error.response.status;
            ret.data = null;
            ret.error = error;
            res.status(ret.status);
            res.json(ret);
        });

};
exports.generateEtiquetteLaCasaVerde = function (req,res) {
    let data = req.body

    //  let qrCodes = data.codes
    //  console.log(qrCodes)



    var pdf = path.join(__dirname, '/pdf/ETQ 135x95 Bonnet Template.pdf')
    var  Image = path.join(__dirname, '/images/arbre1.jpeg')

    const run = async ({ pathToPDF, pathToImage,pathToImage2}) => {
        const pdfDoc = await PDFDocument.load(fs.readFileSync(pathToPDF));
        pdfDoc.registerFontkit(fontKit);
        const code = await generateQRCODE('http://192.168.1.6:3000/client/'+data.id.toString())
        console.log(code)
        const buffer = Buffer.from(code.replace('data:image/png;base64,',''), "base64");

        const img = await pdfDoc.embedJpg(fs.readFileSync(pathToImage));
        const img2 = await pdfDoc.embedJpg(fs.readFileSync(pathToImage2));
        const qrcode = await pdfDoc.embedPng(buffer)

        const fontParisien=fs.readFileSync(path.join(__dirname, '/font/Parisienne-Regular.ttf'))
        console.log(fontParisien)


        const cusFontParisien = await pdfDoc.embedFont(fontParisien);

        const pages = pdfDoc.getPages()
        const firstPage = pages[0]



        firstPage.drawText(data.nom, {
            x: 65,
            y: 225,
            size: 24,
            font: cusFontParisien,
            color: rgb(0.0, 0, 0),
        });

        firstPage.drawText(data.annee, {
            x: 110,
            y: 65,
            size: 20,

            color: rgb(0.0, 0, 0),
        });

        firstPage.drawImage(qrcode, {
            x: 270,
            y: 2,
            width: 100,
            height: 100
        });

        firstPage.drawImage(img, {
            x: 270,
            y: 110,
            width: 30,
            height: 30
        });
        firstPage.drawImage(img2, {
            x: 302,
            y: 110,
            width: 30,
            height: 30
        });
        const pdfBytes = await pdfDoc.save();
        const newFilePath = data.id+'.pdf';
        fs.writeFileSync(newFilePath, pdfBytes);
    }
    const ERRORS = {
        ARGUMENTS: 'Please provide a path to the PDF file as a first argument and path to an image as the second argument'
    };
    const pathToPDF = path.join(__dirname, '/pdf/lacasaverde.pdf');
    assert.notEqual(pathToPDF, null, ERRORS.ARGUMENTS);
    let pathToImage = path.join(__dirname, '/images/arbre1.jpeg');
    if (data.total<=100){
        pathToImage=path.join(__dirname, '/images/arbre1.jpeg');

    }else {
        pathToImage=path.join(__dirname, '/images/arbre2.jpeg');

    }
    assert.notEqual(pathToImage, null, ERRORS.ARGUMENTS);
    const pathToImage2 = path.join(__dirname, '/images/solar1.jpeg');
    assert.notEqual(pathToImage2, null, ERRORS.ARGUMENTS);

    run({ pathToPDF, pathToImage,pathToImage2}).catch(console.error);



}
exports.generateEtiquette2abelVin = function (req,res) {
    let data = req.body

    var pdf = path.join(__dirname, '/pdf/ETQ 135x95 Menard-Turi TEMPLATE.pdf')
    var  Image = path.join(__dirname, '/images/arbre1.jpeg')

    const run = async ({ pathToPDF, pathToImage,pathToImage2 }) => {
        const pdfDoc = await PDFDocument.load(fs.readFileSync(pathToPDF));
        pdfDoc.registerFontkit(fontKit);

        const img = await pdfDoc.embedJpg(fs.readFileSync(pathToImage));
        const img2 = await pdfDoc.embedJpg(fs.readFileSync(pathToImage2));
        const code = await generateQRCODE(data.tel)
        const buffer = Buffer.from(code.replace('data:image/png;base64,',''), "base64");

        const fontLibreBasker=fs.readFileSync(path.join(__dirname, '/font/LibreBaskerville-Regular.ttf'))
        const font=fs.readFileSync(path.join(__dirname, '/font/font.ttf'))



        const cusFontLibreBasker = await pdfDoc.embedFont(fontLibreBasker);
        const chandlier = await pdfDoc.embedFont(font);
        const qrcode = await pdfDoc.embedPng(buffer)


        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        firstPage.drawImage(qrcode, {
            x: 270,
            y: 2,
            width: 100,
            height: 100
        });
        firstPage.drawText('CHATEAU', {
            x: 70,
            y: 140,
            size: 24,
            font: cusFontLibreBasker,
            color: rgb(0.0, 0, 0),
        });

        firstPage.drawText(data.nom, {
            x: 45,
            y: 100,
            size: 42,
            font: chandlier,
            color: rgb(0.0, 0, 0),
        });

        firstPage.drawText(data.annee, {
            x: 120,
            y: 80,
            size: 15,
            font: cusFontLibreBasker,
            color:rgb(1,0,0),
        });



        firstPage.drawImage(img, {
            x: 270,
            y: 110,
            width: 30,
            height: 30
        });
        firstPage.drawImage(img2, {
            x: 302,
            y: 110,
            width: 30,
            height: 30
        });
        const pdfBytes = await pdfDoc.save();
        const newFilePath = data.id+'.pdf';
        fs.writeFileSync(newFilePath, pdfBytes);
    }
    const ERRORS = {
        ARGUMENTS: 'Please provide a path to the PDF file as a first argument and path to an image as the second argument'
    };
    const pathToPDF = path.join(__dirname, '/pdf/lacasaverde.pdf');
    assert.notEqual(pathToPDF, null, ERRORS.ARGUMENTS);
    const pathToImage = path.join(__dirname, '/images/arbre1.jpeg');
    assert.notEqual(pathToImage, null, ERRORS.ARGUMENTS);
    const pathToImage2 = path.join(__dirname, '/images/solar1.jpeg');
    assert.notEqual(pathToImage2, null, ERRORS.ARGUMENTS);

    run({ pathToPDF, pathToImage,pathToImage2 }).catch(console.error);


}

exports.generateEtiquette3abelVin = function (req,res) {
    let data = req.body

    var pdf = path.join(__dirname, '/pdf/ETQ 135x95 Christmas Template.pdf')
    var  Image = path.join(__dirname, '/images/arbre1.jpeg')

    const run = async ({ pathToPDF, pathToImage,pathToImage2 }) => {
        const pdfDoc = await PDFDocument.load(fs.readFileSync(pathToPDF));
        pdfDoc.registerFontkit(fontKit);
        const code = await generateQRCODE(data.tel)

        const img = await pdfDoc.embedJpg(fs.readFileSync(pathToImage));
        const img2 = await pdfDoc.embedJpg(fs.readFileSync(pathToImage2));

        const fontLibreBasker=fs.readFileSync(path.join(__dirname, '/font/LibreBaskerville-Regular.ttf'))
        const font=fs.readFileSync(path.join(__dirname, '/font/font.ttf'))

        const buffer = Buffer.from(code.replace('data:image/png;base64,',''), "base64");


        const cusFontLibreBasker = await pdfDoc.embedFont(fontLibreBasker);
        const chandlier = await pdfDoc.embedFont(font);
        const qrcode = await pdfDoc.embedPng(buffer)


        const pages = pdfDoc.getPages()
        const firstPage = pages[0]


        firstPage.drawImage(qrcode, {
            x: 270,
            y: 2,
            width: 100,
            height: 100
        });
        firstPage.drawImage(img, {
            x: 270,
            y: 110,
            width: 30,
            height: 30
        });
        firstPage.drawImage(img2, {
            x: 302,
            y: 110,
            width: 30,
            height: 30
        });
        const pdfBytes = await pdfDoc.save();
        const newFilePath = data.id+'.pdf';
        fs.writeFileSync(newFilePath, pdfBytes);
    }
    const ERRORS = {
        ARGUMENTS: 'Please provide a path to the PDF file as a first argument and path to an image as the second argument'
    };
    const pathToPDF = path.join(__dirname, '/pdf/lacasaverde.pdf');
    assert.notEqual(pathToPDF, null, ERRORS.ARGUMENTS);
    const pathToImage = path.join(__dirname, '/images/arbre1.jpeg');
    assert.notEqual(pathToImage, null, ERRORS.ARGUMENTS);
    const pathToImage2 = path.join(__dirname, '/images/solar1.jpeg');
    assert.notEqual(pathToImage2, null, ERRORS.ARGUMENTS);

    run({ pathToPDF, pathToImage,pathToImage2 }).catch(console.error);


}
exports.generateEtiquette4abelVin = function (req,res) {
    let data = req.body

    var pdf = path.join(__dirname, '/pdf/lacasaverde.pdf')
    var  Image = path.join(__dirname, '/images/arbre1.jpeg')

    const run = async ({ pathToPDF, pathToImage,pathToImage2 }) => {
        const pdfDoc = await PDFDocument.load(fs.readFileSync(pathToPDF));
        pdfDoc.registerFontkit(fontKit);
        const code = await generateQRCODE(data.tel)

        const img = await pdfDoc.embedJpg(fs.readFileSync(pathToImage));
        const img2 = await pdfDoc.embedJpg(fs.readFileSync(pathToImage2));

        const fontLibreBasker=fs.readFileSync(path.join(__dirname, '/font/LibreBaskerville-Regular.ttf'))
        const font=fs.readFileSync(path.join(__dirname, '/font/font.ttf'))

        const buffer = Buffer.from(code.replace('data:image/png;base64,',''), "base64");


        const cusFontLibreBasker = await pdfDoc.embedFont(fontLibreBasker);
        const chandlier = await pdfDoc.embedFont(font);
        const qrcode = await pdfDoc.embedPng(buffer)


        const pages = pdfDoc.getPages()
        const firstPage = pages[0]


        firstPage.drawImage(qrcode, {
            x: 270,
            y: 2,
            width: 100,
            height: 100
        });
        firstPage.drawImage(img, {
            x: 270,
            y: 110,
            width: 30,
            height: 30
        });
        firstPage.drawImage(img2, {
            x: 302,
            y: 110,
            width: 30,
            height: 30
        });
        const pdfBytes = await pdfDoc.save();
        const newFilePath = data.id+'.pdf';
        fs.writeFileSync(newFilePath, pdfBytes);
    }
    const ERRORS = {
        ARGUMENTS: 'Please provide a path to the PDF file as a first argument and path to an image as the second argument'
    };
    const pathToPDF = path.join(__dirname, '/pdf/lacasaverde.pdf');
    assert.notEqual(pathToPDF, null, ERRORS.ARGUMENTS);
    const pathToImage = path.join(__dirname, '/images/arbre1.jpeg');
    assert.notEqual(pathToImage, null, ERRORS.ARGUMENTS);
    const pathToImage2 = path.join(__dirname, '/images/solar1.jpeg');
    assert.notEqual(pathToImage2, null, ERRORS.ARGUMENTS);

    run({ pathToPDF, pathToImage,pathToImage2 }).catch(console.error);


}




exports.getEtiquette= function (req,res) {
    let id = req.params.id

    let filePath = id+'.pdf'
    var file = fs.createReadStream(filePath);
    var stat = fs.statSync(filePath);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    file.pipe(res);

}

async function generateQRCODE(text) {

    try {
        return await QRCode.toDataURL(text);
    } catch (err) {
        return console.error(err);
    }



}

exports.generateQRCODE=function (req,res) {
    generateQRCODE('test')

}
