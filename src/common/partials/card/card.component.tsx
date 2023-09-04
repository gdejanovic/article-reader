interface Comment {
    id: number;
    postId: number;
    body: string;
    email: string;
}

interface CardProps {
    singlePost?: boolean;
    postTitle: string;
    userName: string;
    postBody: string;
    comments: Comment[];
    onClick?: () => void;
}

export const Card = ({
    singlePost = false,
    postTitle,
    userName,
    postBody,
    comments,
}: CardProps) => {
    return (
        <div className={`card ${singlePost ? 'single-post' : ''}`}>
            <div className="card-header">
                <h5 className="card-title">{postTitle}</h5>
                <p className="card-subtitle text-muted">User: {userName}</p>
            </div>
            <div className="card-body">
                <p className="card-text">{postBody}</p>
            </div>
            <div>
                <p>Comments:</p>
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            {comment.body} - {comment.email}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
