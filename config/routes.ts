export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'food',
    icon: 'coffee',
    path: '/food',
    routes: [
      {
        name: 'company',
        path: '/food/company',
        component: './food/company',
      },
      {
        name: 'restaurant',
        path: '/food/restaurant',
        component: './food/restaurant',
      },
      {
        name: 'product',
        path: '/food/product',
        component: './food/product',
      },
    ],
  },
  {
    name: 'account',
    icon: 'user',
    path: '/account',
    component: './account/settings',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/food/company',
  },
  {
    component: './404',
  },
];
