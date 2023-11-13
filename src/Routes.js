import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';
import { Auth, AuthGuard, GuestGuard } from './components';
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
    path: '/reset-password',
    guard: GuestGuard,
    component: lazy(() => import('src/screens/reset'))
  },
  {
    path: '/register',
    guard: GuestGuard,
    component: lazy(() => import('src/screens/register/Register'))
  },
  {
    path: '/email-verify',
    guard: GuestGuard,
    component: lazy(() => import('src/screens/register/EmailVerify'))
  },
  {
    path: '/',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/home/Home'))
  },
  {
    path: '/message',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/message'))
  },
  {
    path: '/profile',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/profile/Profile'))
  },
  {
    path: '/activate-official',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/activate-official/ActivateOfficial.jsx'))
  },
  {
    path: '/profile/:userId',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/profile/Profile'))
  },
  {
    path: '/detail',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/posts/detail'))
  },
  {
    path: '/:userid/all',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/posts/all'))
  },
  {
    path: '/:userid/posts',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/posts/posts'))
  },
  {
    path: '/:userid/pictures',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/posts/pictures'))
  },
  {
    path: '/:userid/videos',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/posts/videos'))
  },
  {
    path: '/:userid/audios',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/posts/audios'))
  },
  {
    path: '/:userid/live-streams',
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
    path: '/monetization/withdraw',
    guard: AuthGuard,
    component: lazy(() => import('src/screens/monetization/withdraw'))
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
    path: '/profile/:userid/follows',
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

export const GuardedComponent = ({ route }) => {
  const Component = route.component;
  const Guard = route.guard;
  return (
    <Guard><Component /></Guard>
  );
};

const renderRoutes = (routes) => (routes ? (
  <Suspense fallback={<LoadingScreen />}>
    <Auth>
      <Routes>
        {routes.map((route, i) => {
          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              element={<GuardedComponent route={route} />}
            />
          );
        })}
      </Routes>
    </Auth>
  </Suspense>
) : null);

function CustomRoutes() {
  return renderRoutes(routesConfig);
}

export default CustomRoutes;
