'use client';

import { useSearchParams } from 'next/navigation';

import { useEnumQueryParam, useSetQueryParam } from '@/lib/router';
import { QueryParamEnum } from '@/lib/utils';

import { monthSchema, type MonthKey } from './schema';

export function useMonthKey(initialKey?: MonthKey): MonthKey {
  const sluggedKeys = monthSchema.getAllSlugs();
  const defaultSluggedKey = monthSchema.getSlug(
    initialKey ?? monthSchema.defaultKey
  );
  const [sluggedKey] = useEnumQueryParam(
    QueryParamEnum.Month,
    sluggedKeys,
    defaultSluggedKey
  );
  return monthSchema.getKeyBySlug(sluggedKey);
}

export function useMonthValue() {
  const monthKey = useMonthKey();
  return monthSchema.getValue(monthKey);
}

export function useSetMonthKey() {
  const setMonthKey = useSetQueryParam(useSearchParams(), QueryParamEnum.Month);
  return function (monthKey: MonthKey) {
    const sluggedKey = monthSchema.getSlug(monthKey);
    return setMonthKey(sluggedKey);
  };
}
