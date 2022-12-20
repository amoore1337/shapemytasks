import { CSSProperties } from 'react';

import tw, { styled } from 'twin.macro';

import { getRandomColor } from '@/utils/color';

const StyledDot = styled.div`
  ${tw`box-content`}
  border-radius: 100%;
  width: ${(props: any) => `${props.$size}px`};
  height: ${(props: any) => `${props.$size}px`};
  background-color: ${(props: any) => props.$color};
`;

type Props = {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
};

export default function Dot({ size, color, className, style }: Props) {
  return (
    <StyledDot
      className={className}
      style={style}
      $color={color || getRandomColor()}
      $size={size || 20}
    />
  );
}
