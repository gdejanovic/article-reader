import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRoutes } from "../../api/api.constants";
import { apiFetch } from "../../api/apiFetch";
import { Pagination } from "../../partials/pagination/pagination";
import { Post, Comment, User } from "../../interfaces/posts.interfaces";
import "./posts.styles.scss";
interface PostsPageProps {  message: string, componentName: string; }
interface FilteredDataInterface {
    postId: number;
    userId: number;
    postTitle: string;
    postBody: string;
    userName: string;
    comments: Comment[];
}[]
export const PostsPage = (props: PostsPageProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [appData, setAppData] = useState<FilteredDataInterface[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [filterUserName, setFilterUserName] = useState<string | null>(null);
    const navigate = useNavigate();
    
    const fetchPosts = async () => {
        try {
            const postData = await apiFetch(apiRoutes.postsUrl);
            setPosts(postData);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const fetchComments = async () => {
        try {
            const commentData = await apiFetch(apiRoutes.commentsUrl);
            setComments(commentData);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const userData = await apiFetch(apiRoutes.usersUrl);
            setUsers(userData);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchCombinedData = () => {
        const combinedData = posts.map((post) => {
            const user = users.find((u) => u.id === post.userId);
            const postComments = comments.filter((comment) => comment.postId === post.id);
            return {
                postId: post.id,
                userId: post.userId,
                postTitle: post.title,
                postBody: post.body,
                userName: user ? user.name : "Unknown",
                comments: postComments,
            };
        });

        const filteredData = filterUserName
            ? combinedData.filter((item) => item.userName.toLowerCase().includes(filterUserName.toLowerCase()))
            : combinedData;

        setAppData(filteredData);
    };

    const navigateToPostPage = (post: any) => {
        navigate(`/post/${post.postId}`, { state: { post } });
    };

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const userName = event.target.value;
        setFilterUserName(userName || null);
    };

    useEffect(() => {
        fetchPosts();
        fetchComments();
        fetchUsers();
    }, []);

    useEffect(() => {
        fetchCombinedData();
    }, [posts, users, comments, filterUserName]);

    const totalPages = Math.ceil(appData.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = appData.slice(indexOfFirstPost, indexOfLastPost);

    const postList = currentPosts.map((post) => (
        <div
            className="card"
            key={post.postId}
            onClick={() => navigateToPostPage(post)}
        >
            <div className="card-header">
                <h5 className="card-title">{post.postTitle}</h5>
                <p className="card-subtitle mb-2 text-muted">User: {post.userName}</p>
            </div>
            <div className="card-body">
                <p className="card-text">{post.postBody}</p>
            </div>
            <div className="card-footer">
                <p className="card-text">Comments:</p>
                <ul>
                    {post.comments.map((comment: Comment) => (
                        <li key={comment.id}>{comment.body} - {comment.email}</li>
                    ))}
                </ul>
            </div>
        </div>
    ));
    console.log(props.message + props.componentName);
    return (
        <div>
            <h1>Read latest posts</h1>
            <input
                type="text"
                className="search-box"
                placeholder="Filter by user name"
                value={filterUserName || ""}
                onChange={handleFilterChange}
            />
            {postList}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                maxPageNumbersToShow={5}
            />
        </div>
    );
};
