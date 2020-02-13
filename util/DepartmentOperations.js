const Operations = require("./Operations");
const util = require("../util.js");
const dbDelete = require("../db/db_delete");

class DepartmentOperations extends Operations {

    getDeleteMessage(){
        return "Which department do you want to remove?";
    }

    getMenuItemsForDelete(connection){
        return new Promise((resolve, reject) => {
            util.getAllDepartments(connection)
            .then((res)=>{
                resolve(res);    
            })
            .catch((err)=>{
                reject(err);
            })
        });
    }

    execDelete(connection, id) {
        return new Promise((resolve, reject) => {
            dbDelete.deleteDepartment(connection, [id])
            .then((res)=>{
                resolve(res);
            })
            .catch((err)=>{
                reject(err);
            });    
        })
    }
}

module.exports = DepartmentOperations;
