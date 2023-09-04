import { useLocation } from "react-router-dom";
import { PostPageProps, PostsPageMessageProps} from "../interfaces/posts.interfaces";
import './posts.page/posts.styles.scss'

export const PostPage = (props: PostsPageMessageProps  ) => {
    console.log(props.message + props.componentName);
    const location = useLocation();
    if (!location.state) {
        return <div>Post not found</div>;
    }
    else {
        const post = location.state.post as PostPageProps["post"]; // taking from the path state post object if it was desired otherwise like fetching by id from api we would use the id from the path params and fetch the post from the api by id and then use it here
        const { postTitle, userName, postBody, comments } = post;
        return (
            <div className="card single-post">
                <div className="card-header">
                    <h5 className="card-title">{postTitle}</h5>
                    <p className="card-subtitle text-muted">User: {userName}</p>
                    <div className="card-body">
                        <p className="card-text">{postBody}</p>
                    </div>
                    <p>Comments:</p>
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment.id}>{comment.body} - {comment.email}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
};
