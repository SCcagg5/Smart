'use strict';
module.exports = function (app) {
    var api = require('../controllers/apiController');





	app.route('/api/sendCustomMailWithUrl')
        .post(api.sendCustomMailWithUrl)

    app.route('/api/sendNlmMailWithUrl')
        .post(api.sendNLMailWithUrl)

    app.route('/api/sendNlmMailWithUrl2')
        .post(api.sendNLMailWithUrl2)

    app.route('/api/recettes')
        .post(api.getRecettes)

    app.route('/api/recettesall')
        .get(api.findAll)

    app.route('/api/recetteCreate')
        .post(api.createRecette)

    app.route('/api/recetteByID/:id')
        .get(api.findById)

    app.route('/api/ingredientsCreate')
        .post(api.createIngredient)


    app.route('/api/ingredients/:id')
        .get(api.getIngredients)


    app.route('/api/questionsCreate')
        .post(api.createQuestions)
    app.route('/api/BodyCheckCreate')
        .post(api.createBodyCheck)

    app.route('/api/miniceurCreate')
        .post(api.createMiniceur)

    app.route('/api/sportCreate')
        .post(api.createSport)
    app.route('/api/bienetreCreate')
        .post(api.createBienEtre)

    app.route('/api/question/:id')
        .get(api.getQuestionData)

    app.route('/api/bodyCheck/:id')
        .get(api.getBodyCheckData)

    app.route('/api/questionbyEmail/:id')
        .get(api.getQuestionByEmail)
    app.route('/api/BodyCheckByEmail/:id')
        .get(api.getBodyCheckByEmail)


    app.route('/api/generateDoc')
        .get(api.generateDoc)

    app.route('/api/getWord')
        .post(api.wordQuill)



};
