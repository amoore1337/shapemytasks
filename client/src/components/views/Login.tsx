import React from 'react';

import { Button, Paper, Typography } from '@material-ui/core';
import tw, { styled } from 'twin.macro';

import { ReactComponent as GoogleIcon } from '@/icons/google.svg';

const LoginContainer = styled(Paper)(() => [
  tw`p-8 flex flex-col`,
  `
    width: 500px;
    height: 300px;
  `,
]);

export default function Login() {
  return (
    <div className="flex items-center justify-center absolute inset-0">
      <LoginContainer elevation={3}>
        <Typography className="w-full text-center" variant="h3" component="h2">Sign in</Typography>
        <div className="flex justify-center items-center flex-grow">
          <Button
            variant="outlined"
            startIcon={<GoogleIcon width={24} height={25} />}
            href="/api/auth/google"
          >
            Sign in with Google
          </Button>
        </div>
      </LoginContainer>
    </div>
  );
}
