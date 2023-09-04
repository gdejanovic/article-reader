export interface Post {
    body: string;
    id: number;
    title: string;
    userId: number;
}

export interface Comment {
    body: string;
    id: number;
    postId: number;
    email: string;
}

export interface User {
    id: number;
    name: string;
}

export interface PostPageProps {
    post: {
        postId: number;
        userId: number;
        postTitle: string;
        postBody: string;
        userName: string;
        comments: Comment[];
    };
}
export interface PostsPageMessageProps {
    message: string;
    componentName: string;
}