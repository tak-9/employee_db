const Operations = require("./Operations");
const util = require("./util.js");
const dbUtil = require("./db_util.js");

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

    getDeleteSqlStr() {
        return dbUtil.sqlStrs.deleteRole; 
    }
    
}

module.exports = RoleOperations;
