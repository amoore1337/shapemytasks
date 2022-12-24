import { Scopes } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';

// TODO: This in-memory implementation will not scale. Move to something like Redis?

const pubSub = new PubSub();

export enum SubscriptionEvents {
  ScopeCreated = 'SCOPE_CREATED',
  ScopeUpdated = 'SCOPE_UPDATED',
  ScopeDeleted = 'SCOPE_DELETED',
  ScopeBatchProgressUpdated = 'SCOPE_BATCH_PROGRESS_UPDATED',
}

type Implements<T, U extends T> = {};

interface BaseParamMap {
  type: SubscriptionEvents;
  data: any;
}

interface ScopeCreateParams extends Implements<BaseParamMap, ScopeCreateParams> {
  type: SubscriptionEvents.ScopeCreated;
  data: {
    scopeCreated: Scopes;
  };
}

interface ScopeUpdateParams extends Implements<BaseParamMap, ScopeUpdateParams> {
  type: SubscriptionEvents.ScopeUpdated;
  data: {
    scopeUpdated: Scopes;
  };
}

interface ScopeDeleteParams extends Implements<BaseParamMap, ScopeDeleteParams> {
  type: SubscriptionEvents.ScopeDeleted;
  data: {
    scopeDeleted: Scopes;
  };
}

interface ScopeBatchProgressUpdatedParams
  extends Implements<BaseParamMap, ScopeBatchProgressUpdatedParams> {
  type: SubscriptionEvents.ScopeBatchProgressUpdated;
  data: {
    scopeBatchProgressUpdated: Scopes[];
  };
}

type EventParams =
  | ScopeCreateParams
  | ScopeUpdateParams
  | ScopeDeleteParams
  | ScopeBatchProgressUpdatedParams;

export function publishEvent({ type, data }: EventParams) {
  pubSub.publish(type, data);
}

export function subscribeWithFilter(filteredEvents: SubscriptionEvents[]) {
  return () => pubSub.asyncIterator(filteredEvents);
}
