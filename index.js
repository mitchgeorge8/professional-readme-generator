// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const generateFile = require("./src/readme-template");
const writeFile = require("./utils/generate-file");

let data = [];

// TODO: Create an array of questions for user input
const promptTitle = (data) => {
  console.log("\nTitle\n--------------------");

  return inquirer
    .prompt([
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
    ])
    .then((title) => {
      data = title;
      return data;
    });
};

const promptDescription = (data) => {
  console.log("\nDescription\n--------------------");

  if (!data.description) {
    data.description = [];
  }

  return inquirer
    .prompt([
      {
        type: "input",
        name: "des1",
        message: "What was your motiviation?",
      },
      {
        type: "input",
        name: "des2",
        message: "Why did you build this project?",
      },
      {
        type: "input",
        name: "des3",
        message: "What problem does it solve?",
      },
      {
        type: "input",
        name: "des4",
        message: "What did you learn?",
      },
    ])
    .then((description) => {
      data.description = description;
      return data;
    });
};

const promptFirstInstallStep = (data) => {
  console.log("\nInstallation Steps\n--------------------");

  if (!data.installSteps) {
    data.installSteps = [];
  }

  return inquirer
    .prompt([
      {
        type: "input",
        name: "step",
        message: "Describe the first step to installing your project.",
      },
      {
        type: "confirm",
        name: "confirmAddStep",
        message: "Would you like to add another step?",
        default: false,
      },
    ])
    .then((installStep) => {
      data.installSteps.push(installStep);
      if (installStep.confirmAddStep) {
        return promptInstallSteps(data);
      } else {
        return data;
      }
    });
};

const promptInstallSteps = (data) => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "step",
        message: "Describe the next step for installation",
      },
      {
        type: "confirm",
        name: "confirmAddStep",
        message: "Would you like to add another step?",
        default: false,
      },
    ])
    .then((installStep) => {
      data.installSteps.push(installStep);
      if (installStep.confirmAddStep) {
        return promptInstallSteps(data);
      } else {
        return data;
      }
    });
};

const promptUsage = (data) => {};

const promptCredits = (data) => {};

const promptLicense = (data) => {};

// Function call to initialize app

promptTitle(data)
  .then(promptDescription)
  .then(promptFirstInstallStep)
  .then((pageData) => {
    return generateFile(pageData);
  })
  .then((writeFileData) => {
    return writeFile(writeFileData);
  })
  .then((writeFileResponse) => {
    console.log(writeFileResponse.message);
  })
  .catch((err) => {
    console.log(err);
  });
