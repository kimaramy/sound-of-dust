import { Model, supabaseClient } from '@/lib/model';

export const fetchDailyDataset = async (month: number) => {
  const response = await supabaseClient
    .from('daily')
    .select('*')
    .eq('month', month)
    .returns<Model.DailyData[]>();

  if (response.error) throw response.error;

  return response.data;
};

export const fetchDailyData = async (dataId: number) => {
  const response = await supabaseClient
    .from('daily')
    .select('*')
    .eq('id', dataId)
    .returns<Model.DailyData>();

  if (response.error) throw response.error;

  return response.data;
};
