import React from 'react';

import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material';
import useDimensions from 'react-cool-dimensions';
import { Helmet } from 'react-helmet';
import { Navigate, Route, Routes } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { CurrentUserProvider } from './CurrentUserContext';
import apolloClient from './apolloClient';
import PrivateRoute from './components/PrivateRoute';
import Nav from './components/nav/Nav';
import Login from './components/views/Login';
import PrivacyPolicy from './components/views/PrivacyPolicy';
import Dashboard from './components/views/dashboard/Dashboard';
import Home from './components/views/home/Home';
import ProjectContainer from './components/views/project/ProjectContainer';
import Projects from './components/views/projects/Projects';
import materialTheme from './materialTheme';
import routes from './routes';
import useHeartbeat from './useHeartbeat';

const ContentContainer = styled.div`
  ${tw`flex-grow overflow-hidden`}
  flex-basis: 1px;
`;

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Helmet>
        <meta name="og:type" content="object" />
        <meta name="og:site_name" content="Shape My Tasks" />
        <meta name="og:url" content="https://shapemytasks.com/" />
        <meta name="og:image" content="https://shapemytasks.com/logo.png" />
      </Helmet>
      <ThemeProvider theme={materialTheme}>
        <CurrentUserProvider>
          <AppContent />
        </CurrentUserProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

const appRoutes = (
  <Routes>
    <Route path={routes.login} element={<Login />} />
    <Route path={routes.home} element={<Home />} />
    <Route path={routes.privacy} element={<PrivacyPolicy />} />
    <Route path="/" element={<PrivateRoute />}>
      <Route path={routes.dashboard} element={<Dashboard />} />
      <Route path={routes.project} element={<ProjectContainer />} />
      <Route path={routes.projects} element={<Projects />} />
    </Route>
    <Route path="*" element={<Navigate to={routes.home} replace />} />
  </Routes>
);

function AppContent() {
  useHeartbeat();
  const { observe, width, height } = useDimensions<HTMLDivElement>();

  return (
    <div className="flex flex-col min-h-full">
      <Nav />
      <ContentContainer ref={observe}>
        <div className="bg-gray-50 overflow-auto" style={{ width, height }}>
          {appRoutes}
        </div>
      </ContentContainer>
    </div>
  );
}

export default App;
