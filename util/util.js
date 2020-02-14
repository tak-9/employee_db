const dbUtil = require("./db_util.js");

function displayBanner() {
    const banner = 
    "  ______                 _                        \n" +
    " |  ____|               | |                       \n" +
    " | |__   _ __ ___  _ __ | | ___  _   _  ___  ___  \n" +
    " |  __| | '_ ` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\ \n" +
    " | |____| | | | | | |_) | | (_) | |_| |  __/  __/ \n" +
    " |______|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___| \n" +
    "                  | |             __/ |           \n" +
    "                  |_|            |___/            \n" +
    "                                                  \n" +
    "  __  __                                          \n" +
    " |  \\/  |                                         \n" +
    " | \\  / | __ _ _ __   __ _  __ _  ___ _ __        \n" +
    " | |\\/| |/ _` | '_ \\ / _` |/ _` |/ _ \\ '__|       \n" +
    " | |  | | (_| | | | | (_| | (_| |  __/ |          \n" +
    " |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          \n" +
    "                            __/ |                 \n" +
    "                           |___/                  \n" +
    "                                                  \n";
    console.log(banner);
}

function getIdFromRow(str) {
    const regEx = /^[0-9]*/;
    let regExResult = regEx.exec(str);
    return regExResult[0];
}

function getAllEmployees(connection){
    return new Promise((resolve, reject) => {
        var employeesArray = [];
        dbUtil.execSQL(connection, dbUtil.sqlStrs.selectEmployees)
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
        dbUtil.execSQL(connection,dbUtil.sqlStrs.selectRoles)
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
        dbUtil.execSQL(connection, dbUtil.sqlStrs.selectDepartments)
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
    displayBanner: displayBanner,
    getAllEmployees: getAllEmployees,
    getAllRoles: getAllRoles,
    getIdFromRow: getIdFromRow,
    getAllDepartments: getAllDepartments   
};
