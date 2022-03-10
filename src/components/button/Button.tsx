import React from 'react';
import { IButtonProps } from './Button.types';
import styled from 'styled-components';

const StyledButton = styled.button`
    color: red;
`

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(({
    children
}, ref) => {
    return <StyledButton>
        {children}abcd
    </StyledButton>
})