import React from 'react';
import styled from 'styled-components';
import { useButtonStyle } from './Button.style';
import { IButtonProps, IStyledButtonProps } from './Button.types';

const StyledButton = styled.button<IStyledButtonProps>`
    ${props => props.css}
`
export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(({
    children,
    style,
    className,
    ...props
}, ref) => {
    const { css: _buttonStyle } = useButtonStyle(props);

    return <StyledButton
        ref={ref}
        css={_buttonStyle.concat(style.css)}
        className={className}
        style={style}>
        {children}
    </StyledButton>
})


