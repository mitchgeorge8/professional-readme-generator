const generateInstallSteps = (installSteps) => {
  let installString = "";

  for (i = 0; i < installSteps.length; i++) {
    installString += `${i + 1}. ${installSteps[i].step}\n`;
  }

  return installString;
};

const generateUsage = (usage) => {
  if (!usage.image) {
    return usage.text;
  }

  return usage.text + "\n\n![" + usage.altText + "](../dist/screenshot.png)";
};

const generateCredits = (credits) => {
  let creditsString = "";

  if (credits === []) {
    return "";
  }

  for (i=0; i < credits.length; i++) {
    creditsString += `${i + 1}. [${credits[i].name}](${credits[i].link})\n`;
  }

  return creditsString;
};

const generateLicense = (license) => {
  if (license === []) {
    return '';
  }

  return `&copy; ${new Date().getFullYear()} [${license.name}](https://github.com/${license.user})

${license.text}`
}

module.exports = (pageData) => {
  const { title, description, installSteps, usage, credits, license } = pageData;

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

${generateCredits(credits)}
## License

${generateLicense(license)}
`;
};
