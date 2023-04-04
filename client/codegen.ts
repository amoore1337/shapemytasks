import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://localhost/api/graphql',
  documents: ['src/**/*'],
  generates: {
    './src/models/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
      config: {
        operationResultsSuffix: 'Result',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
