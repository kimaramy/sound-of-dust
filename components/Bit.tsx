'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useUpdateEffect } from '@/hooks';
import { Power0, TimelineLite } from 'gsap';
import { random } from 'lodash-es';

import { cn } from '@/lib/utils';
import type { Display } from '@/components/display';

export type Binary = '0' | '1';

export interface BitProps {
  id: string;
  context: (string | number)[];
  binary: Binary;
  display: Display;
  isActive?: boolean;
  className?: string;
}

export default function Bit({
  id,
  context,
  binary,
  display,
  isActive = false,
  className,
}: BitProps) {
  // const activated = useRef(active);

  const $container = useRef<HTMLLIElement>(null);
  const $turbulence = useRef<SVGFETurbulenceElement | null>(null);

  const turbulenceValue = { val: 0.000001 };
  const turbulenceValueX = { val: 0.000001 };

  const timelineOne = useRef<TimelineLite | null>(null);
  const timelineTwo = useRef<TimelineLite | null>(null);

  const randomLength = useMemo(
    () =>
      binary === '0'
        ? display === '3d'
          ? random(55, 60)
          : random(30, 40)
        : display === '3d'
        ? random(95, 100)
        : random(80, 100),
    [binary, display]
  );

  const [isEntered, setEntered] = useState(false);

  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    const bitIndex = context[2] as number;

    const timeout = setTimeout(
      () => {
        setEntered(true);
      },
      (bitIndex + 1) * 200
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [context]);

  useEffect(() => {
    if (isEntered) {
      const filterId = display === '2d' ? '#sound-filter-y' : '#sound-filter-y';
      $turbulence.current = document.querySelectorAll(
        `${filterId} feTurbulence`
      )[0] as SVGFETurbulenceElement;
      timelineOne.current = new TimelineLite({
        paused: true,
        onUpdate: function () {
          $turbulence.current?.setAttribute(
            'baseFrequency',
            turbulenceValue.val + ' ' + turbulenceValueX.val
          );
        },
        onComplete: function () {
          timelineOne.current?.reverse();
        },
        onReverseComplete: function () {
          timelineOne.current?.restart();
        },
      });
      timelineOne.current.to(
        turbulenceValueX,
        0.4,
        { val: 0.04, ease: Power0.easeNone },
        0
      );
      timelineOne.current.to(
        turbulenceValue,
        0.1,
        { val: 0.2, ease: Power0.easeNone },
        0
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEntered, display]);

  function handlePlay() {
    if (isPlaying) {
      timelineOne.current?.pause();
      timelineTwo.current = new TimelineLite({
        onUpdate: function () {
          $turbulence.current?.setAttribute(
            'baseFrequency',
            turbulenceValue.val + ' ' + turbulenceValueX.val
          );
        },
      });
      timelineTwo.current.to(turbulenceValue, 0.1, { val: 0.000001 });
      timelineTwo.current.to(turbulenceValueX, 0.1, { val: 0.000001 }, 0);
      ($container.current as HTMLElement).style.filter = 'none';
      setPlaying(false);
    } else {
      timelineOne.current?.play();
      const filterId = display === '2d' ? '#sound-filter-y' : '#sound-filter-y';
      ($container.current as HTMLElement).style.filter = `url(${filterId})`;
      setPlaying(true);
    }
  }

  const handleContainerClick = () => {
    if (isActive) return;
    handlePlay();
  };

  useUpdateEffect(() => {
    handlePlay();
  }, [isActive]);

  return (
    <li
      id={id}
      ref={$container}
      className={cn('relative isolate flex h-full', className)}
      onClick={handleContainerClick}
    >
      {isEntered ? (
        <>
          <div
            className={cn(
              'sound-filter flex w-full duration-500 ease-out animate-in fade-in zoom-in slide-in-from-left',
              binary === '0'
                ? 'min-w-[60%] xl:min-w-[auto]'
                : 'min-w-full xl:min-w-[auto]',
              display === '3d' &&
                '!left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2'
            )}
            style={{
              width: `${randomLength}%`,
              height: display === '3d' ? `${randomLength}%` : undefined,
            }}
          >
            <div
              className={cn(
                'grainy-to-left-darken dark:grainy-to-left-darken--dark w-2/5 flex-initial bg-blend-soft-light dark:bg-blend-lighten',
                display !== '3d' && 'hidden'
              )}
            ></div>
            <div
              className={cn(
                'w-4 flex-none lg:w-6 2xl:w-8',
                'grainy-to-left dark:grainy-to-left--dark',
                display === '3d' && 'bg-blend-difference dark:hidden'
              )}
            ></div>
            <div
              className={cn(
                'w-full flex-1',
                'grainy-to-right dark:grainy-to-right--dark',
                display === '3d' && 'bg-blend-difference'
              )}
            ></div>
          </div>
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-body mix-blend-multiply dark:mix-blend-lighten"></div>
        </>
      ) : null}
    </li>
  );
}
