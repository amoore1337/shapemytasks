import React from 'react';

import tw, { styled } from 'twin.macro';

const StyledChip = styled.span`
  ${tw`rounded-xl italic bg-green-500 text-white font-light text-xs inline-block align-top px-2 py-1`}
`;

export default function NiceToHaveChip(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <StyledChip {...props}>
      Nice to have
    </StyledChip>
  );
}
