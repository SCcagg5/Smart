const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
var QRCode = require('qrcode')
const { PDFDocument,rgb, degrees,} = require('pdf-lib');
const fontKit = require ('@pdf-lib/fontkit')
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const ejs = require("ejs");
let pdff = require("html-pdf");

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

    wooapi.get("products",{context:"edit"}).then((response) => {
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

exports.getCustomers = function(res,res){
    var ret = { 'status': 500, 'type': null, 'data': null, 'error': null };

    wooapi.get('customers').then((response) => {
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

}

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
        const code = await generateQRCODE('http://51.210.243.179:8100/client/'+data.id.toString())
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

exports.generateEtiquettePerso = function (req,res) {
    let data = req.body

    var pdf = path.join(__dirname, '/pdf/ETQ 135x95 Menard-Turi TEMPLATE.pdf')
    var  Image = path.join(__dirname, '/images/arbre1.jpeg')

    const run = async ({ pathToPDF, pathToImage,pathToImage2,pathToImage3 }) => {
        const pdfDoc = await PDFDocument.load(fs.readFileSync(pathToPDF));
        pdfDoc.registerFontkit(fontKit);

        const img = await pdfDoc.embedJpg(fs.readFileSync(pathToImage));
        const img2 = await pdfDoc.embedJpg(fs.readFileSync(pathToImage2));
        const img3 = await pdfDoc.embedJpg(fs.readFileSync(pathToImage3));

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

        /*  firstPage.drawText(data.nom, {
            x: 1,
            y: 200,
            size: 15,
            font: chandlier,
            color: rgb(0.0, 0, 0),
        });*/

        firstPage.drawText(data.annee, {
            x: 120,
            y: 1,
            size: 15,
            font: cusFontLibreBasker,
            color:rgb(1,0,0),
        });

        firstPage.drawImage(img3, {
            x: 1,
            y: 40,
            width: 250,
            height: 200
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
    const pathToPDF = path.join(__dirname, '/pdf/photoperso.pdf');
    assert.notEqual(pathToPDF, null, ERRORS.ARGUMENTS);
    const pathToImage = path.join(__dirname, '/images/arbre1.jpeg');
    assert.notEqual(pathToImage, null, ERRORS.ARGUMENTS);
    const pathToImage2 = path.join(__dirname, '/images/solar1.jpeg');
    assert.notEqual(pathToImage2, null, ERRORS.ARGUMENTS);
    const pathToImage3 = path.join(__dirname, '/images/etiquette/'+data.nom);
    assert.notEqual(pathToImage3, null, ERRORS.ARGUMENTS);

    run({ pathToPDF, pathToImage,pathToImage2,pathToImage3 }).catch(console.error);


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

exports.generateTicket=async function (req,res) {


    let printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,
        width:30,
        interface:"printer:OneNote for Windows 10",
        driver:require('printer'),
        // Number of characters in one line - default: 48
        characterSet: 'SLOVENIA',          // Character set - default: SLOVENIA
        removeSpecialCharacters: false,    // Removes special characters - default: false
        lineCharacter: "-",                                 // Set character for lines - default: "-"
        options:{                                                 // Additional options
            timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
        }

    });
    let isConnected = await printer.isPrinterConnected();
    console.log("Printer connected:", isConnected);

    printer.alignCenter();

    printer.alignLeft();
    printer.newLine();
    printer.println("Hello World!");
    printer.drawLine();

    printer.upsideDown(true);
    printer.println("Hello World upside down!");
    printer.upsideDown(false);
    printer.drawLine();

    printer.invert(true);
    printer.println("Hello World inverted!");
    printer.invert(false);
    printer.drawLine();

    printer.println("Special characters: ČčŠšŽžĐđĆćßẞöÖÄäüÜé");
    printer.drawLine();

    printer.setTypeFontB();
    printer.println("Type font B");
    printer.setTypeFontA();
    printer.println("Type font A");
    printer.drawLine();

    printer.alignLeft();
    printer.println("This text is on the left");
    printer.alignCenter();
    printer.println("This text is in the middle");
    printer.alignRight();
    printer.println("This text is on the right");
    printer.alignLeft();
    printer.drawLine();

    printer.setTextDoubleHeight();
    printer.println("This is double height");
    printer.setTextDoubleWidth();
    printer.println("This is double width");
    printer.setTextQuadArea();
    printer.println("This is quad");
    printer.setTextSize(7,7);
    printer.println("Wow");
    printer.setTextSize(0,0);
    printer.setTextNormal();
    printer.println("This is normal");
    printer.drawLine();

    try {
        printer.printBarcode("4126570807191");
        printer.code128("4126570807191", {
            height: 50,
            text: 1
        });
        printer.beep();
    } catch (error) {
        console.error(error);
    }

    printer.pdf417("4126565129008670807191");
    printer.printQR("https://olaii.com");

    printer.newLine();

    printer.leftRight("Left", "Right");

    printer.table(["One", "Two", "Three", "Four"]);

    printer.tableCustom([
        { text:"Left", align:"LEFT", width:0.5 },
        { text:"Center", align:"CENTER", width:0.25, bold:true },
        { text:"Right", align:"RIGHT", width:0.25 }
    ]);

    printer.tableCustom([
        { text:"Left", align:"LEFT", cols:8 },
        { text:"Center", align:"CENTER", cols:10, bold:true },
        { text:"Right", align:"RIGHT", cols:10 }
    ]);

    printer.cut();
    printer.openCashDrawer();
    // Clears printText value
    try {
        await printer.execute().then((r)=>{
            console.log(r)
        });
        console.log("Print success.");
    } catch (error) {
        console.error("Print error:", error);
    }
}

exports.generateTicketPDF= async function (req, res) {
    let order = req.body

    let qrcode = await generateQRCODE(order.billing.email)
    console.log(qrcode)
    let name = order.billing.first_name
    let total = order.total
    let email = order.billing.email
    let totaltax = order.total_tax
    let items = order.line_items


    //console.log(order)
    ejs.renderFile(path.join(__dirname, './html/bee-equilbre.ejs'), {
        qrcode: qrcode.toString(),
        name: name,
        total: total,
        totaltax: totaltax,
        items: items,
        email:email

    }, function (err, dataa2) {
        if (err) {
            console.log(err);
        } else {

            let options = {

                "header": {
                    "height": "0"
                },
                "footer": {
                    "height": "0",
                },
            };
            pdff.create(dataa2, options).toFile('./businesscard.pdf', function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    console.log(data)


                    res.send("File created successfully");
                }
            });


        }
    });


}

exports.generateFactureLabelVin=function generateFactureLabelVin(req,res) {
    let data = req.body.data
    console.log(data)


    let produit = data.line_items
    let total = data.total
    let adresse=data.billing.postcode + " "+data.billing.city
    let nom = data.billing.last_name
    let prenom= data.billing.first_name
    let date = data.date_created
    let idcommande = data.id
    let tel = data.billing.phone


    var PizZip = require('pizzip');
    var Docxtemplater = require('docxtemplater');


    var fs = require('fs');
    var path = require('path');

//Load the docx file as a binary
    var content = fs
        .readFileSync(path.resolve(__dirname, 'DOC/Facture_bc-1636123-converti (4).docx'), 'binary');

    var zip = new PizZip(content);

    var doc = new Docxtemplater();
    doc.loadZip(zip);

//set the templateVariables

    doc.setData({
        produits:produit,
        total:total,
        nom:nom,
        prenom:prenom,
        adresse:adresse,
        date:date,
        idcommande:idcommande,
        tel:tel
    })


    try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render()
    }
    catch (error) {
        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
        }
        console.log(JSON.stringify({error: e}));
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
    }

    var buf = doc.getZip()
        .generate({type: 'nodebuffer'});

// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    fs.writeFileSync(path.resolve(__dirname, 'FactureBS.docx'), buf);



    const pathfile = `${__dirname}/FactureBS.docx`;



    const extend = '.pdf'
    const enterPath = path.join(__dirname, 'facture.docx');
    const outputPath = path.join(__dirname, `factureBS${extend}`);

// Read file
    const file = fs.readFileSync(pathfile);
    // Convert it to pdf format with undefined filter (see Libreoffice doc about filter)
    const libre = require('libreoffice-convert');

    libre.convert(file, extend, undefined, (err, done) => {
        if (err) {
            console.log(`Error converting file: ${err}`);
        }

        console.log(done)



        // Here in done you have pdf file which you can save or transfer in another stream
        fs.writeFileSync(outputPath, done);

        res.sendfile(outputPath)
    });








}
