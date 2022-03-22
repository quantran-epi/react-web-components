import { useTheme } from '@theme/provider';
import { useBreakpoint, useResponsiveValue } from '@theme/responsive/hooks';
import { merge } from 'lodash';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTypographyStyle } from './Typography.styles';
import { IStyledTypographyProps, ITypographyProps } from './Typography.types';

const StyledTypography = styled.div<IStyledTypographyProps>`
    ${props => props.componentCss}
`

export const Typography = React.forwardRef<HTMLElement, ITypographyProps>((props, ref) => {
    const { theme } = useTheme();
    const { screenSize } = useBreakpoint();
    const { getValueAt } = useResponsiveValue();
    const mergeProps = merge({}, theme.specs.components.typography.defaultProps, props);
    const { css: typographyStyle } = useTypographyStyle(mergeProps);

    const _tagName = useMemo<any>(() => {
        let variant = getValueAt(mergeProps.variant, screenSize);
        return theme.specs.components.typography.base.tagNameMapping[variant];
    }, [mergeProps])

    return <StyledTypography
        as={_tagName}
        componentCss={typographyStyle}>
        {mergeProps.children}
    </StyledTypography>
})