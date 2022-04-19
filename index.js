// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const generateFile = require("./src/readme-template");
const writeFile = require("./utils/generate-file");

// TODO: Create an array of questions for user input
const promptTitle = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter your project title (Required):",
      validate: (titleInput) => {
        if (titleInput) {
          return true;
        } else {
          console.log("Please enter a title for your project.");
          return false;
        }
      },
    },
  ]);
};

const promptDescription = (projectData) => {
  if (!projectData.description) {
    projectData.description = [];
  }

  console.log(`
===========
Description
===========
    `);

  return inquirer.prompt([
    {
      type: "input",
      name: "description",
      message: "What was your motiviation?",
    },
    {
      type: "input",
      name: "description",
      message: "Why did you build this project?",
    },
    {
      type: "input",
      name: "description",
      message: "What problem does it solve?",
    },
    {
      type: "input",
      name: "description",
      message: "What did you learn?",
    },
  ]);
};

const promptInstallSteps = (projectData) => {
  if (!projectData.installSteps) {
    projectData.installSteps = [];
  }

  console.log(`
============
Installation
============
    `);

  return inquirer.prompt([
      {
        type: "input",
        name: "step",
        message: "Describe the next step of installation",
      },
      {
        type: "confirm",
        name: "stepConfirm",
        message: "Do you want to add another step?",
        default: false,
      },
    ])
    .then((installData) => {
      projectData.installSteps.push(installData);
      if (installData.stepConfirm) {
        return promptInstallSteps(projectData);
      } else {
        return projectData;
      }
    });
};

// Function call to initialize app
promptTitle()
  .then(promptDescription)
  .then(promptInstallSteps)
  .then((projectData) => {
    return generateFile(projectData);
  })
  .then((fileContent) => {
    return writeFile(fileContent);
  })
  .then((writeFileResponse) => {
    console.log(writeFileResponse);
  })
  .catch((err) => {
    console.log(err);
  });
