// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const generateFile = require("./src/readme-template");
const writeFile = require("./utils/generate-file");

// TODO: Create an array of questions for user input
const promptQuestions = () => {
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
    {
      type: "input",
      name: "description1",
      message: "What was your motiviation?",
    },
    {
      type: "input",
      name: "description2",
      message: "Why did you build this project?",
    },
    {
      type: "input",
      name: "description3",
      message: "What problem does it solve?",
    },
    {
      type: "input",
      name: "description4",
      message: "What did you learn?",
    },
  ]);
};

const promptInstallSteps = (data) => {
  if (!data.installStepsArr) {
    data.installStepsArr = [];
  }

  return inquirer
    .prompt([
      {
        type: "input",
        name: "step",
        message: "Describe a new step for installation",
      },
      {
        type: "confirm",
        name: "confirmAddStep",
        message: "Would you like to add another step?",
        default: false,
      },
    ])
    .then((installStep) => {
      data.installStepsArr.push(installStep);
      if (installStep.confirmAddStep) {
        return promptInstallSteps(data);
      } else {
        return data;
      }
    });
};

// Function call to initialize app
promptQuestions()
  .then(promptInstallSteps)
  .then((pageData) => {
    return generateFile(pageData);
  })
  .then((writeFileData) => {
    return writeFile(writeFileData);
  })
  .then((writeFileResponse) => {
    console.log(writeFileResponse);
  })
  .catch((err) => {
    console.log(err);
  });
