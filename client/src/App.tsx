import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import {
  Redirect, Route, Router, Switch,
} from 'react-router-dom';
import TopNav from './TopNav';
import materialTheme from './materialTheme';
import routes, { history } from './routes';
import Login from './Login';
import Home from './Home';

function App() {
  const appRoutes = (
    <Switch>
      <Route path={routes.login} component={Login} />
      <Route path={routes.home} component={Home} />
      <Redirect to={routes.home} />
    </Switch>
  );

  const appContent = (
    <div className="h-full w-full flex flex-col">
      <div className="flex-freeze w-full">
        <TopNav />
      </div>

      <div className="flex-grow overflow-auto bg-gray-50 flex flex-col items-center justify-center">
        {appRoutes}
      </div>
    </div>
  );
  return (
    <Router history={history}>
      <ThemeProvider theme={materialTheme}>
        {appContent}
      </ThemeProvider>
    </Router>
  );
}

export default App;
