# Employee Database :card_file_box:
This is an application that manages Employee database by CLI interface. 

<img src="screencapture.png" width="400px">

## Functionalities
The following queries can be made by this application.
* Add departments, roles, employees
* View departments, roles, employees
* Update employee roles
* Update employee managers
* View employees by manager
* Delete departments, roles, and employees
* View the total utilized budget of a department (ie. the combined salaries of all employees in that department)



## Installation  
1.	Ensure MySQL and node.js are installed. 
2.	Download this application by git or clicking "Download ZIP" button from the GitHub Website. 

 `$ git clone https://github.com/tak-9/employee_db.git`

3.	Install libraries. 

 `$ npm install` 

4.  Create database and insert data to MySQL. Run data.sql and emp.sql on MySQL. 

5.	Open `./util/mysql.cfg` and edit MySQL configuration. Change MySQL password if necessary. 

## Usage 
1. Run application.

 `$ node employee.js `

2.	Select an item in the menu to perform search, add, update, delete an entry in the database. 

## Schema Design

<img src="schema.png" width="400px">

## Technologies
Following technologies were used to develop the application.
* [MySQL](https://www.mysql.com/), [Node.js](https://nodejs.org), NPM packages [mysql](https://www.npmjs.com/package/mysql) , [Inquirer](https://www.npmjs.com/package/inquirer), [console.table](https://www.npmjs.com/package/console.table) 


