'use strict';
module.exports = function (app) {
    var api = require('../controllers/apiController');

    app.route('/api/generate_oa_provision_doc')
        .post(api.generate_OA_provison_doc);

    app.route('/api/generate_oa_procuration_doc')
        .post(api.generate_OA_procuration);



    app.route('/api/generate_tn_sarl_statut_doc')
        .post(api.generate_TN_sarl_statut);


    app.route('/api/generate_tn_augmCapital1')   // norma, sans prime et sans nouveau(x) associe(s)
        .post(api.generate_TN_augmCapital1);

    app.route('/api/generate_tn_augmCapital2')   // avec nouveau(x) associé(s)
        .post(api.generate_TN_augmCapital2);

    app.route('/api/generate_tn_augmCapital3')   // sans nouveau(x) associé(s)
        .post(api.generate_TN_augmCapital3);

    app.route('/api/generate_tn_augmCapital4')   // avec Cession + sans nouveau(x) associé(s)
        .post(api.generate_TN_augmCapital4);




    app.route('/api/generate_tn_registre_actios')
        .post(api.generate_TN_registre_actios);


    app.route('/api/generate_fr_sas_statut_doc')
        .post(api.generate_FR_sas_statut);



    app.route('/api/generate_tezos_assoc_allocation')
        .post(api.generate_tezos_assoc_allocation);

    app.route('/api/generate_suisse_convertible_loan')
        .post(api.generate_suisse_convertible_loan);



    app.route('/api/sendCustomMailWithUrl')
        .post(api.sendCustomMailWithUrl)

    app.route('/api/sendMailWithAttach')
        .post(api.sendMailWithAttach)

    app.route('/api/send_sms_verifCode')
        .post(api.send_sms_verif_code)

};
