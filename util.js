const mysql = require("mysql");
const dbSelect = require("./db/db_select.js.js");

function getIdFromRow(str) {
    const regEx = /^[0-9]*/;
    let regExResult = regEx.exec(str);
    return regExResult[0];
}

function getAllEmployees(connection){
    return new Promise((resolve, reject) => {
        var employeesArray = [];
        dbSelect.selectEmployees(connection)
        .then((res)=>{
            for (var i=0; i < res.length; i++) {
                let employeeFullName = res[i].id + " " + res[i].first_name + " " + res[i].last_name;
                employeesArray.push(employeeFullName);           
            }
            resolve(employeesArray);
        })
        .catch((err) => {
            reject(err);
        })
    });
}

function getAllRoles(connection){
    return new Promise((resolve, reject) => {
        var rolesArray = [];
        dbSelect.selectRoles(connection) 
        .then((res)=>{
            for (var i=0; i < res.length; i++) {
                let role = res[i].id + " " + res[i].title;
                rolesArray.push(role);
            }
            resolve(rolesArray);
        })
        .catch((err) => {
            reject(err);
        })
    });
}

function getAllDepartments(connection){
    return new Promise((resolve, reject) => {
        var departmentsArray = [];
        dbSelect.selectDepartments(connection) 
        .then((res)=>{
            for (var i=0; i < res.length; i++) {
                let role = res[i].id + " " + res[i].name;
                departmentsArray.push(role);
            }
            resolve(departmentsArray);
        })
        .catch((err) => {
            reject(err);
        })
    });
}


module.exports = {
    getAllEmployees: getAllEmployees,
    getAllRoles: getAllRoles,
    getIdFromRow: getIdFromRow,
    getAllDepartments: getAllDepartments   
};
