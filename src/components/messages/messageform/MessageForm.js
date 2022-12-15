import { useState } from "react";
import { useParams } from "react-router-dom";
import { sendMessage } from "../../../api/api-functions";
import "./MessageForm.css";

const MessageForm = (props) => {
  let { postId } = useParams();
  let post = props.posts.filter((post) => post._id === postId)[0];

  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(postId, props.token, content);
  };

  return (
    <form className="newmessage-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>
        Sending to: {post.author.username} regarding {post.title}
      </h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button>Send</button>
    </form>
  );
};

export default MessageForm;
