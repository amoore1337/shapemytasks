/* eslint-disable no-underscore-dangle */
import { BaseMutationOptions, gql, Reference } from '@apollo/client';

export function removeCacheItem<T extends { [key: string]: any }, V>(field: string, action: string): BaseMutationOptions<T, V> {
  return {
    update(cache, { data: result }) {
      if (!result) { return; }
      cache.modify({
        fields: {
          [field]: (existingRefs: Reference[] = [], { readField }) => {
            const item = result[action];
            if (!item) { return existingRefs; }

            return existingRefs.filter((ref) => item.id !== readField('id', ref));
          },
        },
      });
    },
  };
}

export function addCacheItem<T extends { [key: string]: any }, V>(field: string, action: string): BaseMutationOptions<T, V> {
  return {
    update(cache, { data: result }) {
      if (!result) { return; }
      cache.modify({
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
      });
    },
  };
}

function queryValuesForItem(item: any) {
  let query = '';
  Object.keys(item).forEach((key) => { query += `${key}\n`; });
  return query;
}
