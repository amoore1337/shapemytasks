import { Button, Paper, Typography } from '@material-ui/core';
import React from 'react';
import tw, { styled } from 'twin.macro';
import { ReactComponent as GoogleIcon } from './icons/google.svg';

const LoginContainer = styled(Paper)(() => [
  tw`p-8 flex flex-col`,
  `
    width: 40%;
    min-width: 450px;
    height: 60%;
    min-height: 500px;
  `,
]);

export default function Login() {
  return (
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
  );
}
