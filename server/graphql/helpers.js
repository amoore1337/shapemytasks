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

function basicQueryAllResolver(Model, requireAuth = true) {
  const resolver = {};
  const tableName = Model.getTableName();
  const pluralName = tableName.charAt(0).toLowerCase() + tableName.slice(1);
  resolver[pluralName] = async (_, __, { user }) => {
    if (!user && requireAuth) { return null; }
    return Model.findAll();
  };

  return resolver;
}

module.exports = {
  uniqueColTypeMap,
  typeMap,
  typeDefForModel,
  typeForAttribute,
  basicQueryAllResolver,
};
