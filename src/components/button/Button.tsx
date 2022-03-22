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
        innerRef
    } = mergeProps;
    const { css: _buttonCss } = useButtonStyle(mergeProps);
    const _buttonRef = useRef<HTMLButtonElement>(null);

    const _isRippleEnabled = useMemo<boolean>(() => {
        if (mergeProps.disabled) return false;
        let buttonType = getValueAt(mergeProps.type, screenSize);
        if (mergeProps.ripple !== undefined) return mergeProps.ripple;
        return theme.specs.components.button.type[buttonType].ripple.enabled;
    }, [mergeProps])

    const _handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (mergeProps.disabled) return;
        if (!mergeProps.onClick) return;
        if (!(mergeProps.onClick instanceof Function)) console.warn("onClick should be a function");
        mergeProps.onClick(e);
    }, [mergeProps])

    const _rippleColor = (): string => {
        if (!_isRippleEnabled) return "";
        if (mergeProps.rippleColor) return theme.functions.color.resolve(mergeProps.rippleColor);
        let buttonType = getValueAt(mergeProps.type, screenSize);
        return theme.specs.components.button.type[buttonType].ripple.color;
    }
    return <StyledButton
        ref={_buttonRef}
        componentCss={_buttonCss}
        className={classNames(ComponentClassNames.button, mergeProps.className)}
        onClick={_handleClick}
        {...mergeProps.native}>
        {mergeProps.children}
        {_isRippleEnabled && <Ripple color={_rippleColor()} />}
    </StyledButton>
}


