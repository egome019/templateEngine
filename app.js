const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employee = [];

const start = [
    {
        type: "list",
        message: "What role does your employee have?",
        name: "role",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
            "I don't need to add anymore team members at this time."
        ]
    }
]

const manQuestions = [
    {
        type: "input",
        message:  "What is your Manager's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your Manager's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your Manager's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your Manager's office number?",
        name: "officeNumber"
    }
]

const engQuestions = [
    {
        type: "input",
        message:  "What is your Engineer's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your Engineer's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your Engineer's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your Engineer's GitHub username?",
        name: "github"
    }
]

const intQuestions = [
    {
        type: "input",
        message:  "What is your Intern's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your Intern's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your Intern's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your Intern's school?",
        name: "school"
    }
]

function managerPrompt() {
    inquirer.prompt(manQuestions)

    .then(managerQs => {
        const manager = new Manager(managerQs.name, managerQs.id, managerQs.email,managerQs.officeNumber);
        employee.push(manager);
        console.log(employee)
        startPrompt()
    })

}

function engineerPrompt() {
    inquirer.prompt(engQuestions)

    .then(engineerQs => {
        const engineer = new Engineer(engineerQs.name, engineerQs.id, engineerQs.email, engineerQs.github);
        employee.push(engineer);
        console.log(employee)
        startPrompt()

    })
   
}

function internPrompt() {
    inquirer.prompt(intQuestions)
    .then(internQs => {
        const intern = new Intern(internQs.name, internQs.id, internQs.email, internQs.school);
        employee.push(intern);
        console.log(employee);
        startPrompt();
    })
}

function startPrompt() {
    inquirer.prompt(start)

    .then(response => {
        switch (response.role){
            case "Manager":
                managerPrompt();
                break;
        
            case "Engineer":
                engineerPrompt();
                break;

            case "Intern":
                internPrompt();
                break;

            case "I don't need to add anymore team members at this time.":
                const htmlTemp = render(employee);
                fs.writeFileSync(outputPath, htmlTemp)
                break;
        }
    })
}

function init() {
    console.log("Starting team...");
    startPrompt();
}

init()
