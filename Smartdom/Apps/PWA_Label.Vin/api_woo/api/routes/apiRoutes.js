'use strict';
module.exports = function (app) {
    var api = require('../controllers/apiController');

    app.route("/api/getCategories")
        .get(api.getCategories);

    app.route("/api/getAllProducts")
        .get(api.getAllProducts);

    app.route("/api/getProducts/:idCateg")
        .get(api.getProductsByCategorie);

    app.route("/api/getProduct/:id")
        .get(api.getProductById);

    app.route("/api/addCustomer")
        .post(api.addCustomer);

    app.route("/api/addOrder")
        .post(api.addOrder);

    app.route("/api/getOrders/:customerId")
        .get(api.getOrdersByCustomer);

    app.route("/api/getOrders")
        .get(api.getOrders);

    app.route("/api/getPayment_gateways")
        .get(api.getPayment_gateways);

    app.route("/api/get_stripe_client_secret")
        .post(api.stripePayment);

    app.route("/api/generateEtiquette")
        .post(api.generateEtiquette);

    app.route("/api/generateEtiquette2")
        .post(api.generateEtiquette2);

    app.route("/api/generateEtiquette3")
        .post(api.generateEtiquette3);



    app.route("/api/getEtiquette/:id")
        .get(api.getEtiquette);

   /* app.route("/api/generateQRCODE")
        .get(api.generateQRCODE);
*/


};
