import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IRippleCircleStyledProps, IRippleProps } from './Ripple.types';

const rippleScale = keyframes`
    to {
        transform: scale(2.5);
        opacity: 0;
    }
`

const StyledRipple = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
`

const StyledRippleCircle = styled.span<IRippleCircleStyledProps>`
        display: ${props => props.show ? "block" : "none"};
        background-color: ${props => props.color};
        border-radius: 50%;
        position: absolute;
        transform: scale(0);
        animation ${rippleScale} 0.6s linear;
        left: ${props => props.left};
        top: ${props => props.top};
        width: ${props => props.size};
        height: ${props => props.size};
`

export const Ripple: FunctionComponent<IRippleProps> = ({
    color
}) => {
    const wrapper = useRef(null);
    const [_circle, _setCircle] = useState<{
        show: boolean;
        left: string;
        top: string;
        size: string;
    }>({
        size: "0px",
        left: "0px",
        top: "0px",
        show: false
    })

    useEffect(() => {
        if (!wrapper?.current) return;
        wrapper.current.addEventListener("click", _handleWrapperClick);
    }, [wrapper])

    const _handleWrapperClick = (e) => {
        let wrapperElement = wrapper.current;
        var d = Math.max(wrapperElement.clientWidth, wrapperElement.clientHeight);
        let wrapperElementPosition = wrapperElement.getBoundingClientRect();

        _setCircle({
            show: true,
            left: e.clientX - wrapperElementPosition.left - d / 2 + 'px',
            top: e.clientY - wrapperElementPosition.top - d / 2 + 'px',
            size: d + 'px'
        })

        setTimeout(() => {
            _setCircle(circle => ({
                ..._circle,
                show: false
            }))
        }, 400)
    }

    return <StyledRipple ref={wrapper}>
        <StyledRippleCircle
            show={_circle.show}
            color={color}
            left={_circle.left}
            top={_circle.top}
            size={_circle.size} />
    </StyledRipple>
}