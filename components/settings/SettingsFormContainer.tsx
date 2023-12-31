import { useCallback } from 'react';

import { useLocaleDictionary } from '@/lib/i18n';
import { type SchemaName } from '@/lib/model';
import { useNavigate, useSetQueryParams, type TypedRoute } from '@/lib/router';
import { toLowerCase } from '@/lib/utils';

import { useSettingsFormDefaultValues, useSettingsModeContext } from './hooks';
import SettingsForm, { type SettingsFormValues } from './SettingsForm';

interface SettingsFormContainerProps {
  devTool: boolean;
}

function SettingsFormContainer({ devTool }: SettingsFormContainerProps) {
  const { locale } = useLocaleDictionary();

  const navigate = useNavigate();

  const setQueryParams = useSetQueryParams();

  const defaultMode = useSettingsModeContext();

  const defaultValues = useSettingsFormDefaultValues(defaultMode);

  const handleSubmit = useCallback(
    (values: SettingsFormValues) => {
      if (values.mode === 'preset') {
        return navigate(
          `/${locale}/${toLowerCase(values.collectionKey)}` as TypedRoute,
          { method: 'push' }
        );
      }

      const map = new Map<SchemaName, string>()
        .set('location', values.locationKey)
        .set('collection', values.collectionKey)
        .set('dataName', values.dataNameKey)
        .set('year', values.yearKey)
        .set('season', values.seasonKey)
        .set('month', values.monthKey);

      map.forEach((value, key) => {
        map.set(key, toLowerCase(value.toString()));
      });

      const search = setQueryParams(map, { stringify: true });

      navigate(`/${locale}/search${search}` as TypedRoute, { method: 'push' });
    },
    [locale, setQueryParams, navigate]
  );

  return (
    <SettingsForm
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      devTool={devTool}
    />
  );
}

export default SettingsFormContainer;
