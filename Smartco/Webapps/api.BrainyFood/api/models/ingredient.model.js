'use strict';
var dbConn = require('./../../config/db.config');
//Employee object create
var ingr = function(recette){
    this.nom_Ingr = recette.nom_Ingr;
    this.dose_Ingre = recette.dose_Ingre;
    this.id_rec = recette.id_rec;


};
ingr.create = function (newEmp, result) {
    dbConn.query("INSERT INTO ingredients set ?", newEmp, function (err, res) {
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
ingr.findById = function (id, result) {
    dbConn.query("Select * from ingredients where id_rec = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
ingr.findAll = function (result) {
    dbConn.query("Select * from ingredients", function (err, res) {
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
ingr.update = function(id, employee, result){
    dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [employee.first_name,employee.last_name,employee.email,employee.phone,employee.organization,employee.designation,employee.salary, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
ingr.delete = function(id, result){
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
module.exports= ingr;
