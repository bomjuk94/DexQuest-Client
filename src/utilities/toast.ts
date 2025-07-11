import { toast } from 'react-toastify';
import { type ReactNode } from 'react';

export const showToast = (type: 'success' | 'error', message: string | ReactNode) => {
    toast[type](message);
};
