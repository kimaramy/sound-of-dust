import { z } from 'zod';

import { stringUnionToArray, toLowerCase, toOrderedBy } from '@/lib/utils';

import { Model } from '../supabase';
import { MapSchema } from './base';
import { LocaleSchema } from './locale';

const collectionSchemaName = 'collection';

type CollectionSchemaName = typeof collectionSchemaName;

type CollectionKey = Uppercase<Model.TableKeys> | 'SEASONALLY';

type CollectionValue = Lowercase<CollectionKey>;

const collectionKeys = Object.freeze(
  toOrderedBy(
    stringUnionToArray<CollectionKey>()(
      'YEARLY',
      'SEASONALLY',
      'MONTHLY',
      'WEEKLY',
      'WEEKDAILY',
      'DAILY'
    ),
    ['YEARLY', 'SEASONALLY', 'MONTHLY', 'WEEKLY', 'WEEKDAILY', 'DAILY']
  )
);

// z.enum 타입이 [string, ...string[]] 형식. 즉 무조건 하나의 요소가 보장되어야하는 NonEmptyArray 타입이므로 불가피하게 이렇게 할당함
const collectionKeySchema = z.enum([
  collectionKeys[0],
  ...collectionKeys.slice(1),
]);

const collectionMap = new Map<CollectionKey, CollectionValue>(
  collectionKeys.map((collectionKey) => [
    collectionKey,
    toLowerCase(collectionKey),
  ])
);

class CollectionSchema extends MapSchema<
  CollectionSchemaName,
  CollectionKey,
  CollectionValue
> {
  constructor() {
    super(
      collectionSchemaName,
      collectionMap,
      collectionKeySchema,
      collectionKeySchema.enum.DAILY
    );
  }
  display(
    collectionKey: CollectionKey,
    locale = LocaleSchema.defaultLocale,
    version: 'sequential' | 'patterned' = 'sequential'
  ) {
    const isKorean = LocaleSchema.isKorean(locale);
    switch (collectionKey) {
      case 'YEARLY':
        return isKorean
          ? version === 'sequential'
            ? '연도별'
            : '매년'
          : version === 'sequential'
          ? 'Yearly'
          : 'Every year';
      case 'SEASONALLY':
        return isKorean
          ? version === 'sequential'
            ? '계절별'
            : '사계절마다'
          : version === 'sequential'
          ? 'Seasonal'
          : 'Every Season';
      case 'MONTHLY':
        return isKorean
          ? version === 'sequential'
            ? '월별'
            : '매달'
          : version === 'sequential'
          ? 'Monthly'
          : 'Every month';
      case 'WEEKLY':
        return isKorean
          ? version === 'sequential'
            ? '주별'
            : '매주'
          : version === 'sequential'
          ? 'Weekly'
          : 'Every week';
      case 'WEEKDAILY':
        return isKorean
          ? version === 'sequential'
            ? '요일별'
            : '요일마다'
          : version === 'sequential'
          ? 'Weekdaily'
          : 'Every weekday';
      case 'DAILY':
        return isKorean
          ? version === 'sequential'
            ? '일별'
            : '매일'
          : version === 'sequential'
          ? 'Daily'
          : 'Everyday';
      default:
        return this.parseKey(collectionKey) as never;
    }
  }
  getDataCount(collectionKey: CollectionKey) {
    switch (collectionKey) {
      case 'YEARLY':
        return 8;
      case 'SEASONALLY':
        return 3;
      case 'MONTHLY':
        return 12;
      case 'WEEKLY':
        return 53;
      case 'WEEKDAILY':
        return 7;
      case 'DAILY':
        return 31;
      default:
        return this.parseKey(collectionKey) as never;
    }
  }
}

const collectionSchema = new CollectionSchema();

export namespace CollectionUtils {
  export type Key = CollectionKey;
  export type Value = CollectionValue;
  export type SchemaName = CollectionSchemaName;
  export const schema = collectionSchema;
}
