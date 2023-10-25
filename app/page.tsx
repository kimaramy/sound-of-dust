'use client';

import { useRef } from 'react';
import {
  useDailyDataListQuery,
  useMonthlyDataListQuery,
  useMonthlyDataListQueryBySeaon,
  useWeekDailyDataListQuery,
  useWeeklyDataListQuery,
  useYearlyDataListQuery,
} from '@/domains';

import { useCollectionValue } from '@/components/collection';
import { useDisplayValue } from '@/components/display';
import Minimap from '@/components/MiniMap';
import { useMonthValue } from '@/components/month';
import { useSeasonValue } from '@/components/season';
import Sequence, {
  toDailySceneDataList,
  toMonthlySceneDataList,
  toWeekDailySceneDataList,
  toWeeklySceneDataList,
  toYearlySceneDataList,
} from '@/components/Sequence';
import { useYearValue } from '@/components/year';

export default function IndexPage() {
  // const mainRef = useRef(null);

  const display = useDisplayValue();

  const collection = useCollectionValue();

  const year = useYearValue();

  const season = useSeasonValue();

  const month = useMonthValue();

  const dailySceneDataList = useDailyDataListQuery(month, {
    enabled: collection === 'Daily',
    select: (dataset) => toDailySceneDataList(dataset, collection),
  });

  const weekDailySceneDataList = useWeekDailyDataListQuery(month, {
    enabled: collection === 'Weekdaily',
    select: (dataset) => toWeekDailySceneDataList(dataset, collection),
  });

  const weeklySceneDataList = useWeeklyDataListQuery(year, {
    enabled: collection === 'Weekly',
    select: (dataset) => toWeeklySceneDataList(dataset, collection),
  });

  const monthlySceneDataList = useMonthlyDataListQuery(year, {
    enabled: collection === 'Monthly',
    select: (dataset) => toMonthlySceneDataList(dataset, collection),
  });

  const seasonalSceneDataList = useMonthlyDataListQueryBySeaon(year, season, {
    enabled: collection === 'Seasonally',
    select: (dataset) => toMonthlySceneDataList(dataset, collection),
  });

  const yearlySceneDataList = useYearlyDataListQuery({
    enabled: collection === 'Yearly',
    select: (dataset) => toYearlySceneDataList(dataset, collection),
  });

  const dataset = (function () {
    switch (collection) {
      case 'Yearly':
        return yearlySceneDataList;
      case 'Seasonally':
        return seasonalSceneDataList;
      case 'Monthly':
        return monthlySceneDataList;
      case 'Weekly':
        return weeklySceneDataList;
      case 'Weekdaily':
        return weekDailySceneDataList;
      case 'Daily':
      default:
        return dailySceneDataList;
    }
  })();

  return (
    <>
      <Minimap />
      <main className="relative h-main">
        <Sequence
          id="container"
          collection={collection}
          display={display}
          dataset={dataset}
        />
      </main>
    </>
  );
}
