import { useEffect } from 'react';

import { RefetchQueryDescriptor } from '@apollo/client';

import refetchSubscriber from '@/models/refetchSubscriber';

const { register, unregister } = refetchSubscriber;

type RefetchSubscriberHook = (refetchQuery: RefetchQueryDescriptor) => void;

export default function buildRefetchSubscriberHook(collectionName: string): RefetchSubscriberHook {
  return (refetchQuery) => {
    useEffect(() => {
      register(collectionName, refetchQuery);

      return () => {
        unregister(collectionName, refetchQuery);
      };
    }, [refetchQuery]);
  };
}
