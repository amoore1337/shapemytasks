const uniqueColTypeMap = {
  id: 'ID',
  createdById: 'ID',
  projectId: 'ID',
  teamId: 'ID',
};

const typeMap = {
  INTEGER: 'Int',
  FLOAT: 'Float',
  STRING: 'String',
  DATE: 'Date',
  BOOLEAN: 'Boolean',
};

function typeDefForModel(Model, modelName) {
  const attributes = Model.rawAttributes;
  modelName = modelName || Model.getModelName();

  let formattedAttributes = '';
  Object.keys(attributes).forEach((a) => {
    formattedAttributes += `${typeForAttribute(attributes[a])}\n`;
  });

  if (Model.graphAssociations) {
    Object.keys(Model.graphAssociations).forEach((a) => {
      formattedAttributes += `${a}: ${Model.graphAssociations[a]}\n`;
    });
  }

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
    if (!user && requireAuth) {
      rejectUnauthenticated(user);
    }
    return Model.findAll({ order: [['id', 'ASC']] });
  };

  return resolver;
}

function basicFindByIdResolver(Model, requireAuth = true) {
  const resolver = {};
  const modelName = Model.getModelName().toLowerCase();
  resolver[modelName] = async (_, { id }, { user }) => {
    if (!user && requireAuth) {
      return null;
    }
    return Model.findByPk(id);
  };

  return resolver;
}

function rejectUnauthenticated(currentUser) {
  if (!currentUser) {
    throw new Error('You must be logged in to perform this action.');
  }
}

module.exports = {
  uniqueColTypeMap,
  typeMap,
  rejectUnauthenticated,
  typeDefForModel,
  typeForAttribute,
  basicQueryAllResolver,
  basicFindByIdResolver,
};
