/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "fragment ScopeFragment on Scope {\n  id\n  title\n  progress\n  color\n  projectId\n  position\n  closedAt\n  niceToHave\n  createdAt\n  updatedAt\n  flag {\n    id\n    message\n    createdBy {\n      id\n      name\n      email\n    }\n  }\n}\n\nquery Scope($id: ID!) {\n  scope(id: $id) {\n    ...ScopeFragment\n  }\n}\n\nquery Scopes {\n  scopes {\n    ...ScopeFragment\n  }\n}": types.ScopeFragmentFragmentDoc,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ScopeFragment on Scope {\n  id\n  title\n  progress\n  color\n  projectId\n  position\n  closedAt\n  niceToHave\n  createdAt\n  updatedAt\n  flag {\n    id\n    message\n    createdBy {\n      id\n      name\n      email\n    }\n  }\n}\n\nquery Scope($id: ID!) {\n  scope(id: $id) {\n    ...ScopeFragment\n  }\n}\n\nquery Scopes {\n  scopes {\n    ...ScopeFragment\n  }\n}"): (typeof documents)["fragment ScopeFragment on Scope {\n  id\n  title\n  progress\n  color\n  projectId\n  position\n  closedAt\n  niceToHave\n  createdAt\n  updatedAt\n  flag {\n    id\n    message\n    createdBy {\n      id\n      name\n      email\n    }\n  }\n}\n\nquery Scope($id: ID!) {\n  scope(id: $id) {\n    ...ScopeFragment\n  }\n}\n\nquery Scopes {\n  scopes {\n    ...ScopeFragment\n  }\n}"];

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;