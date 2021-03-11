import React from 'react';
import tw, { styled } from 'twin.macro';

const StyledDot = styled.div`
  ${tw`rounded-full`}
  width: 20px;
  height: 20px;
`;

type Props = {
  color: string;
};

export default function ScopeDot({ color }: Props) {
  return (
    <StyledDot style={{ backgroundColor: color }} />
  );
}
