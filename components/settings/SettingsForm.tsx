'use client';

import { DevTool } from '@hookform/devtools';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  CollectionUtils,
  DataNameUtils,
  LocationUtils,
  MonthUtils,
  SeasonUtils,
  YearUtils,
} from '@/lib/model';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';

import CustomSettingsFields from './CustomSettingsFields';
import ModeField from './ModeField';
import PresetFields from './PresetFields';
import SettingsFormResetButton from './SettingsFormResetButton';

const SETTINGS_FORM_ID = 'settings-form';

type SettingsMode = 'preset' | 'custom';

interface SettingsFormValues {
  mode: SettingsMode;
  locationKey: LocationUtils.Key;
  dataNameKey: DataNameUtils.Key;
  collectionKey: CollectionUtils.Key;
  yearKey: YearUtils.Key;
  seasonKey: SeasonUtils.Key;
  monthKey: MonthUtils.Key;
}

type SettingsFormSubmitHandler = SubmitHandler<SettingsFormValues>;

interface SettingsFormProps {
  defaultValues: SettingsFormValues;
  onSubmit: SettingsFormSubmitHandler;
  devTool?: boolean;
}

function SettingsForm({
  defaultValues,
  onSubmit,
  devTool = false,
}: SettingsFormProps) {
  const settingsForm = useForm<SettingsFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldUseNativeValidation: false,
    defaultValues,
  });

  return (
    <>
      <Form {...settingsForm}>
        <form
          id={SETTINGS_FORM_ID}
          className="space-y-5 py-4"
          noValidate
          autoComplete="off"
          onSubmit={settingsForm.handleSubmit(onSubmit)}
        >
          <div className="flex justify-between gap-2">
            <ModeField />
            <SettingsFormResetButton />
          </div>
          <Separator />
          <PresetFields />
          <CustomSettingsFields />
        </form>
      </Form>

      {devTool && <DevTool control={settingsForm.control} />}
    </>
  );
}

export { SETTINGS_FORM_ID };

export type { SettingsMode, SettingsFormValues, SettingsFormSubmitHandler };

export default SettingsForm;
