// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, email, id, oNumber){
        super(name, email, id);
        this.officeNumber = oNumber;
    }

    getRole(){
        return "Manager";
    }

    getOfficeNumber(){
        const officeNum = this.officeNumber;
        return officeNum;
    }
}


module.exports = Manager