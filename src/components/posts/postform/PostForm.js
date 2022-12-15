import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, updatePost } from "../../../api/api-functions";
import "./PostForm.css";

const PostForm = (props) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [description, setDescription] = useState("");
  const [currPostId, setCurrPostId] = useState("");

  let { postId } = useParams();
  useEffect(() => {
    if (postId) {
      const post = props.posts.filter((post) => post._id === postId)[0];
      setTitle(post.title);
      setLocation(post.location);
      setPrice(post.price);
      setWillDeliver(post.willDeliver);
      setDescription(post.description);
      setCurrPostId(postId);
    }
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let post = { title, location, price, willDeliver, description };
    if (postId) {
      updatePost(post, currPostId, props.token, navigate);
    } else {
      createPost(props.token, post, navigate);
    }
  };

  return (
    <form className="post-form" onSubmit={(e) => handleSubmit(e)}>
      <header className="post-head">
        <h2>New Post</h2>
      </header>
      <span>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </span>
      <span>
        <label>Location: </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        ></input>
      </span>
      <span>
        <label>Price: </label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
      </span>
      <span>
        <label>Willing to deliver?</label>
        <input
          type="checkbox"
          className="check"
          checked={willDeliver}
          onChange={() => setWillDeliver(!willDeliver)}
        ></input>
      </span>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button>Submit</button>
    </form>
  );
};

export default PostForm;
