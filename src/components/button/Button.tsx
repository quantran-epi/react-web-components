import React from 'react';
import styled from 'styled-components';
import { useButtonStyle } from './Button.style';
import { IButtonProps, IStyledButtonProps } from './Button.types';

const StyledButton = styled.button<IStyledButtonProps>`
    ${props => props.css}
`
export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(({
    children,
    ...props
}, ref) => {
    const { css } = useButtonStyle(props);

    return <StyledButton ref={ref} css={css}>
        {children}
    </StyledButton>
})


