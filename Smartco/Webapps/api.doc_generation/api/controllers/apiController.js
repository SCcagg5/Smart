'use strict';

var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
var fs = require('fs');
var path = require('path');
var moment = require('moment');
var nodemailer = require('nodemailer')
const ejs = require("ejs");

exports.send_sms_verif_code = function (req,res) {

    var ret = { 'status': 500, 'type': null, 'data': null, 'error': null };
    var phone = req.body.phone;
    var code = req.body.code;
    var ovh = require('ovh')({
        appKey: 'ImquXBtssAAKF1rB',
        appSecret: 'QkFqzoHhPqu8xYmdz3XVujsDmkEqu9bG',
        consumerKey: 'LhGyonoBoZYv6N391WZJSAIK057ULzxr'
    });
    ovh.request('GET', '/sms', function (err, serviceName) {
        if(err) {
            console.log(err, serviceName);
        }
        else {
            console.log("My account SMS is " + serviceName);
            ovh.request('POST', '/sms/' + serviceName + '/jobs', {
                    message: "Votre code d'accès est: " + code,
                    receivers: [phone],
                sender:"SMARTDOM.CH"
                }, function (errsend, result) {
                    console.log(errsend, result);
                    ret.status = 200;
                    ret.error = errsend;
                    ret.data = result
                    res.status(ret.status);
                    res.json(ret);
                });
        }
    });

}

exports.sendMailWithAttach = function (req, res) {

    console.log("Begin Sending")
    var ret = { 'status': 500, 'type': null, 'data': null, 'error': null };

    var emailsReciver = req.body.emailReciver;
    var subject = req.body.subject;
    var msg = req.body.msg;
    var footerMsg = req.body.footerMsg;
    var attach = req.body.attach || [];

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "ent.service0@gmail.com",
            pass: "Majordome2021"
        }
    });

    transporter.sendMail({
        from: '"Majordome " <noreply@ent.fr>',
        to: emailsReciver,
        subject: subject,
        text: msg,
        html: msg + footerMsg,
        attachments: attach

    }).then(result => {
        console.log(result.messageId);
        ret.status = 200;
        ret.data = "EMAIL SENDED";
        res.status(ret.status);
        res.json(ret);

    }).catch(err => {
        console.log("ERROR SEND EMAIL")
        console.log(err);
        ret.status = 500;
        ret.data = " ERROR, EMAIL NOT SENDED";
        ret.error = err;
        res.status(ret.status);
        res.json(ret);
    });

};

exports.sendCustomMailWithUrl = function (req, res) {

    console.log("Begin Sending")

    var ret = { 'status': 500, 'type': null, 'data': null, 'error': null };


    var emailsReciver = req.body.emailReciver;
    var subject = req.body.subject;
    var linkUrl = req.body.linkUrl;
    var url = req.body.url;
    var msg = req.body.msg;
    var footerMsg = req.body.footerMsg;


    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "ent.service0@gmail.com",
            pass: "Majordome2021"
        }
    });

    transporter.sendMail({
        from: '"Majordome " <noreply@ent.fr>',
        to: emailsReciver,
        subject: subject,
        text: msg,
        html: msg + linkUrl.link(url) + footerMsg

    }).then(result => {
        console.log(result.messageId);
        ret.status = 200;
        ret.data = "EMAIL SENDED";
        res.status(ret.status);
        res.json(ret);

    }).catch(err => {
        console.log("ERROR SEND EMAIL")
        console.log(err);
        ret.status = 500;
        ret.data = " ERROR, EMAIL NOT SENDED";
        ret.error = err;
        res.status(ret.status);
        res.json(ret);
    });

};

exports.send_ENFIN_new_room_task_files_mail = function () {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "smartco.majordhome2019@gmail.com",
            pass: "Majordhome2019"
        }
    });

    return new Promise(function(resolve, reject) {

        ejs.renderFile(path.join(__dirname, '../mail_templates/ENFIN_new_room_task_files_template.html'),
            {imc :"87",taille:"1.75cm",poids:"85kg"},
            function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    var mainOptions = {
                        from: '"ENT ENFIN  " <noreply@enfin.fr>',
                        to: "amine.babba@hotmail.com",
                        subject: 'Des nouveaux fichiers compta sont ajoutés par le client Lauret JH dans la tache x',
                        html: data
                    };
                    transporter.sendMail(mainOptions, function (err, info) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve({
                                is_send:true,
                                message:"Mail envoyé avec succès"
                            })
                        }
                    });
                }
            });
    })
};

exports.generate_OA_provison_doc = async function (req, res) {
    console.log("Begin generate doc");
    var data = req.body.data;
    var lang = req.body.lang;
    generate_OA_provison_doc(req, res, lang, data, "oa_provision");
};

exports.generate_OA_procuration = async function (req, res) {
    console.log("Begin generate doc");
    var data = req.body.data;
    generate_OA_procuration_doc(req, res, data, "oa_procuration");
};

exports.generate_TN_sarl_statut = async function (req, res) {
    console.log("Begin generate doc");
    var data = req.body.data;
    generate_TN_SARL_Statut_doc(req, res, data, "Statut_SARL_TN");
};

exports.generate_TN_augmCapital1 = async function (req, res) {
    console.log("Begin generate doc");
    var data = req.body.data;
    generate_TN_AugmCapital1_doc(req, res, data, "Augmentation_Capital_TN");
};

exports.generate_TN_augmCapital2 = async function (req, res) {
    console.log("Begin generate doc");
    var data = req.body.data;
    generate_TN_AugmCapital2_doc(req, res, data, "Augmentation_Capital_TN");
};
exports.generate_TN_augmCapital3 = async function (req, res) {
    console.log("Begin generate doc");
    var data = req.body.data;
    generate_TN_AugmCapital3_doc(req, res, data, "Augmentation_Capital_TN");
};
exports.generate_TN_augmCapital4 = async function (req, res) {
    console.log("Begin generate doc");
    var data = req.body.data;
    generate_TN_AugmCapital4_doc(req, res, data, "Augmentation_Capital_TN");
};
exports.generate_TN_registre_actios = async function (req, res) {
    console.log("Begin generate doc");
    var data = req.body.data;
    generate_TN_RegActios_doc(req, res, data, "Registre_actionnaires_TN");
};

exports.generate_FR_sas_statut = async function (req, res) {
    console.log("Begin generate doc");
    var data = req.body.data;
    generate_FR_SAS_Statut_doc(req, res, data, "Statut_SAS_FR");
};

exports.generate_tezos_assoc_allocation = async function (req, res) {
    console.log("Begin generate doc");
    var data = req.body.data;
    generate_Tezos_assoc_allocation_doc(req, res, data, "Tezos_allocation");
};
exports.generate_suisse_convertible_loan = async function (req, res) {
    console.log("Begin generate doc");
    var data = req.body.data;
    generate_suisse_convertible_loan_doc(req, res, data, "SuisseConvertibleLoan");
};


async function generate_TN_SARL_Statut_doc(req, res, data, code) {

    var ret = {'status' : 500, 'data': null, 'error': null};

    var template = "DOC/STATUTS SARL TUNISIE.docx"

    var dataDOC = await GenerateWordwithImg(template, data, 120, 50);

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


async function generate_TN_AugmCapital1_doc(req, res, data, code) {

    var ret = {'status' : 500, 'data': null, 'error': null};

    var template = "DOC/AugmCapitalNormal.docx"

    var dataDOC = await GenerateWordwithImg(template, data, 120, 50);

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

async function generate_TN_AugmCapital2_doc(req, res, data, code) {

    var ret = {'status' : 500, 'data': null, 'error': null};

    var template = "DOC/AugmCapitalNewAssocie.docx"

    var dataDOC = await GenerateWordwithImg(template, data, 120, 50);

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
async function generate_TN_AugmCapital3_doc(req, res, data, code) {

    var ret = {'status' : 500, 'data': null, 'error': null};

    var template = "DOC/AugmCapitalWithoutNewAssocie.docx"

    var dataDOC = await GenerateWordwithImg(template, data, 120, 50);

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

async function generate_TN_AugmCapital4_doc(req, res, data, code) {

    var ret = {'status' : 500, 'data': null, 'error': null};

    var template = "DOC/AugmCapital_CessionAction_Without_New_Associe.docx"

    var dataDOC = await GenerateWordwithImg(template, data, 120, 50);

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
async function generate_TN_RegActios_doc(req, res, data, code) {

    var ret = {'status' : 500, 'data': null, 'error': null};

    var template = "DOC/Registre_actios.docx"

    var dataDOC = await GenerateWordwithImg(template, data, 120, 50);

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

async function generate_FR_SAS_Statut_doc(req, res, data, code) {

    var ret = {'status' : 500, 'data': null, 'error': null};

    var template = "DOC/Statut_SAS_France.docx"

    var dataDOC = await GenerateWordwithImg(template, data, 120, 50);

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

async function generate_Tezos_assoc_allocation_doc(req, res, data, code) {

    var ret = {'status' : 500, 'data': null, 'error': null};

    var template = "DOC/tezos_assoc_allocation.docx"

    var dataDOC = await GenerateWordwithImg(template, data, 120, 50);

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

async function generate_suisse_convertible_loan_doc(req, res, data, code) {

    var ret = {'status' : 500, 'data': null, 'error': null};

    var template = "DOC/SuisseConvertibleLoan.docx"

    var dataDOC = await GenerateWordwithImg(template, data, 120, 50);

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

async function generate_OA_provison_doc(req, res, lang, data, code) {

    var ret = {'status' : 500, 'data': null, 'error': null};

    var template = lang === "fr" ? "DOC/Provision OA LEGAL - FR.docx" : "DOC/Provision OA LEGAL - ANG.docx"

    var dataDOC = await GenerateWordwithImg(template, data, 120, 50);

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

async function generate_OA_procuration_doc(req, res, data, code) {

    var ret = {'status' : 500, 'data': null, 'error': null};

    var template = "DOC/Procuration_OA.docx"

    var dataDOC = await GenerateWordwithImg(template, data, 120, 50);

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
    var ImageModule = require('docxtemplater-image-module-free');

    const imageOpts = {
        getImage(tag) {
            return base64DataURLToArrayBuffer(tag);
        },
        getSize(img, tagValue, tagName) {
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
                    if(err) console.log(err)
                    console.log(result)
                    if (result && result.status === 0) {
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
    console.log("OK")
    return bytes.buffer;
}
