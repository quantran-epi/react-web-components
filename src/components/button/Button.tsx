import React from 'react';
import { IButtonProps } from './Button.types';
import styled from 'styled-components';
import { useTheme } from '@theme/provider';

const StyledButton = styled.button<IButtonProps>`
    background-color: ${props => props.color};
    @media (max-width: 480px) {
        color: white;
    }
`
export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(({
    children,
}, ref) => {
    const { theme } = useTheme();

    return <StyledButton ref={ref}>
        {children}
    </StyledButton>
})


