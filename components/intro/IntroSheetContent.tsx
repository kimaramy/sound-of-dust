'use client';

import { useLocaleDictionary } from '@/lib/i18n';
import { Link } from '@/lib/router';
import { seoConfig } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetSubTitle,
  SheetTitle,
} from '@/components/ui/sheet';

function IntroSheetContent() {
  const {
    dictionary: { intro },
  } = useLocaleDictionary();

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{intro.content.title}</SheetTitle>
        <Separator />
        <div className="space-y-2 py-4">
          <SheetSubTitle>{intro.content.subtitle}</SheetSubTitle>
          <SheetDescription>{intro.content.description}</SheetDescription>
        </div>
        <div className="flex items-center justify-between">
          <ul className="divide flex h-auto items-center divide-x divide-border text-xs">
            {[intro.content.author, intro.content.year, intro.content.type].map(
              (word) => (
                <li
                  key={word}
                  className="px-2 first:pl-0 first:pr-2 last:pl-2 last:pr-0"
                >
                  {word}
                </li>
              )
            )}
          </ul>
          <div>
            <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
              <Link href={seoConfig.links.github} target="_blank">
                <Icon.Github aria-hidden className="h-4 w-4" />
                <span className="sr-only">Gitub</span>
              </Link>
            </Button>
          </div>
        </div>
      </SheetHeader>
    </SheetContent>
  );
}

export default IntroSheetContent;
