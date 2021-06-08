/* eslint-disable no-underscore-dangle */
import {
  BaseMutationOptions, gql, Reference, Cache, ApolloCache, DocumentNode, TypedDocumentNode, StoreObject,
} from '@apollo/client';

export function removeCacheItem<T extends { [key: string]: any }, V>(field: string, action: string, cacheItem?: any): BaseMutationOptions<T, V> {
  return {
    update(cache, { data: result }) {
      if (!result) { return; }
      const cacheAction: Cache.ModifyOptions = {
        fields: {
          [field]: (existingRefs: Reference[] = [], { readField }) => {
            const item = result[action];
            if (!item) { return existingRefs; }

            return existingRefs.filter((ref) => item.id !== readField('id', ref));
          },
        },
      };

      let id = cacheItem;
      if (cacheItem && typeof cacheItem !== 'string') {
        id = cache.identify(cacheItem);
      }

      if (id) {
        cacheAction.id = id;
      }
      cache.modify(cacheAction);
    },
  };
}

type Fragment = DocumentNode | TypedDocumentNode<any, any>;

type GeneralKeyVal = { [key: string]: any };

type AddCacheItemArgs<T extends GeneralKeyVal> = [
  cache: ApolloCache<object>,
  result: T | null | undefined,
  field: string,
  action: string,
  existingCacheReference?: string | StoreObject,
  fragment?: Fragment,
];

export function addCacheItem<T extends GeneralKeyVal>(...args: AddCacheItemArgs<T>) {
  const [
    cache,
    result,
    field,
    action,
    existingCacheReference,
    fragment,
  ] = args;

  if (!result) { return; }
  const cacheAction: Cache.ModifyOptions = {
    fields: {
      [field]: (existingRefs: Reference[] = [], { readField }) => {
        const item = result[action];
        if (!item) { return existingRefs; }

        const newRef = cache.writeFragment({
          data: item,
          fragment: fragment || gql`
            fragment New${item.__typename} on ${item.__typename} {
              ${queryValuesForItem(item)}
            }
          `,
        });

        const existingRef = existingRefs.some((ref) => readField('id', ref) === item.id);
        if (existingRef) {
          return existingRefs;
        }

        return [...existingRefs, newRef];
      },
    },
  };

  if (existingCacheReference && typeof existingCacheReference === 'string') {
    cacheAction.id = existingCacheReference;
  } else if (existingCacheReference) {
    cacheAction.id = cache.identify(existingCacheReference as StoreObject);
  }

  cache.modify(cacheAction);
}

function queryValuesForItem(item: any) {
  let query = '';
  Object.keys(item).forEach((key) => { query += `${key}\n`; });
  return query;
}
