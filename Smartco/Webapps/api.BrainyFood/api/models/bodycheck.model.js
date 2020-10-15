'use strict';
var dbConn = require('./../../config/db.config');
//Employee object create
var Questions = function(questions){
    this.email_user = questions.email_user;
    this.info_perso  = questions.info_perso
    this.alimentation1  = questions.alimentation1;
    this.alimentation2   = questions.alimentation2;
    this.budget_alimen    = questions.budget_alimen;
    this.consom_feculent   =questions.consom_feculent;
    this.consom_legume        =questions.consom_legume ;
    this.consom_fruit = questions.consom_fruit;
    this.consom_viande = questions.consom_viande;
    this.consom_laitiers	 = questions.consom_laitiers;
    this.consom_prod_gras = questions.consom_prod_gras;
    this.consom_prod_sucre = questions.consom_prod_sucre;
    this.consom_alcool = questions.consom_alcool;
    this.vous_grignotez = questions.vous_grignotez;
    this.saute_repas = questions.saute_repas;
    this.oui_lequel = questions.oui_lequel;
    this.activite_jour = questions.activite_jour;
    this.heure_sport = questions.heure_sport;
    this.travaill_horraire_decale= questions.travaill_horraire_decale;
    this.probleme_de= questions.probleme_de;
    this.objectif = questions.objectif;



};
Questions.create = function (newEmp, result) {

    console.log(newEmp)

    dbConn.query("INSERT INTO bodycheck set ?", newEmp, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });


};
Questions.findByEmail = function (id, result) {
    dbConn.query("Select * from bodycheck where email_user = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
Questions.findAll = function (result) {
    dbConn.query("Select * from recettes", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('recettes : ', res);
            result(null, res);
        }
    });
};
Questions.update = function(id, employee, result){
    dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [employee.first_name,employee.last_name,employee.email,employee.phone,employee.organization,employee.designation,employee.salary, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
Questions.delete = function(id, result){
    dbConn.query("DELETE FROM recettes WHERE id_rec = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
module.exports= Questions;
