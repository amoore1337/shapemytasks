import { createBrowserHistory } from 'history';

export default {
  login: '/login',
  home: '/home',

  dashboard: '/dashboard',
  projects: '/projects',
  project: '/projects/:id',
};

export const withParams = (route: string, params: {[key: string]: string}) => {
  let populatedRoute = route;
  Object.keys(params).forEach((key) => {
    const regex = new RegExp(`:${key}([?/]|$)`);
    const matches = route.match(regex);
    if (matches) {
      const replacedVal = matches[0].replace(`:${key}`, params[key]);
      populatedRoute = populatedRoute.replace(matches[0], replacedVal);
    }
  });
  return populatedRoute;
};

export const history = createBrowserHistory();
