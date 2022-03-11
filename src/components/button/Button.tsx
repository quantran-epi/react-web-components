import React from 'react';
import { IButtonProps } from './Button.types';
import styled, { css } from 'styled-components';
import { useTheme } from '@theme/provider';

const StyledButton = styled.button<IButtonProps>`
    background-color: ${props => props.color};
`

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(({
    children,
}, ref) => {
    const { theme } = useTheme();
    console.log(theme);

    return <StyledButton ref={ref} color={theme.color.primary300}>
        {children}
    </StyledButton>
})


