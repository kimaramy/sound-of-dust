import { cn } from '@/lib/utils';

type MainProps = React.HTMLAttributes<HTMLDivElement>;

function Main({ children, className, ...rest }: MainProps) {
  return (
    <main
      className={cn('h-full scrollbar-hide 3xl:container', className)}
      {...rest}
    >
      {children}
    </main>
  );
}

export default Main;