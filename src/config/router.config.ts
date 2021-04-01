export const BaseRouter = [
    {
        path: '/',
        component: () => import( 'components/header/index.vue'),
        children: [
            {
                path: 'staking',
                name: "staking",
                component: () => import( "pages/staking/index.vue")
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
        redirect: '/login'
    },
];

