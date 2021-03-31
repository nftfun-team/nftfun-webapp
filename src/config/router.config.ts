export const BaseRouter = [
    {
        path: '/',
        component: () => import( "components/menu/index.vue"),
        children: [
            // {
            //     path: 'pair-weight',
            //     name: "pairWeight",
            //     component: () => import( "pages/pair-weight/index.vue")
            // },
        ],
        redirect: '/login',
    },
    {
        path: '/login',
        component: () => import( "pages/login/index.vue"),
    },
    {
        path: '*',
        redirect: '/login'
    },
]

