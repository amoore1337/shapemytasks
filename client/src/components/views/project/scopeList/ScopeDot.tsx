import React, { HTMLAttributes } from 'react';

import tw, { styled } from 'twin.macro';

const StyledDot = styled.div`
  ${tw`rounded-full`}
  width: 20px;
  height: 20px;
`;

type Props = {
  color: string;
} & HTMLAttributes<HTMLDivElement>;

export default function ScopeDot({ color, style, ...props }: Props) {
  return (
    <StyledDot {...props} style={{ ...style, backgroundColor: color }} />
  );
}
