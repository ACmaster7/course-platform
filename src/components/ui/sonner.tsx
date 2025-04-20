'use client';

import { useTheme } from 'next-themes';
import { ExternalToast, toast, Toaster as Sonner, ToasterProps, ToastT } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={{
        '--normal-bg': 'var(--popover)',
        '--normal-text': 'var(--popover-foreground)',
        '--normal-border': 'var(--border)',
      } as React.CSSProperties}
      {...props}
    />
  );
};

function actionToast({ actionData, ...props }: Omit<ExternalToast, 'description'> & {
  actionData: { error: boolean; message: string };
}) {
  const toastFn = actionData.error ? toast.error : toast;
  const title = actionData.error ? 'Error' : 'Success';

  return toastFn(title, {
    description: actionData.message,
    ...props,
  });
}

export { actionToast, Toaster };
