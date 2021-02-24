const uniqueColTypeMap = {
  id: 'ID',
};

const typeMap = {
  INTEGER: 'Int',
  STRING: 'String',
  DATE: 'Date',
};

function typeDefForModel(Model, modelName) {
  const attributes = Model.rawAttributes;

  let formattedAttributes = '';
  Object.keys(attributes).forEach((a) => {
    formattedAttributes += `${typeForAttribute(attributes[a])}\n`;
  });

  return `
    type ${modelName} {
      ${formattedAttributes}
    }
  `;
}

function typeForAttribute(attribute) {
  // If `allowNull` is null/undefined, then not required:
  const required = attribute.allowNull === false ? '!' : '';
  if (uniqueColTypeMap[attribute.fieldName]) {
    return `${attribute.fieldName}: ${uniqueColTypeMap[attribute.fieldName]}${required}`;
  }
  const fieldType = typeMap[attribute.type.key];
  return `${attribute.fieldName}: ${fieldType}${required}`;
}

module.exports = {
  uniqueColTypeMap,
  typeMap,
  typeDefForModel,
  typeForAttribute,
};
