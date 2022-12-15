import { useEffect, useState } from "react";
import "./Posts.css";
import PostsNav from "../nav/PostsNav";
import { Link } from "react-router-dom";
import { fetchPosts } from "../../../api/api-functions";

const Posts = (props) => {
  let posts = props.posts;
  const [search, setSearch] = useState("");
  const [userOnly, setUserOnly] = useState(false);

  if (userOnly)
    posts = props.posts.filter(
      (post) => post.author._id === props.user.data._id
    );

  useEffect(() => {
    async function getPosts() {
      let data = await fetchPosts();
      let newPosts = data.data.posts;
      props.setPosts(newPosts);
    }
    getPosts();
  }, []);

  return (
    <>
      <PostsNav
        setSearch={setSearch}
        user={props.user}
        setFilter={setUserOnly}
        userOnly={userOnly}
      />
      <div className="Posts">
        {posts.length ? (
          posts
            .filter(
              (post) =>
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.description.toLowerCase().includes(search.toLowerCase()) ||
                post.location.toLowerCase().includes(search.toLowerCase())
            )
            .map((post) => (
              <div key={post._id} className="post-preview">
                <div className="post-header">
                  <Link to={post._id}>
                    <h2>{post.title}</h2>
                  </Link>
                  <p>Location: {post.location}</p>
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
                <div className="post-desc">
                  <p className="description">{post.description}</p>
                  <p>
                    <span className="post-label">Price:</span> {post.price}
                  </p>
                  <p>
                    <span className="post-label">Seller:</span>{" "}
                    {post.author.username}
                  </p>
                </div>
              </div>
            ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Posts;
