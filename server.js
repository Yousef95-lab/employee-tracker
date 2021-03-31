//variables
const inquirer = require('inquirer');
const mysql = require('mysql');


//port from activity 13 
const con = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'Youkatm1227!!',
  database: 'employeetracker_db',
});



con.connect((err) => {
  if (err) throw (err);
  userOptions();
});





// Build a command-line application that at a minimum allows the user to:
const userOptions = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        //   * Add departments, roles, employees

        //   * View departments, roles, employees

        //   * Update employee roles
        'Add Departments',
        'Add Department Role',
        'Add Department Employees',
        'View Departments',
        'View Department Roles',
        'View Department Employees',
        'Update Employees Role',
        'Exit',
      ],
    })

    .then((answer) => {
      switch (answer.action) {
        case 'Add Departments':
          addDepartment();
          break;

        case 'Add Department Role':
          addDepartmentRole();
          break;

        case 'Add Department Employees':
          addDepartmentEmployee();
          break;

        case 'View Departments':
          viewDepartments();
          break;

        case 'View Department Roles':
          viewDepartmentRoles();
          break;

        case 'View Department Employees':
          viewDepartmentEmployees();
          break;

        case 'Update Employees Role':
          updateEmployeeRole();
          break;

        case 'Exit':
          con.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

//Add Department Function
const addDepartment = async () => {
  const { newDepartment } = await inquirer
    .prompt(
      {
        name: 'newDepartment',
        type: 'input',
        message: "What is the new department name?"
      },
    )

  const query = "INSERT INTO department(department_name) VALUES (?)";;
  con.query(query, newDepartment, (err, res) => {
    if (err) throw err;
  });
  userOptions();
}

//Add Department Role Function
const addDepartmentRole = async () => {
  console.log('function successful')
  const answers = await inquirer
    .prompt([
      {
        name: 'newDepartmentRoleTitle',
        type: 'input',
        message: "What is the new department role name?"
      },

      {
        name: 'newDepartmentRoleSalary',
        type: 'input',
        message: "What is the new department role salary?"
      },

      {
        name: 'newDepartmentRoleID',
        type: 'input',
        message: "What is the new department role ID?"
      },
    ])

  const query = "INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)";
  con.query(query, [answers.newDepartmentRoleTitle, answers.newDepartmentRoleSalary, answers.newDepartmentRoleID], (err, res) => {
    if (err) throw err;
    console.log(res);
    userOptions();
  });
}

//Add department employee function
const addDepartmentEmployee = async () => {
  const answers = await inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: "What is the new department employee's first name?"
      },

      {
        name: 'lastName',
        type: 'input',
        message: "What is the new department employee's last name?"
      },

      {
        name: 'roleID',
        type: 'input',
        message: "What is the new department employee's ID?"
      },

      {
        name: 'managerID',
        type: 'input',
        message: "What is the new department employee's manger ID?"
      },
    ])

  const query = "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)";;
  con.query(query, [answers.firstName, answers.lastName, answers.roleID, answers.managerID], (err, res) => {
    if (err) throw err;
    console.log(res);
    userOptions();
  });
}

//View department function
const viewDepartments = () => {
  con.query("SELECT * from department", function (err, results, field) {
    if (err) throw (err);
    console.log(results)
    userOptions();
  })
}



  //View department roles functions
  const viewDepartmentRoles = () => {
    con.query("SELECT * from roles", function (err, results, field) {
      if (err) throw (err);
      console.log(results)
      userOptions();
    })
  }


  //View department employees function
  const viewDepartmentEmployees = () => {
    con.query("SELECT * from employee", function (err, results, field) {
      if (err) throw (err);
      console.log(results)
      userOptions();
    })
  }



