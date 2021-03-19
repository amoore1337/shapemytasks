/* eslint-disable no-underscore-dangle */
import {
  BaseMutationOptions, gql, Reference, Cache,
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

export function addCacheItem<T extends { [key: string]: any }, V>(field: string, action: string, cacheItem?: any): BaseMutationOptions<T, V> {
  return {
    update(cache, { data: result }) {
      if (!result) { return; }
      const cacheAction: Cache.ModifyOptions = {
        fields: {
          [field]: (existingRefs: Reference[] = [], { readField }) => {
            const item = result[action];
            if (!item) { return existingRefs; }

            const newRef = cache.writeFragment({
              data: item,
              fragment: gql`
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

function queryValuesForItem(item: any) {
  let query = '';
  Object.keys(item).forEach((key) => { query += `${key}\n`; });
  return query;
}
