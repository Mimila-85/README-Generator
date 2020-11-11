const inquirer = require("inquirer");
const fs = require("fs");

inquirer
    .prompt([
        {
            type: "input",
            name: "github",
            message: "What is your GitHub username?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?",
        },
        {
            type: "input",
            name: "projectName",
            message: "What is your project's name?",
        },
        {
            type: "input",
            name: "description",
            message: "Please write a short description of your project.",
        },
        {
            type: "list",
            name: "license",
            message: "What kind of license should your project have?",
            choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
        },
        {
            type: "input",
            name: "installation",
            message: "What command should be run to install dependencies?",
        },
        {
            type: "input",
            name: "tests",
            message: "What command should be run to run tests?",
        },
        {
            type: "input",
            name: "usage",
            message: "What does the user need to know about using the repo?",
        },
        {
            type: "input",
            name: "contributing",
            message: "What does the user need to know about contributing to the repo?",
        },
    ])
    .then(res => {
        
        let licenseType = res.license === "None" ? "No license listed."
        : `This project is licensed under the terms of the ${res.license} license.`;
        
        const newReadMe =
`[![License](https://img.shields.io/badge/license-${res.license}-blue.svg)]
# ${res.projectName}

## Description

${res.description}

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install necessary dependencies, run the following command:
${"```"}
${res.installation}
${"```"}

## Usage

${res.usage}

## License

${licenseType}

## Contributing

${res.contributing}

## Tests

To run tests, run the following command:
${"```"}
${res.tests}
${"```"}

## Questions

If you have any questions about the repo, open an issue or contact me directly at ${res.email}. You can find more of my work at [${res.github}](https://github.com/${res.github})
`

        const fileName = `${res.projectName.toLowerCase().split(" ").join("")}.md`;

        fs.writeFile(fileName, newReadMe, err => {err ? console.log(err) : console.log("Your ReadMe has been created.")})
    })