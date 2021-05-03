const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;



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

    wooapi.get("products", {
        per_page: 10, // 5 products per page
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
