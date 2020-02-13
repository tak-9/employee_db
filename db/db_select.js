const mysql = require("mysql");

var selectEmployees = function (connection) {
    return new Promise((resolve, reject) => {
        var sqlStr = "SELECT * FROM employee order by id";
        connection.query(sqlStr, function (err, res) {
            if (err) reject(err);
            resolve(res);
        })
    });
}

var selectEmployeesByDepartment = function (connection) {
    return new Promise((resolve, reject) => {
        // console.log("selectEmployeesByDepartment");
        var sqlStr = "SELECT employee.id, employee.first_name, employee.last_name, department.name " +
            "FROM ((employee " +
            "INNER JOIN role on employee.role_id = role.id) " +
            "INNER JOIN department on role.department_id= department.id) " +
            "ORDER BY department.name;";
        connection.query(sqlStr, function (err, res) {
            if (err) reject(err);
            resolve(res);
        })
    });
}

var selectEmployeesByManager = function (connection) {
    console.log("selectEmployeesByManager");
}

var selectDepartments = function (connection) {
    return new Promise((resolve, reject) => {
        //console.log("selectDepartments");
        var sqlStr = "SELECT * FROM department;"
        connection.query(sqlStr, function (err, res) {
            if (err) reject(err);
            resolve(res);
        })
    });
}

var selectRoles = function (connection) {
    return new Promise((resolve, reject) => {
        //console.log("selectRoles");
        var sqlStr = "SELECT * FROM role;"
        connection.query(sqlStr, function (err, res) {
            if (err) reject(err);
            resolve(res);
        })
    });
}

module.exports = {
    selectEmployees: selectEmployees,
    selectEmployeesByDepartment: selectEmployeesByDepartment,
    selectEmployeesByManager: selectEmployeesByManager,
    selectDepartments: selectDepartments,
    selectRoles: selectRoles,
};
