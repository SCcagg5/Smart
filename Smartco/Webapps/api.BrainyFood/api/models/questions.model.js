'use strict';
var dbConn = require('./../../config/db.config');
//Employee object create
var Questions = function(questions){

    this.info_perso  = questions.info_perso
    this.age = questions.age;
    this.taille=questions.taille;
    this.poids=questions.poids;
    this.objectif=questions.objectif;
    this.stress=questions.stress;
    this.habitude_alim=questions.habitude_alim;
    this.aliment_consm_pas=questions.aliment_consm_pas;
    this.ethnicity=questions.ethnicity;
    this.activite_sportive=questions.activite_sportive;
    this.activite_physique=questions.activite_physique;
    this.complement_alimentaire=questions.complement_alimentaire;
    this.lequels=questions.lequels;
    this.email=questions.email;




};
Questions.create = function (newEmp, result) {

    console.log(newEmp)

    dbConn.query("INSERT INTO questions set ?", newEmp, function (err, res) {
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
Questions.findById = function (id, result) {
    dbConn.query("Select * from questions where id_user = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
Questions.findByEmail = function (id, result) {
    dbConn.query("Select * from questions where email = ? ", id, function (err, res) {
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
