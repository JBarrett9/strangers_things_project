import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost } from "../../../api/api-functions";
import "./Post.css";

const Post = (props) => {
  let { postId } = useParams();
  let post = props.posts.filter((post) => post._id === postId)[0];
  const navigate = useNavigate();

  if (!post) return <div>Post not found</div>;

  const handleDelete = () => {
    deletePost(postId, props.token, navigate);
  };

  return (
    <div className="post">
      <header className="post-head">
        <h2>{post.title}</h2>
        <span>
          {props.user.data && props.user.data._id === post.author._id ? (
            <>
              <Link to="/messages">
                <span className="material-symbols-outlined">mail</span>
              </Link>
              <Link to={`/update_post/${postId}`}>
                <span class="material-symbols-outlined">edit</span>
              </Link>
              <span
                className="material-symbols-outlined"
                onClick={handleDelete}
              >
                delete
              </span>
            </>
          ) : (
            <Link to="message">
              <span className="material-symbols-outlined">mail</span>
            </Link>
          )}
        </span>
      </header>
      <div className="post-body">
        <span className="post-body-section">
          <h3>Posted on:</h3>
          <p>
            {new Date(post.createdAt).toLocaleDateString("en-us", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </span>
        <span className="post-body-section">
          <h3>By:</h3>
          <p>{post.author.username}</p>
        </span>
        <span className="post-body-section">
          <h3>Location:</h3>
          <p>{post.location}</p>
        </span>
        {post.willDeliver && (
          <span className="post-body-section">
            <p>Delivery available</p>
          </span>
        )}
        <span className="post-body-section">
          <h3>Price:</h3>
          <p>{post.price}</p>
        </span>
        <span className="post-body-section post-description">
          <p>{post.description}</p>
        </span>
      </div>
    </div>
  );
};

export default Post;
