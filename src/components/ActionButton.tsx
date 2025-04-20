'use client';

import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import { ComponentProps, ReactNode, useTransition } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { actionToast } from './ui/sonner';

type ActionButtonProps = Omit<ComponentProps<typeof Button>, 'onClick'> & {
  action: () => Promise<{ error: boolean; message: string }>;
  requireAreYouSure?: boolean;
};

function ActionButton({ action, requireAreYouSure = false, ...props }: ActionButtonProps) {
  const [isPending, startTransition] = useTransition();

  function performAction() {
    startTransition(async () => {
      const actionData = await action();
      actionToast({ actionData });
    });
  }

  if (requireAreYouSure) {
    return (
      <AlertDialog open={isPending ? true : undefined}>
        <AlertDialogTrigger asChild>
          <Button {...props} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isPending} onClick={performAction}>
              <LoadingTextSwap isLoading={isPending}>Yes</LoadingTextSwap>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Button
      {...props}
      disabled={isPending}
      onClick={performAction}
    >
      <LoadingTextSwap isLoading={isPending}>{props.children}</LoadingTextSwap>
    </Button>
  );
}
export default ActionButton;

function LoadingTextSwap({ isLoading, children }: { isLoading: boolean; children: ReactNode }) {
  return (
    <div className="grid items-center justify-items-center">
      <div
        className={cn('col-start-1 col-end-2 row-start-1 row-end2', isLoading ? 'invisible' : 'visible')}
      >
        {children}
      </div>
      <div
        className={cn('col-start-1 col-end-2 row-start-1 row-end-2 text-center', isLoading ? 'visible' : 'invisible')}
      >
        <Loader2Icon className="animate-spin" />
      </div>
    </div>
  );
}
