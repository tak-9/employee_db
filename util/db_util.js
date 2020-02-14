const mysql = require("mysql");

var sqlStrs = 
{
    insertEmployee : "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ? );", 
    insertRole : "INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ? );", 
    insertDepartment : "INSERT INTO department (name) VALUES ( ? );",
    updateEmployeeRole: "UPDATE employee SET role_id = ? WHERE id = ?;", 
    updateEmployeeManager: "UPDATE employee SET manager_id = ? WHERE id = ?;",
    deleteEmployee: "DELETE FROM employee WHERE id = ? ;",
    deleteDepartment: "DELETE FROM department WHERE id = ? ;",
    deleteRole: "DELETE FROM role WHERE id = ? ",
    selectEmployees: "SELECT * FROM employee order by id",
    selectEmployeesByDepartment: "SELECT employee.id, employee.first_name, employee.last_name, department.name " +
                                    "FROM ((employee " +
                                    "INNER JOIN role on employee.role_id = role.id) " +
                                    "INNER JOIN department on role.department_id= department.id) " +
                                    "ORDER BY department.name;",
    selectEmployeesByManager: "select e.id as ID, e.first_name as emp_first, e.last_name as emp_last, m.first_name as mgr_first, m.last_name as mgr_last " +
                                "from employee e " + 
                                "inner join employee  m " + 
                                "on e.manager_id = m.id " +
                                "order by m.first_name",
    selectSumSalaryOfDepartment: "SELECT d.name as dept_name, sum(r.salary) as sum_salary " + 
                                "FROM role r " +
                                "INNER JOIN department d ON r.department_id = d.id " + 
                                "GROUP BY r.department_id;",                               
    selectDepartments: "SELECT * FROM department;",
    selectRoles: "SELECT * FROM role;"
}


var execSQL = function(connection, sqlStr, param){ 
    sqlStr = mysql.format(sqlStr, param);
    // console.log(sqlStr);
    return new Promise((resolve, reject) => {
        connection.query(sqlStr, function (err, res) {
            if (err) {
                if (err.errno == 1451) {
                    reject("Unable to delete it due to foreign key constraint. Delete or update referencing data before deleting.");
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
    sqlStrs: sqlStrs,
    execSQL: execSQL,
};
