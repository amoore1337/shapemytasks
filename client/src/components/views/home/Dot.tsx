import React from 'react';

import tw, { styled } from 'twin.macro';

import { getRandomColor } from '@/utils/color';

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
