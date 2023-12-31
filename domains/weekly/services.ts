import { Model, supabaseClient } from '@/lib/model';

export const fetchWeeklyDataset = async (year: number) => {
  const response = await supabaseClient
    .from('weekly')
    .select('*')
    .eq('year', year)
    .returns<Model.WeeklyData[]>();

  if (response.error) throw response.error;

  return response.data;
};

export const fetchWeeklyData = async (dataId: number) => {
  const response = await supabaseClient
    .from('weekly')
    .select('*')
    .eq('id', dataId)
    .returns<Model.WeeklyData>();

  if (response.error) throw response.error;

  return response.data;
};
