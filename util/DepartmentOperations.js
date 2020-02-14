const Operations = require("./Operations");
const util = require("./util.js");
const dbUtil = require("./db_util.js");

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

    getDeleteSqlStr() {
        return dbUtil.sqlStrs.deleteDepartment; 
    }

}

module.exports = DepartmentOperations;
