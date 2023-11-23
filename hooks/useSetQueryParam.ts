'use client';

import { useCallback } from 'react';
import { ReadonlyURLSearchParams } from 'next/navigation';

/**
 * 단일 쿼리 파라미터의 값을 업데이트하기 위한 Setter 함수입니다.
 * 단, Getter 함수인 useQueryParam가 전역 라우터 인스턴스를 구독하고 있으므로 실제 Getter 값 업데이트를 위해서는 useNavigate를 통해 경로 혹은 쿼리 파라미터 변경이 발생해야합니다.
 *
 * @param readonlySearchParams 읽기 전용 URLSearchParams 인스턴스
 * @returns 단일 쿼리 파라미터 값을 삽입 혹은 업데이트하고 다시 읽기 전용 URLSearchParams 인스턴스를 반환하거나, 옵션에 따라 쿼리 문자열로 변환 후 반환하는 함수
 */
function useSetQueryParam<
  TValue extends string | number | boolean = string,
  TKey extends string = string,
>(oldReadonlySearchParams: ReadonlyURLSearchParams, name: TKey) {
  const setQueryParam = useCallback(
    <TFlag extends boolean = false>(
      value: TValue,
      options?: {
        stringify: TFlag;
      }
    ) => {
      const newSearchParams = new URLSearchParams(
        Array.from(oldReadonlySearchParams.entries())
      );
      newSearchParams.set(name, value.toString());
      const newReadonlySearchParams = new ReadonlyURLSearchParams(
        newSearchParams
      );
      const maybeStringified = options?.stringify
        ? newReadonlySearchParams.toString()
        : newReadonlySearchParams;
      return maybeStringified as TFlag extends true
        ? string
        : ReadonlyURLSearchParams;
    },
    [oldReadonlySearchParams, name]
  );

  return setQueryParam;
}

export default useSetQueryParam;
