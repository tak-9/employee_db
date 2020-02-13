const Operations = require("./Operations");
const util = require("../util.js");
const dbDelete = require("../db_delete");

class RoleOperations extends Operations {

    getDeleteMessage(){
        return "Which role do you want to remove?";
    }

    getMenuItemsForDelete(connection){
        return new Promise((resolve, reject) => {
            util.getAllRoles(connection)
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
            dbDelete.deleteRole(connection, [id])
            .then((res)=>{
                resolve(res);
            })
            .catch((err)=>{
                reject(err);
            });    
        })
    }
}

module.exports = RoleOperations;
