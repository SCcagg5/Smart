'use strict';
module.exports = function (app) {
    var api = require('../controllers/apiController');






    app.route('/api/MailDevi')
        .post(api.sendNLMailDevi)




    app.route('/api/acompteDevi/:id/:acompte')
        .get(api.createAcompteDevi)


};
