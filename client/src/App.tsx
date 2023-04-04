import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material';
import { lazy, Suspense } from 'react';
import useDimensions from 'react-cool-dimensions';
import { Helmet } from 'react-helmet';
import { Navigate, Route, Routes } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import apolloClient from './apolloClient';
import LoadingIndicator from './components/LoadingIndicator';
import Nav from './components/nav/Nav';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/views/Login';
import { CurrentUserProvider } from './CurrentUserContext';
import materialTheme from './materialTheme';
import routes from './routes';
import useHeartbeat from './useHeartbeat';

const HomePage = lazy(() => import('./components/views/home'));
const PrivacyPolicyPage = lazy(() => import('./components/views/PrivacyPolicy'));
const DashboardPage = lazy(() => import('./components/views/dashboard'));
const ProjectsPage = lazy(() => import('./components/views/projects'));
const ProjectPage = lazy(() => import('./components/views/project'));

const ContentContainer = styled.div`
  ${tw`grow overflow-hidden`}
  flex-basis: 1px;
`;

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Helmet>
        <title>Shape My Tasks</title>
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
    <Route
      path={routes.home}
      element={
        <Suspense fallback={<LoadingIndicator />}>
          <HomePage />
        </Suspense>
      }
    />
    <Route
      path={routes.privacy}
      element={
        <Suspense fallback={<LoadingIndicator />}>
          <PrivacyPolicyPage />
        </Suspense>
      }
    />
    <Route path="/" element={<PrivateRoute />}>
      <Route
        path={routes.dashboard}
        element={
          <Suspense fallback={<LoadingIndicator />}>
            <DashboardPage />
          </Suspense>
        }
      />
      <Route
        path={routes.project}
        element={
          <Suspense fallback={<LoadingIndicator />}>
            <ProjectPage />
          </Suspense>
        }
      />
      <Route
        path={routes.projects}
        element={
          <Suspense fallback={<LoadingIndicator />}>
            <ProjectsPage />
          </Suspense>
        }
      />
      <Route path="/" element={<Navigate to={routes.projects} replace />} />
    </Route>
    <Route path="*" element={<Navigate to={routes.home} replace />} />
  </Routes>
);

function AppContent() {
  useHeartbeat();
  const { observe, width, height } = useDimensions<HTMLDivElement>();

  return (
    <div className="flex min-h-full flex-col">
      <Nav />
      <ContentContainer ref={observe}>
        <div className="overflow-auto bg-gray-50" style={{ width, height }}>
          {appRoutes}
        </div>
      </ContentContainer>
    </div>
  );
}

export default App;
