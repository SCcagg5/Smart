'use strict';
var dbConn = require('./../../config/db.config');
//Employee object create
var Patient = function(patient){

    this.id_user  = patient.id_user
    this.nom = patient.nom;
    this.prenom= patient.prenom;
    this.email= patient.email;
    this.num_nom_rue=patient.num_nom_rue;
    this.societe = patient.societe;
    this.code_postal=patient.code_postal;
    this.ville=patient.ville;
    this.pays=patient.pays;
    this.telephone=patient.telephone;
    this.parrainage=patient.parrainage;
    this.capteurs=patient.capteurs;
    this.bodycheck=patient.bodycheck;
    this.ayurecheck=patient.ayurecheck
    this.access_token_google=patient.access_token_google


};
Patient.create = function (newEmp, result) {

    console.log(newEmp)

    dbConn.query("INSERT INTO patients set ?", newEmp, function (err, res) {
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
Patient.findById = function (id, result) {
    dbConn.query("Select * from patients where id_user = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
Patient.findByEmail = function (id, result) {
    dbConn.query("Select * from patients where email = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
Patient.findAll = function (result) {
    dbConn.query("Select * from patients", function (err, res) {
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
Patient.update = function(email, employee, result){
    dbConn.query("UPDATE patients SET nom=?,prenom=?,email=?,num_nom_rue=?,societe=?,code_postal=?,ville=?,pays=?,telephone=?,parrainage=?,capteurs=? , bodycheck=?,ayurecheck=?,access_token_google=? WHERE email = ?", [employee.nom,employee.prenom,employee.email,employee.num_nom_rue,employee.societe,employee.code_postal,employee.ville,employee.pays,employee.telephone,employee.parrainage,employee.capteurs,employee.bodycheck,employee.ayurecheck,employee.access_token_google, email], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
Patient.delete = function(id, result){
    dbConn.query("DELETE FROM patients WHERE id_user = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
module.exports= Patient;
