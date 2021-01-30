'use strict';
module.exports = function (app) {
    var api = require('../controllers/apiController');

    app.route('/api/generate_oa_provision_doc')
        .post(api.generate_OA_provison_doc);

};
