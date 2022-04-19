const generateMarkdown = require("../utils/generate-markdown");

const generateDescription = (descriptionText) => {
  return `## Description

${descriptionText.description}`;
};

module.exports = (templateData) => {
  const { description, installSteps, ...data } = templateData;

  return `# ${data.title}

${generateDescription(description)}`;
};
