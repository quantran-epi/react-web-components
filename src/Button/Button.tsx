import React from 'react';
import { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    children
}, ref) => {
    return <button ref={ref}>{children}</button>
})