import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';
import { AuthGuard, GuestGuard } from './components';
import SwitchLayout from './layouts/authLayout';

const routesConfig = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/screens/not-found/NotFound'))
  },
  {
    path: '/login',
    guard: GuestGuard,
    component: lazy(() => import('src/screens/login/Login'))
  },
  {
    path: '/register',
    guard: GuestGuard,
    component: lazy(() => import('src/screens/register/Register'))
  },
  {
    path: '/',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/home/Home'))
  },
  {
    path: '/profile',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/profile/Profile'))
  },
  {
    path: '/posts',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/posts/posts'))
  },
];

const renderRoutes = (routes) => (routes ? (
  <Suspense fallback={<LoadingScreen />}>
    <Routes>
      {routes.map((route, i) => {
        const Component = route.component;

        return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              element={<Component />}
            />
        );
      })}
    </Routes>
  </Suspense>
) : null);

function CustomRoutes() {
  return renderRoutes(routesConfig);
}

export default CustomRoutes;
