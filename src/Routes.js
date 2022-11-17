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
    path: '/detail',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/posts/detail'))
  },
  {
    path: '/all',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/posts/all'))
  },
  {
    path: '/posts',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/posts/posts'))
  },
  {
    path: '/pictures',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/posts/pictures'))
  },
  {
    path: '/videos',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/posts/videos'))
  },
  {
    path: '/audios',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/posts/audios'))
  },
  {
    path: '/live-streams',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/posts/liveStreams'))
  },
  {
    path: '/gifts',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/gifts'))
  },
  {
    path: '/policy',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/policy'))
  },
  {
    path: '/monetization',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/monetization'))
  },
  {
    path: '/monetization/tick',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/monetization/tick'))
  },
  {
    path: '/guide',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/guide'))
  },
  {
    path: '/setting',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/setting'))
  },
  {
    path: '/livestream-setting',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/livestream-setting'))
  },
  {
    path: '/follows',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/follows'))
  },
  {
    path: '/support',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/support'))
  },
  {
    path: '/payment',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/payment'))
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
