var deleteEmployee = function (connection, param) {
    return new Promise((resolve, reject) => {
        var sqlStr = "DELETE FROM employee WHERE id = ? ";
        connection.query(sqlStr, param, function (err, res) {
            if (err) {
                if (err.errno == 1451) {
                    reject("Unable to delete it as other employee references this role. Delete or update referencing data before deleting.");
                } else { 
                    reject(err);
                }                
            } else {
                resolve(res);
            }
        })
    });
}

var deleteDepartment = function (connection, param) {
    return new Promise((resolve, reject) => {
        var sqlStr = "DELETE FROM department WHERE id = ? ";
        connection.query(sqlStr, param, function (err, res) {
            if (err) {
                if (err.errno == 1451) {
                    reject("Unable to delete it as other role references this role. Delete or update referencing data before deleting.");
                } else { 
                    reject(err);
                }                
            } else {
                resolve(res);
            }
        })
    });
}

var deleteRole = function (connection, param) {
    return new Promise((resolve, reject) => {
        var sqlStr = "DELETE FROM role WHERE id = ? ";
        connection.query(sqlStr, param, function (err, res) {
            if (err) {
                if (err.errno == 1451) {
                    reject("Unable to delete it as other employee or department references this role. Delete or update referencing data before deleting.");
                } else { 
                    reject(err);
                }                
            } else {
                resolve(res);
            }
        })
    });
}

module.exports = {
    deleteEmployee: deleteEmployee,
    deleteDepartment: deleteDepartment,
    deleteRole: deleteRole
};
