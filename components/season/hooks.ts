'use client';

import { useSearchParams } from 'next/navigation';

import { useEnumUrlParam, useSetQueryParam } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

import { seasonSchema, type SeasonKey, type SeasonValue } from './schema';

export function useSeasonKey(initialKey?: SeasonKey): SeasonKey {
  const sluggedKeys = seasonSchema.getAllSlugs();
  const defaultSluggedKey = seasonSchema.getSlug(
    initialKey ?? seasonSchema.defaultKey
  );
  const [sluggedKey] = useEnumUrlParam(
    QueryParamEnum.Season,
    defaultSluggedKey,
    { enums: sluggedKeys, part: 'query' }
  );
  return seasonSchema.getKeyBySlug(sluggedKey);
}

export function useSeasonValue(): SeasonValue {
  const seasonKey = useSeasonKey();
  return seasonSchema.getValue(seasonKey);
}

export function useSetSeasonKey() {
  const setSeasonKey = useSetQueryParam(
    useSearchParams(),
    QueryParamEnum.Season
  );
  return function (seasonKey: SeasonKey) {
    const sluggedKey = seasonSchema.getSlug(seasonKey);
    return setSeasonKey(sluggedKey);
  };
}
