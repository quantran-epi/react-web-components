import React from 'react';
import { IButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(({
    children
}, ref) => {
    return <button ref={ref}>{children}</button>
})