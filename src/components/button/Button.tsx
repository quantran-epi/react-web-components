import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { ComponentClassNames } from '../base/constants';
import { useButtonStyle } from './Button.style';
import { IButtonProps, IStyledButtonProps } from './Button.types';

const StyledButton = styled.button<IStyledButtonProps>`
    ${props => props.componentCss}
`
export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
    const { css: _buttonCss } = useButtonStyle(props);

    const _handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!props.onClick) return;
        if (!(props.onClick instanceof Function)) console.warn("onClick should be a function");
        props.onClick(e);
    }, [])

    return <StyledButton
        ref={ref}
        componentCss={_buttonCss}
        className={classNames(ComponentClassNames.button, props.className)}
        onClick={_handleClick}
        {...props.native}>
        {props.children}
    </StyledButton>
})


