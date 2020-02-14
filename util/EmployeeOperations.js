const Operations = require("./Operations");
const util = require("./util.js");
const dbUtil = require("./db_util.js");

class EmployeeOperatins extends Operations {

    getDeleteMessage(){
        return "Which employee do you want to remove?";
    }

    getMenuItemsForDelete(connection){
        return new Promise((resolve, reject) => {
            util.getAllEmployees(connection)
            .then((res)=>{
                resolve(res);    
            })
            .catch((err)=>{
                reject(err);
            })
        });
    }

    getDeleteSqlStr() {
        return dbUtil.sqlStrs.deleteEmployee; 
    }

}

module.exports = EmployeeOperatins;
