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
        path: '/test',
        component: () => import('../pages/test.vue')
    },
    {
        path: '*',
        redirect: '/main'
    },
];

