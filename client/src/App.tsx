import React from 'react';

import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core';
import useDimensions from 'react-cool-dimensions';
import {
  Redirect, Route, Router, Switch,
} from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { CurrentUserProvider } from './CurrentUserContext';
import PrivateRoute from './PrivateRoute';
import apolloClient from './apolloClient';
import Login from './components/Login';
import TopNav from './components/Nav';
import Home from './components/home/Home';
import Dashboard from './components/views/dashboard/Dashboard';
import Project from './components/views/project/Project';
import Projects from './components/views/projects/Projects';
import materialTheme from './materialTheme';
import routes, { history } from './routes';

const ContentContainer = styled.div`
  ${tw`flex-grow overflow-hidden`}
  flex-basis: 1px;
`;

function App() {
  const { ref, width, height } = useDimensions<HTMLDivElement>();
  const appRoutes = (
    <Switch>
      <Route path={routes.login} component={Login} />
      <Route path={routes.home} component={Home} />
      <PrivateRoute path={routes.dashboard} component={Dashboard} />
      <PrivateRoute path={routes.project} component={Project} />
      <PrivateRoute path={routes.projects} component={Projects} />
      <Redirect to={routes.home} />
    </Switch>
  );

  const appContent = (
    <div className="flex flex-col min-h-full">
      <TopNav />

      <ContentContainer ref={ref}>
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
