const generateMarkdown = require("../utils/generate-markdown");

const generateInstallSteps = (installSteps) => {
  let installString = "";

  for (i = 0; i < installSteps.length; i++) {
    installString += `${i + 1}. ${installSteps[i].step}\n`;
  }

  return installString;
};

const generateUsage = (usage) => {
  if (!usage.image) {
    return usage.usage;
  }

  return usage.usage + "\n\n![" + usage.altText + "](../dist/screenshot.png)";
};

module.exports = (pageData) => {
  const { title, description, installSteps, usage } = pageData;

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

${generateUsage(usage)}

## Credits

## Licence`;

  // ${generateMarkdown(license)}
  // `;
};
