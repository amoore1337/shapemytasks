import type { RefetchQueryDescriptor } from '@apollo/client';

function refetchSubscription() {
  const refetchMap: { [collectionName: string]: RefetchQueryDescriptor[] } = {};

  return {
    register(collectionName: string, refetchQuery: RefetchQueryDescriptor) {
      refetchMap[collectionName] = refetchMap[collectionName] ?? [];
      refetchMap[collectionName].push(refetchQuery);
    },

    unregister(collectionName: string, refetchQuery: RefetchQueryDescriptor) {
      refetchMap[collectionName] = (refetchMap[collectionName] ?? []).filter(
        (q) => q !== refetchQuery
      );
    },

    refetchQueries(collectionName: string) {
      return refetchMap[collectionName] ?? [];
    },
  };
}

const subscriber = refetchSubscription();

export default subscriber;
