$(onReady);

// global variables
let employees = [];

function onReady() {
  $("#submitButton").on("click", addEmployee);
  $("#employeesOut").on("click", ".deleteEmployeeButton", deleteEmployee);
} //end onReady

function addEmployee() {
  console.log("in addEmployee function");
  // get input
  let newEmployee = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val(),
    employeeId: $("#employeeId").val(),
    title: $("#title").val(),
    salary: $("#salary").val(),
  }; // end addEmployee

  console.log("adding:", newEmployee);

  // add employee to array
  employees.push(newEmployee),
    console.log("employees:", employees),
    // clear input fields
    $("#firstName").val("");
  $("#lastName").val("");
  $("#title").val("");
  $("#employeeId").val("");
  $("#salary").val("");
  calculateSalaries();
} // end addEmployee

function calculateSalaries() {
  // calculate monthly costs
  let totalSalaries = 0;

  // loop through employees
  for (let i = 0; i < employees.length; i++) {
    // add up all salaries
    totalSalaries += Number(employees[i].salary);
  } // end

  console.log("totalSalaries", totalSalaries);

  // divide total by 12 for monthly
  console.log("totalSalaries/12", totalSalaries / 12);

  //put total monthly on the DOM
  let el = $("#totalMonthlyOut");
  el.empty();
  el.append("$" + (totalSalaries / 12).toFixed(2));
  //decimal round to 2

  // turn red if monthly expense greater than 20k
  if (totalSalaries / 12 > 20000) {
    $("#totalMonthlyOut").css("background-color", "red");
  }

  el = $("#employeesOut");
  el.empty();
  //
  for (let employee of employees) {
    const thisEmployee = employee;
    el.append(`
        <li>
        ${thisEmployee.firstName} ${thisEmployee.lastName} ${thisEmployee.employeeId}
  ${thisEmployee.title} ${thisEmployee.salary} <button class="deleteEmployeeButton">Delete</button>
        </li>
        `);
  }
}

function deleteEmployee() {
  console.log("in deleteEmployee", $(this).parent());
  $(this).parent().remove();
  // deleteEmployeeButton
} // delete employees
