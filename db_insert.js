const mysql = require("mysql");

var insertEmployee = function(connection, param){ 
    var sqlStr = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ? );" 
    sqlStr = mysql.format(sqlStr, param);
    //console.log(sqlStr);
    return new Promise((resolve, reject) => {
        connection.query(sqlStr, function (err, res) {
            if (err) reject(err);
            resolve(res);
        })
    });
}

var insertRole = function(connection, param){ 
    var sqlStr = "INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ? );" 
    sqlStr = mysql.format(sqlStr, param);
    //console.log(sqlStr);
    return new Promise((resolve, reject) => {
        connection.query(sqlStr, function (err, res) {
            if (err) reject(err);
            resolve(res);
        })
    });
}


var insertDepartment = function(connection, param){ 
    var sqlStr = "INSERT INTO department (name) VALUES ( ? );" 
    sqlStr = mysql.format(sqlStr, param);
    //console.log(sqlStr);
    return new Promise((resolve, reject) => {
        connection.query(sqlStr, function (err, res) {
            if (err) reject(err);
            resolve(res);
        })
    });
}

module.exports = {
    insertEmployee: insertEmployee,
    insertRole: insertRole,
    insertDepartment: insertDepartment
};
