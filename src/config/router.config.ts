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
        redirect: '/main',
    },
    {
        path: '/main',
        component: () => import('../pages/main/index.vue')
    },
    {
        path: '/test-ws',
        component: () => import('../pages/testWs/TradingViewComponent.vue')
    },
    {
        path: '/test-kline',
        component: () => import('../pages/testWs/index.vue')
    },
    {
        path: '/kline',
        component: () => import('../pages/kline/index.vue')
    },
    {
        path: '/test',
        component: () => import('../pages/test.vue')
    },
    // {
    //     path: '*',
    //     redirect: '/main'
    // },
];

