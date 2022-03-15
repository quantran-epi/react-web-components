import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { useButtonStyle } from './Button.style';
import { IButtonProps, IStyledButtonProps } from './Button.types';
import { ComponentClassNames } from '../base/constants';

const StyledButton = styled.button<IStyledButtonProps>`
    ${props => props.componentCss}
`
export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(({
    children,
    className,
    ...props
}, ref) => {
    const { css: _buttonCss } = useButtonStyle(props);

    return <StyledButton
        ref={ref}
        componentCss={_buttonCss}
        className={classNames(ComponentClassNames.button, className)}>
        {children}
    </StyledButton>
})


