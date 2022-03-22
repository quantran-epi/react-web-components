import { useTheme } from '@theme/provider';
import { useBreakpoint, useResponsiveValue } from '@theme/responsive/hooks';
import classNames from 'classnames';
import { merge } from 'lodash';
import React, { FunctionComponent, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { Ripple } from '../ripple';
import { ComponentClassNames } from '../base/constants';
import { useButtonStyle } from './Button.style';
import { IButtonProps, IStyledButtonProps } from './Button.types';

const StyledButton = styled.button<IStyledButtonProps>`
    ${props => props.componentCss}
`
export const Button: FunctionComponent<IButtonProps> = (props) => {
    const { theme } = useTheme();
    const { screenSize } = useBreakpoint();
    const { getValueAt } = useResponsiveValue();
    const mergeProps = merge({}, theme.specs.components.button.defaultProps, props);
    const {
        disabled = false,
        innerRef,
        ...otherProps
    } = mergeProps;
    const { css: _buttonCss } = useButtonStyle(mergeProps);
    const _buttonRef = useRef<HTMLButtonElement>(null);

    const _isRippleEnabled = useMemo<boolean>(() => {
        let buttonType = getValueAt(mergeProps.type, screenSize);
        if (mergeProps.ripple !== undefined) return mergeProps.ripple;
        return theme.specs.components.button.type[buttonType].ripple.enabled;
    }, [mergeProps])

    const _handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!otherProps.onClick) return;
        if (!(otherProps.onClick instanceof Function)) console.warn("onClick should be a function");
        otherProps.onClick(e);
    }, [otherProps])

    const _rippleColor = (): string => {
        if (!_isRippleEnabled) return "";
        if (mergeProps.rippleColor) return theme.functions.color.resolve(mergeProps.rippleColor);
        let buttonType = getValueAt(otherProps.type, screenSize);
        return theme.specs.components.button.type[buttonType].ripple.color;
    }
    return <StyledButton
        ref={_buttonRef}
        componentCss={_buttonCss}
        className={classNames(ComponentClassNames.button, otherProps.className)}
        onClick={_handleClick}
        {...otherProps.native}>
        {otherProps.children}
        {_isRippleEnabled && <Ripple color={_rippleColor()} />}
    </StyledButton>
}


