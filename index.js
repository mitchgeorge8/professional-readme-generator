// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const generateMarkdown = require("./src/generate-markdown");
const { writeFile, copyFile } = require("./utils/generate-file");

let data = [];
let image = "";

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

const promptUsage = (data) => {
  console.log("\nUsage\n--------------------");

  if (!data.usage) {
    data.usage = "";
  }

  return inquirer
    .prompt([
      {
        type: "input",
        name: "text",
        message: "Provide instructions and examples for use.",
      },
      {
        type: "confirm",
        name: "confirmImage",
        message: "Would you like to add a screenshot of your project?",
      },
      {
        type: "input",
        name: "image",
        message:
          "Copy and paste the file path to your screenshot (including the file name).",
        when: ({ confirmImage }) => {
          if (confirmImage) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        name: "altText",
        message: "Please provide alt text for your image.",
        when: ({ image }) => {
          if (image) {
            return true;
          } else {
            return false;
          }
        },
      },
    ])
    .then((usage) => {
      if (usage.image) {
        image = usage.image;
      }

      data.usage = usage;
      return data;
    });
};

const promptConfirmCredit = (data) => {
  console.log("\nCredits\n--------------------");

  if (!data.credits) {
    data.credits = [];
  }

  return inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirmCredit",
        message: "Do you have any collaborators for this project?",
      },
    ])
    .then((confirm) => {
      if (confirm.confirmCredit) {
        return promptCredits(data);
      } else {
        return data;
      }
    });
};

const promptCredits = (data) => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Name of collaborator:",
      },
      {
        type: "input",
        name: "link",
        message: "Link to their GitHub or website:",
      },
      {
        type: "confirm",
        name: "confirmAddCredit",
        message: "Do you have any more collaborators/assets you wish to add?",
      },
    ])
    .then((credit) => {
      data.credits.push(credit);
      if (credit.confirmAddCredit) {
        return promptCredits(data);
      } else {
        return data;
      }
    });
};

const promptLicense = (data) => {
  console.log("\nLicense\n--------------------");

  if (!data.license) {
    data.license = [];
  }

  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter your full name:",
      },
      {
        type: "input",
        name: "user",
        message: "Enter your GitHub username:",
      },
      {
        type: "input",
        name: "text",
        message: "Enter the license text:",
      },
    ])
    .then((license) => {
      data.license = license;
      return data;
    });
};

// Function call to initialize app
promptTitle(data)
  .then(promptDescription)
  .then(promptFirstInstallStep)
  .then(promptUsage)
  .then(promptConfirmCredit)
  .then(promptLicense)
  .then((pageData) => {
    return generateMarkdown(pageData);
  })
  .then((writeFileData) => {
    return writeFile(writeFileData);
  })
  .then((writeFileResponse) => {
    console.log(writeFileResponse.message);
    return copyFile(image);
  })
  .catch((err) => {
    console.log(err);
  });
