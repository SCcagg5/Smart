'use strict';
module.exports = function (app) {
    var api = require('../controllers/apiController');

    app.route('/api/generate_oa_provision_doc')
        .post(api.generate_OA_provison_doc);

    app.route('/api/generate_oa_procuration_doc')
        .post(api.generate_OA_procuration);

    app.route('/api/generate_tn_sarl_statut_doc')
        .post(api.generate_TN_sarl_statut);

    app.route('/api/sendCustomMailWithUrl')
        .post(api.sendCustomMailWithUrl)

    app.route('/api/sendMailWithAttach')
        .post(api.sendMailWithAttach)

    app.route('/api/send_sms_verifCode')
        .post(api.send_sms_verif_code)

};
