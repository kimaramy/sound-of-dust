'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Spinner from '@/components/Spinner';

const IntroSheetContent = dynamic(() => import('./IntroSheetContent'), {
  ssr: false,
  loading: () => <Spinner />,
});

interface IntroSheetTriggerButtonProps {
  className?: string;
}

function IntroSheetTriggerButton({ className }: IntroSheetTriggerButtonProps) {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div role="presentation">
            <Sheet
              open={isSheetOpen}
              onOpenChange={() => setSheetOpen((isSheetOpen) => !isSheetOpen)}
            >
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={className}>
                  <Icon.HelpCircle aria-hidden className="h-4 w-4" />
                  <span className="sr-only">About this project</span>
                </Button>
              </SheetTrigger>
              {isSheetOpen && <IntroSheetContent />}
            </Sheet>
          </div>
        </TooltipTrigger>
        <TooltipContent>프로젝트 설명</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default IntroSheetTriggerButton;
