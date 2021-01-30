'use strict';

var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
var fs = require('fs');
var path = require('path');
var moment = require('moment');

exports.generate_OA_provison_doc = async function (req, res) {
    console.log("Begin generate doc");
    var data = req.body.data;
    var lang = req.body.lang;
    generate_OA_provison_doc(req, res, lang, data, "oa_provision");
};


async function generate_OA_provison_doc(req, res, lang, data, code) {

    var ret = {'status' : 500, 'data': null, 'error': null};

    var template = lang === "fr" ? "DOC/Provision OA LEGAL - FR.docx" : "DOC/Provision OA LEGAL - ANG.docx"

    var dataDOC = await GenerateWordwithImg(template, data, 150, 50);

    var dataPdf = await ConvertDOcVerPdf(dataDOC, code);
    //delete file
    const path1 = '/tmp/' + code + '.docx';
    const path2 = '/tmp/' + code + '.pdf';
    try {
        fs.unlinkSync(path1);
        fs.unlinkSync(path2);
    } catch (err) {
        console.error(err)
    }
    ret.data = dataPdf.toString('base64');
    ret.status = 200;
    res.status(ret.status);
    console.log("****End Generate Doc ****");
    res.json(ret);

}


function GenerateWordwithImg(template, DataInput, longueur, largeur) {
    //Load the docx file as a binary
    var content = fs.readFileSync(path.resolve(__dirname, template), 'binary');
    var ImageModule = require('docxtemplater-image-module');

    const imageOpts = {
        getImage(tag) {
            return base64DataURLToArrayBuffer(tag);
        },
        getSize(img, tagValue, tagName) {
            if (tagName === "signatureUrl")
                return [120, 50];
            else if (tagName === "qrcode")
                return [125, 125];
            else
                return [longueur, largeur]
        }
    };

    var imageModule = new ImageModule(imageOpts);
    var zip = new JSZip(content);
    var doc = new Docxtemplater();
    doc.loadZip(zip);
    doc.setData(DataInput);
    doc.attachModule(imageModule);

    try {
        doc.render()
    } catch (error) {
        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
        };
        console.log(JSON.stringify({error: e}));
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
    }

    return doc.getZip().generate({type: 'nodebuffer'});

}


function ConvertDOcVerPdf(json, code) {

    return new Promise((resolve, reject) => {

        fs.writeFileSync('/tmp/' + code + '.docx', json);
        resolve(code + '.docx');
    }).then((file) => {
            return new Promise((resolve, reject) => {
                var converter = require('office-converter')();
                converter.generatePdf('/tmp/' + file, function (err, result) {
                    if (result.status === 0) {
                        resolve(code + ".pdf");
                    }
                });
            })
        })
        .then((file) => {
            return new Promise((resolve, reject) => {
                var content2 = fs.readFileSync('/tmp/' + file);
                var buf = new Buffer(content2);
                resolve(buf);
            })
        });
}

function base64DataURLToArrayBuffer(dataURL) {
    const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
    if (!base64Regex.test(dataURL)) {
        return false;
    }
    const stringBase64 = dataURL.replace(base64Regex, "");
    let binaryString;
    if (typeof window !== "undefined") {
        binaryString = window.atob(stringBase64);
    } else {
        binaryString = new Buffer(stringBase64, "base64").toString("binary");
    }
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes.buffer;
}