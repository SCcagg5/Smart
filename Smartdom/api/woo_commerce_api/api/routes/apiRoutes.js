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



};
