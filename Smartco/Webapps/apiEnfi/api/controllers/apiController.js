'use strict';

var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
const ejs = require("ejs");
var fs = require('fs');
var nodemailer = require('nodemailer')
var path = require('path');
var moment = require('moment');
const fetch =require('node-fetch')
global.Headers = fetch.Headers;


const {writeFile} = require('fs');
const pdf2base64 = require('pdf-to-base64');
const decode = require('base64-arraybuffer')
const endpoint = "https://api.smartdom.ch"

const {promisify} = require('util');
const writeFilePromise = promisify(writeFile);





exports.sendNLMailDevi =  function (req, res) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "smartco.majordhome2019@gmail.com",
            pass: "Majordhome2019"
        }
    });
    let body = req.body


    let nom = body.nom

    let email = body.email

    console.log(body.file)
    let time = new Date().getTime()
    let pathh = __dirname + "/"+time.toString()+".pdf"

    if (fs.existsSync(pathh)) {
        //file exists
        fs.unlink(pathh, (err) => {
            if (err) throw err;
            console.log('path/file.txt was deleted');
        });
    }



    pdf2base64(body.file)
        .then(
            (response) =>
                decode.decode(response.toString())


        ).then((tt)=>{
        console.log(tt)
        writeFilePromise(pathh, Buffer.from(tt))
    }).then(()=>{
        ejs.renderFile(path.join(__dirname, '../html/beefree-c8tdc5qu9b.ejs'), {
            lien: body.file2


        }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var mainOptions = {
                    from: '"Enfin " <noreply@smartco.fr>',
                    to: email,
                    subject: 'Devi Enfin',
                    html: data,
                    attachments: [{
                        filename: 'file.pdf',
                        path: pathh,
                        contentType: 'application/pdf'
                    }],


                };
                //console.log("html data ======================>", mainOptions.html);

                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        res.json({
                            msg: 'fail'
                        })
                    } else {
                        res.json({
                            msg: 'success'
                        })
                    }
                });
            }
        });

    })






};

function loadHeaders(token,usrtoken) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append("Accept", 'application/json');
    headers.append("token", token);
    headers.append("usrtoken", usrtoken);
    return headers;
}


exports.createAcompteDevi = function (req,res) {
    let id = req.params.id
    let pourcentage = req.params.acompte

getToken().then((data)=>{
    var datas ={
        email: "test@test.fr",
        password1: "test"
    }
    let token = data.data.token
    login(datas,token).then(async (dd) => {
        var userToken = dd.data.usrtoken

        console.log(pourcentage)

        let dataBill = await getBill(token,userToken,id)
        var total=dataBill.data[0].amount_total
        console.log(pourcentage+" "+total )
        var acompte = (total*parseFloat(pourcentage))/100
        console.log(acompte.toFixed(2))

        let odoo_data = [
            {
            "access_token":"eafd285777ggobfvxyvnx",
            "state": "draft",
            "type": "out_invoice",
            "invoice_sent": false,
            "l10n_ch_isr_sent": false,
            "name":dataBill.data[0].name,
            "invoice_date": dataBill.data[0].invoice_date,
            "date":dataBill.data[0].date,
            "journal_id": 1,
            "currency_id": 5,
            "invoice_user_id": 3,
            "invoice_incoterm_id": false,
            "auto_post": false,
            "to_check": false,
            "authorized_transaction_ids": [
                [
                    6,
                    false,
                    []
                ]
            ],
            "tax_lock_date_message": false,
            "id": false,
            "invoice_payment_state": "not_paid",
            "invoice_filter_type_domain": "sale",
            "company_currency_id": 5,
            "commercial_partner_id": "",
            "bank_partner_id": 1,
            "invoice_has_outstanding": false,
            "l10n_ch_currency_name": "EURO",
            "invoice_sequence_number_next_prefix": false,
            "invoice_sequence_number_next": false,
            "invoice_has_matching_suspense_amount": false,
            "has_reconciled_entries": false,
            "restrict_mode_hash_table": false,
            "partner_id": 84,
            "ref": 121006,
            "invoice_vendor_bill_id": false,
            "invoice_payment_term_id": 1,
            "invoice_date_due": "2020-09-06",
            "company_id": 1,
            "amount_untaxed": 0,
            "amount_by_group": [],
            "amount_total": 0,
            "invoice_payments_widget": "False",
            "amount_residual": 0,
            "invoice_outstanding_credits_debits_widget": false,
            "narration": false,
            "invoice_origin": false,
            "fiscal_position_id": 1,
            "invoice_cash_rounding_id": false,
            "invoice_source_email": false,
            "invoice_payment_ref": false,
            "invoice_partner_bank_id": false,
            "reversed_entry_id": false,
            "message_follower_ids": [],
            "activity_ids": [],
            "message_ids": [],
            "message_attachment_count": 0,
            "invoice_line_ids": [
                [
                    0,
                    "virtual_"+(Math.floor(100 + Math.random() * 900)).toString(),
                    {
                        "sequence": 10,
                        "account_id": 104,
                        "quantity":1 ,
                        "discount": 0,
                        "partner_id": false,
                        "currency_id": false,
                        "debit": 0,
                        "credit": 0,
                        "display_type": false,
                        "product_id": 1,
                        "name": "Acompte",
                        "analytic_account_id": false,
                        "analytic_tag_ids": [
                            [
                                6,
                                false,
                                []
                            ]
                        ],

                        "price_unit": acompte.toFixed(2),
                        "tax_ids": [
                            [
                                6,false,[]
                            ]
                        ],
                        "amount_currency": 0,
                        "date_maturity": false,
                        "tag_ids": [
                            [
                                6,
                                false,
                                []
                            ]
                        ],
                        "recompute_tax_line": false,
                        "is_rounding_line": false,
                        "exclude_from_invoice_tab": false
                    },

                ],


            ],
            "line_ids": [

            ]
        }]
        create_facture_odoo(token,userToken,{data:odoo_data}).then((createdFacture)=>{
            console.log(createdFacture.data)

            let file ="http://91.121.162.202:10013/my/invoices/"+createdFacture.data.id+"?access_token=eafd285777ggobfvxyvnx&report_type=pdf&download=true"


            res.redirect(file)
        })
    })

})
}

function create_facture_odoo(token,usrtoken,data){


    return fetch(endpoint + '/odoo/test/bill', {
        method: 'POST',
        headers:loadHeaders(token,usrtoken),
        body:JSON.stringify(data),
    }).then(response => response.json()).catch(error => {
        console.log(error);
    });
}

function getToken() {
    return fetch(endpoint + '/login/', {
        method: 'POST',
        headers:loadHeaders("",""),

        body:JSON.stringify({pass:"password"})
    }).then(response => response.json()).catch(error => {
        console.log(error);
    });

}
function  login(data,token){
    return fetch(endpoint + '/signin/', {
        method: 'POST',
        headers:loadHeaders(token,""),
        body:JSON.stringify(data)
    }).then(response => response.json()).catch(error => {
        console.log(error);
    });
}


async function getBill(token,usrtoken,id) {

    return fetch(endpoint + '/odoo/test/get/bill?id='+id, {
        method: 'GET',
        headers:loadHeaders(token,usrtoken)
    }).then(response => response.json()).catch(error => {
        console.log(error);
    });

}

