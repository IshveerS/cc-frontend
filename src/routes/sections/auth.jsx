/* eslint-disable jsx-a11y/aria-role */
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/auth/guard';
import CompactLayout from 'src/layouts/compact';
import AuthModernLayout from 'src/layouts/auth/creator';
import AuthClassicLayout from 'src/layouts/auth/classic';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
// const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));
const AdminForm = lazy(() => import('src/pages/auth/jwt/adminForm'));
// ----------------------------------------------------------------------

// CLASSIC
const CreatorLogin = lazy(() => import('src/pages/auth-demo/modern/login'));
const CreatorRegister = lazy(() => import('src/pages/auth-demo/modern/register'));
const ForgotPasswordClassicPage = lazy(() => import('src/pages/auth-demo/classic/forgot-password'));
const VerifyClassicPage = lazy(() => import('src/pages/auth-demo/classic/verify'));
const NewPasswordClassicPage = lazy(() => import('src/pages/auth-demo/classic/new-password'));

const NewLoginPage = lazy(() => import('src/pages/auth-demo/new-login'));
const NewRegisterPage = lazy(() => import('src/pages/auth-demo/new-register'));

const authAdmin = {
  path: 'jwt',
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: 'admin',
      element: (
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <AuthClassicLayout>
                <JwtLoginPage />
              </AuthClassicLayout>
            </GuestGuard>
          ),
        },
        {
          element: (
            <CompactLayout>
              <Outlet />
            </CompactLayout>
          ),
          children: [
            { path: 'forgot-password', element: <ForgotPasswordClassicPage /> },
            { path: 'new-password', element: <NewPasswordClassicPage /> },
            { path: 'verify', element: <VerifyClassicPage /> },
          ],
        },
      ],
    },
  ],
};

const authCreator = {
  path: 'jwt',
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: 'login',
      element: (
        <GuestGuard>
          <AuthModernLayout>
            <NewLoginPage />
            {/* <CreatorLogin /> */}
          </AuthModernLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'register',
      element: (
        <GuestGuard>
          <AuthModernLayout title="Cult Creative">
            <NewRegisterPage />
            {/* <CreatorRegister /> */}
          </AuthModernLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'adminForm',
      element: (
        <GuestGuard>
          <AuthModernLayout title="admin Form">
            <AdminForm />
          </AuthModernLayout>
        </GuestGuard>
      ),
    },
    {
      element: (
        <CompactLayout>
          <Outlet />
        </CompactLayout>
      ),
      children: [
        { path: 'forgot-password', element: <ForgotPasswordClassicPage /> },
        { path: 'new-password', element: <NewPasswordClassicPage /> },
      ],
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authAdmin, authCreator],
  },
];
