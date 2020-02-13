var deleteEmployee = function (connection, param) {
    return new Promise((resolve, reject) => {
        var sqlStr = "DELETE FROM employee WHERE id = ? ";
        connection.query(sqlStr, param, function (err, res) {
            if (err) reject(err);
            resolve(res);
        })
    });
}

var deleteDepartment = function (connection, param) {
    return new Promise((resolve, reject) => {
        var sqlStr = "DELETE FROM department WHERE id = ? ";
        connection.query(sqlStr, param, function (err, res) {
            if (err) reject(err);
            resolve(res);
        })
    });
}

var deleteRole = function (connection, param) {
    return new Promise((resolve, reject) => {
        var sqlStr = "DELETE FROM role WHERE id = ? ";
        connection.query(sqlStr, param, function (err, res) {
            if (err) reject(err);
            resolve(res);
        })
    });
}

module.exports = {
    deleteEmployee: deleteEmployee,
    deleteDepartment: deleteDepartment,
    deleteRole: deleteRole
};
