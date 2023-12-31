'use client';

import { Toaster } from 'react-hot-toast';

import { Icon } from '@/components/ui/icon';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName="rounded"
      // containerStyle={{}}
      toastOptions={{
        // Define default options
        duration: 5000,
        className: 'bg-white text-gray-700',
        // Default options for specific status
        success: {
          icon: <Icon.CheckCircle className="h-5 w-5 text-green-700" />,
        },
        error: {
          icon: <Icon.AlertCircle className="h-5 w-5 text-red-700" />,
        },
      }}
    />
  );
}
