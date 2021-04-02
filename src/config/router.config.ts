export const BaseRouter = [
    {
        path: '/',
        component: () => import( 'components/layout/index.vue'),
        children: [
            {
                path: 'staking',
                name: "staking",
                component: () => import( "pages/staking/index.vue")
            },
            {
                path: 'dashboard',
                name: "dashboard",
                component: () => import( "pages/dashboard/index.vue")
            },
        ],
        redirect: '/staking',
    },
    {
        path: '/main',
        component: () => import('../pages/main/index.vue')
    },
    {
        path: '/login',
        component: () => import( 'pages/login/index.vue'),
    },
    {
        path: '*',
        redirect: '/'
    },
];

