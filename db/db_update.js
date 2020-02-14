const mysql = require("mysql");

var updateEmployeeRole = function(connection, param){ 
    // console.log("updateEmployeeRole");
    var sqlStr = "UPDATE employee SET role_id = ? WHERE id = ?;" 
    sqlStr = mysql.format(sqlStr, param);
    //console.log(sqlStr);
    return new Promise((resolve, reject) => {
        connection.query(sqlStr, function (err, res) {
            if (err) reject(err);
            resolve(res);
        })
    });
}

var updateEmployeeManager = function(connection, param){
    var sqlStr = "UPDATE employee SET manager_id = ? WHERE id = ?;" 
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
    updateEmployeeRole: updateEmployeeRole,
    updateEmployeeManager: updateEmployeeManager
};
