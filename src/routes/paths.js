// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
      forgetPassword: `${ROOTS.AUTH}/jwt/forgot-password`,
    },
    verify: `${ROOTS.AUTH}/verify`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    admins: `${ROOTS.DASHBOARD}/admins`,
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
    },
    creator: {
      root: `${ROOTS.DASHBOARD}/creator`,
      mediaKit: `${ROOTS.DASHBOARD}/mediakit`,
    },
    landing: {
      creator: `${ROOTS.DASHBOARD}/landing/creator`,
      brand: `${ROOTS.DASHBOARD}/landing/brand`,
    },
  },
};
