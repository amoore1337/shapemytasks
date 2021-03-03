import { BaseMutationOptions, Reference } from '@apollo/client';

type SomeModelObject = {
  id: string;
  [key: string]: any;
}

export function removeCacheItem<T extends { [key: string]: SomeModelObject }>(field: string, action: string): BaseMutationOptions<T> {
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

export function addCacheItem<T>() {

}
