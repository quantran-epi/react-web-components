import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { ComponentClassNames } from '../base/constants';
import { usePropResolution } from '../base/hooks';
import { useButtonStyle } from './Button.style';
import { IButtonProps, IStyledButtonProps } from './Button.types';

const StyledButton = styled.button<IStyledButtonProps>`
    ${props => props.componentCss}
`
export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(({
    children,
    className,
    size,
    shape,
    type,
    bgColor,

    htmlType,
    onClick,
    href,
    target,
    ...props
}, ref) => {
    const { getStyleProps, omitProps } = usePropResolution();
    const styleProps = getStyleProps(props);
    const nativeProps = omitProps(props, styleProps);
    const { css: _buttonCss } = useButtonStyle({
        size,
        shape,
        type,
        bgColor,
        ...styleProps
    });

    const _handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!onClick) return;
        if (!(onClick instanceof Function)) console.warn("onClick should be a function");
        onClick(e);
    }, [])

    return <StyledButton
        ref={ref}
        componentCss={_buttonCss}
        className={classNames(ComponentClassNames.button, className)}
        onClick={_handleClick}
        {...nativeProps}>
        {children}
    </StyledButton>
})


