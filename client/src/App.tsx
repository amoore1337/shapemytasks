import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import {
  Redirect, Route, Router, Switch,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import materialTheme from './materialTheme';
import apolloClient from './apolloClient';
import routes, { history } from './routes';
import TopNav from './components/Nav';
import Login from './components/Login';
import Home from './components/Home';
import PrivateRoute from './PrivateRoute';
import { CurrentUserProvider } from './CurrentUserContext';
import Dashboard from './components/views/dashboard/Dashboard';
import Projects from './components/views/projects/Projects';
import Project from './components/views/project/Project';

function App() {
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

      <div className="bg-gray-50 flex-grow">
        {appRoutes}
      </div>
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
