const generateMarkdown = require("../utils/generate-markdown");

const generateInstallSteps = (installStepsArr) => {
  return `${installStepsArr
    .map(({ step }) => {
      return `- ${step}`;
    })
    .join("\n")}`;
};

module.exports = (pageData) => {
  const { installStepsArr, ...data } = pageData;

  return `# ${data.title}

## Description

${data.description1}

${data.description2}

${data.description3}

${data.description4}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

${generateInstallSteps(installStepsArr)}

## Usage

## Credits

## Licence

## Badges

## Features

## How to Contribute

## Tests
`;
};
