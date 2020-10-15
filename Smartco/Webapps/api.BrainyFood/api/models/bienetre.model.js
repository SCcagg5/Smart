'use strict';
var dbConn = require('./../../config/db.config');
//Employee object create
var BienEtre = function(questions){
    this.question_id = questions.question_id;

        this.motivation	=questions.motivation;
        this.souffrez_pathologies=questions.souffrez_pathologies;
        this.fumer_reg=questions.fumer_reg;
        this.arret_fumer=questions.arret_fumer;
        this.age=questions.age;
        this.taille	=questions.taille;
        this.poids =questions.poids;




};
BienEtre.create = function (newEmp, result) {

    console.log(newEmp)

    dbConn.query("INSERT INTO bienetre set ?", newEmp, function (err, res) {
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
BienEtre.findById = function (id, result) {
    dbConn.query("Select * from bienetre where question_id = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
BienEtre.findAll = function (result) {
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
BienEtre.update = function(id, employee, result){
    dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [employee.first_name,employee.last_name,employee.email,employee.phone,employee.organization,employee.designation,employee.salary, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
BienEtre.delete = function(id, result){
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
module.exports=  BienEtre;
