'use strict';
var dbConn = require('./../../config/db.config');
//Employee object create
var Employee = function(recette){
    this.list_Duree_Cuission = recette.list_Duree_Cuission;
    this.list_Duree_prepa_repas  = recette.list_Duree_prepa_repas;
    this.list_Gramme_Glucide          = recette.list_Gramme_Glucide;
    this.list_Gramme_Lipide   = recette.list_Gramme_Lipide;
    this.list_Gramme_Proteine    = recette.list_Gramme_Proteine;
    this.list_Nombre_calorie         = recette.list_Nombre_calorie ;
    this.list_Nombre_person         = recette.list_Nombre_person ;
    this.list_Pourcentrage_glucides     = recette.list_Pourcentrage_glucides
    this.list_Pourcentrage_lipides = recette.list_Pourcentrage_lipides
    this.list_Pourcentrage_proteines	 = recette.list_Pourcentrage_proteines
    this.list_Tendances = recette.list_Tendances
    this.list_nomRecette = recette.list_nomRecette
    this.list_photo = recette.list_photo
    this.list_plat = recette.list_plat
    this.list_video = recette.list_video

};
Employee.create = function (newEmp, result) {
    dbConn.query("INSERT INTO recettes set ?", newEmp, function (err, res) {
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
Employee.findById = function (id, result) {
    dbConn.query("Select * from recettes where id_rec = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
Employee.findAll = function (result) {
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
Employee.update = function(id, employee, result){
    dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [employee.first_name,employee.last_name,employee.email,employee.phone,employee.organization,employee.designation,employee.salary, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
Employee.delete = function(id, result){
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
module.exports= Employee;
