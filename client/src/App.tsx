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
import Dashboard from './components/views/dashboard/Dashboard';
import Home from './components/views/home/Home';
import ProjectContainer from './components/views/project/ProjectContainer';
import Projects from './components/views/projects/Projects';
import materialTheme from './materialTheme';
import routes, { history } from './routes';

const ContentContainer = styled.div`
  ${tw`flex-grow overflow-hidden`}
  flex-basis: 1px;
`;

function App() {
  const { observe, width, height } = useDimensions<HTMLDivElement>();
  const appRoutes = (
    <Switch>
      <Route path={routes.login} component={Login} />
      <Route path={routes.home} component={Home} />
      <PrivateRoute path={routes.dashboard} component={Dashboard} />
      <PrivateRoute path={routes.project} component={ProjectContainer} />
      <PrivateRoute path={routes.projects} component={Projects} />
      <Redirect to={routes.home} />
    </Switch>
  );

  const appContent = (
    <div className="flex flex-col min-h-full">
      <Nav />

      <ContentContainer ref={observe}>
        <div className="bg-gray-50 overflow-auto" style={{ width, height }}>
          {appRoutes}
        </div>
      </ContentContainer>
    </div>
  );

  return (
    <ApolloProvider client={apolloClient}>
      <Router history={history}>
        <ThemeProvider theme={materialTheme}>
          <CurrentUserProvider>
            {appContent}
          </CurrentUserProvider>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
