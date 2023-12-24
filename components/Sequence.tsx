'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

import {
  CollectionUtils,
  DataNameUtils,
  DayUtils,
  LocaleSchema,
  Model,
  MonthUtils,
  WeekdayUtils,
  WeekUtils,
  YearUtils,
} from '@/lib/model';
import { Skeleton } from '@/components/ui/skeleton';
import { type DisplayKey } from '@/components/display';
import Grid from '@/components/Grid';
import { type SceneData } from '@/components/Scene';

const Scene = dynamic(() => import('@/components/Scene'), {
  loading: () => <Skeleton className="h-full w-full" />,
});

interface SequenceProps {
  id: string;
  scenes: SceneData[];
  displayKey: DisplayKey;
}

function Sequence({ id, scenes, displayKey }: SequenceProps) {
  const ref = useRef<HTMLUListElement>(null);

  const values = scenes.map((scene) => scene.value ?? 0);

  useEffect(() => {
    window?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [scenes]);

  return (
    <Grid
      id={id}
      ref={ref}
      className="h-full"
      items={scenes}
      itemKey={(scene) => SceneUtils.getSceneId(id, scene.id)}
      renderItem={(scene, index) => (
        <Scene
          id={SceneUtils.getSceneId(id, scene.id)}
          data={scene}
          index={index}
          length={SceneUtils.getSceneLength(Math.max(...values))}
          displayKey={displayKey}
          onClick={() => {}}
        />
      )}
    />
  );
}

export class SceneUtils {
  static getSceneId(listId: string | number, itemId: string | number) {
    return [listId, itemId].join(',');
  }
  static getSceneLength(value: number) {
    return value.toString(2).length;
  }
  static toDailyScenes(
    dataset: Model.DailyData[],
    dataNameKey: DataNameUtils.Key,
    collectionKey: CollectionUtils.Key,
    locale = LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, month, day, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: DataNameUtils.schema.display(dataNameKey),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: CollectionUtils.schema.display(collectionKey),
      dates: [
        DayUtils.schema.display(DayUtils.schema.getKeyByValue(day), locale),
        MonthUtils.schema.display(
          MonthUtils.schema.getKeyByValue(month),
          'short',
          locale
        ),
      ],
      location: LocaleSchema.isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
  static toWeekDailyScenes(
    dataset: Model.WeekDailyData[],
    dataNameKey: DataNameUtils.Key,
    collectionKey: CollectionUtils.Key,
    locale = LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, month, weekday, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: DataNameUtils.schema.display(dataNameKey),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: CollectionUtils.schema.display(collectionKey),
      dates: [
        WeekdayUtils.schema.display(
          WeekdayUtils.schema.getKeyByValue(weekday),
          'long',
          locale
        ),
        MonthUtils.schema.display(
          MonthUtils.schema.getKeyByValue(month),
          'short',
          locale
        ),
      ],
      location: LocaleSchema.isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
  static toWeeklyScenes(
    dataset: Model.WeeklyData[],
    dataNameKey: DataNameUtils.Key,
    collectionKey: CollectionUtils.Key,
    locale = LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, year, week, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: DataNameUtils.schema.display(dataNameKey),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: CollectionUtils.schema.display(collectionKey),
      dates: [
        WeekUtils.schema.display(WeekUtils.schema.getKeyByValue(week), locale),
        YearUtils.schema.display(
          YearUtils.schema.getKeyByValue(year),
          'short',
          locale
        ),
      ],
      location: LocaleSchema.isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
  static toMonthlyScenes(
    dataset: Model.MonthlyData[],
    dataNameKey: DataNameUtils.Key,
    collectionKey: CollectionUtils.Key,
    locale = LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, year, month, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: DataNameUtils.schema.display(dataNameKey),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: CollectionUtils.schema.display(collectionKey),
      dates: [
        MonthUtils.schema.display(
          MonthUtils.schema.getKeyByValue(month),
          'long',
          locale
        ),
        YearUtils.schema.display(
          YearUtils.schema.getKeyByValue(year),
          'short',
          locale
        ),
      ],
      location: LocaleSchema.isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
  static toYearlyScenes(
    dataset: Model.YearlyData[],
    dataNameKey: DataNameUtils.Key,
    collectionKey: CollectionUtils.Key,
    locale = LocaleSchema.defaultLocale
  ): SceneData[] {
    return dataset.map(({ id, year, pm_large, pm_small }) => ({
      id,
      name: dataNameKey,
      displayName: DataNameUtils.schema.display(dataNameKey),
      value:
        dataNameKey === 'PM_LARGE'
          ? pm_large
          : dataNameKey === 'PM_SMALL'
          ? pm_small
          : null,
      collection: CollectionUtils.schema.display(collectionKey),
      dates: [
        YearUtils.schema.display(
          YearUtils.schema.getKeyByValue(year),
          'short',
          locale
        ),
      ],
      location: LocaleSchema.isKorean(locale) ? '서울시' : 'Seoul',
      rank: null,
    }));
  }
}

export default Sequence;
