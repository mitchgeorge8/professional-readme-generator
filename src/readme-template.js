const generateMarkdown = require("../utils/generate-markdown");

const generateInstallSteps = (installSteps) => {
  let installString = "";

  for (i=0; i < installSteps.length; i++) {
    installString += `${(i + 1)}. ${installSteps[i].step}\n`
  }

  return installString;
};

module.exports = (pageData) => {
  const { description, installSteps, title } = pageData;

  console.log(pageData);

  return `# ${title}

## Description

${description.des1}

${description.des2}

${description.des3}

${description.des4}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

${generateInstallSteps(installSteps)}
## Usage

## Credits

## Licence`

// ${generateMarkdown(license)}
// `;
};
