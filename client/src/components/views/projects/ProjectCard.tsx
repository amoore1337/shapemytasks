import { Button } from '@material-ui/core';
import tw, { styled } from 'twin.macro';

export default styled(Button)`
  ${tw`bg-white p-2 shadow normal-case`}
  width: 265px;
  height: 200px;

  &:hover {
    ${tw`bg-blue-100`}
  }
`;
