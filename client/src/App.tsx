import { ThemeProvider } from '@material-ui/core';
import React from 'react';
// import tw, { styled } from 'twin.macro';
import TopNav from './TopNav';
import materialTheme from './materialTheme';

// const NavContainer = styled.div(() => [
//   tw`flex-freeze w-full`,
// ]);

function App() {
  const appContent = (
    <div className="h-full w-full flex flex-col">
      <div className="flex-freeze w-full">
        <TopNav />
      </div>

      <div className="flex-grow overflow-auto bg-secondary" />
    </div>
  );
  return (
    <ThemeProvider theme={materialTheme}>
      {appContent}
    </ThemeProvider>
  );
}

export default App;
