import useSafeQueryParam from './useSafeQueryParam';

function useBooleanQueryParam<
  TValue extends string = string,
  TKey extends string = string,
  TFallback extends TValue | undefined = undefined,
>(name: TKey, fallback?: TFallback) {
  return useSafeQueryParam<TValue, TKey, TFallback>(name, fallback, {
    strict: true,
    validator: (values) =>
      values.every((value) => value === 'true' || value === 'false'),
    errorMessage: (value) =>
      `Type of '${name}' must be a boolean-like string. But received ${JSON.stringify(
        value
      )}.`,
  });
}

export default useBooleanQueryParam;
