import { Link } from "react-router-dom";
import "./messages.css";

const Messages = (props) => {
  let posts = props.user.data.posts;
  posts = posts.filter((post) => post.messages.length);

  return (
    <div className="messages">
      {posts.length ? (
        posts.map((post) => (
          <div className="post-preview msg-preview">
            <div className="post-header">
              <Link to={`/posts/${post._id}`}>
                <h2>{post.title}</h2>
              </Link>
              <p>
                Posted:{" "}
                {new Date(post.createdAt).toLocaleDateString("en-us", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="msg-view">
              {post.messages.map((msg) => (
                <div className="msg">
                  <p className="from">{msg.fromUser.username}</p>
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Messages;
