export const appRoutes = [
    {
        name: 'Home',
        exact: true,
        path: '/',
        title: 'Home'
    },
    {
        name: 'posts',
        exact: true,
        path: '/posts',
        title: 'Posts'
    },
    {
        name: 'post',
        exact: false,
        path: '/post/:id',
        title: 'Post'
    }
]