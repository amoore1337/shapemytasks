import React from 'react';

import { Color } from '@svgdotjs/svg.js';
import tw, { styled } from 'twin.macro';

const StyledDot = styled.div`
  ${tw`rounded-full box-content`}
  width: ${(props: any) => `${props.$size}px`};
  height: ${(props: any) => `${props.$size}px`};
  background-color: ${(props: any) => props.$color};
`;

type Props = {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Dot({
  size, color, className, style,
}: Props) {
  return <StyledDot className={className} style={style} $color={color || getRandomColor()} $size={size || 20} />;
}

function getRandomColor() {
  return (Color as any).random().toHex();
}
