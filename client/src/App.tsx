import React from 'react';

import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core';
import useDimensions from 'react-cool-dimensions';
import {
  Redirect, Route, Router, Switch,
} from 'react-router-dom';
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
import routes, { history } from './routes';
import useHeartbeat from './useHeartbeat';

const ContentContainer = styled.div`
  ${tw`flex-grow overflow-hidden`}
  flex-basis: 1px;
`;

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Router history={history}>
        <ThemeProvider theme={materialTheme}>
          <CurrentUserProvider>
            <AppContent />
          </CurrentUserProvider>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  );
}

function AppContent() {
  useHeartbeat();
  const { observe, width, height } = useDimensions<HTMLDivElement>();

  const appRoutes = (
    <Switch>
      <Route path={routes.login} component={Login} />
      <Route path={routes.home} component={Home} />
      <Route path={routes.privacy} component={PrivacyPolicy} />
      <PrivateRoute path={routes.dashboard} component={Dashboard} />
      <PrivateRoute path={routes.project} component={ProjectContainer} />
      <PrivateRoute path={routes.projects} component={Projects} />
      <Redirect to={routes.home} />
    </Switch>
  );

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
