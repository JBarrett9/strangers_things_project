import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getUser } from "./api/authentication";
import { fetchPosts } from "./api/api-functions";
import Home from "./components/home/Home";
import Login from "./components/user/login/Login";
import Navbar from "./components/navbar/Navbar";
import Post from "./components/posts/post/Post";
import Posts from "./components/posts/posts/Posts";
import Register from "./components/user/register/Register";
import MessageForm from "./components/messages/messageform/MessageForm";
import PostForm from "./components/posts/postform/PostForm";
import Messages from "./components/messages/messages/Messages";

const App = () => {
  const storedToken = localStorage.getItem("jwt");
  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (token) getUser(token, setUser);
  }, [token]);

  useEffect(() => {
    async function getPosts() {
      let data = await fetchPosts();
      let newPosts = data.data.posts;
      setPosts(newPosts);
    }
    getPosts();
  }, []);

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/posts"
          element={
            <Posts
              posts={posts}
              token={token}
              user={user}
              setPosts={setPosts}
            />
          }
        />
        <Route
          path="/posts/:postId"
          element={<Post posts={posts} token={token} user={user} />}
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/posts/:postId/message"
          element={
            token ? (
              <MessageForm token={token} posts={posts} />
            ) : (
              <Login setToken={setToken} />
            )
          }
        />
        <Route
          path="/new_post"
          element={
            token ? <PostForm token={token} /> : <Login setToken={setToken} />
          }
        />
        <Route
          path="/update_post/:postId"
          element={<PostForm token={token} posts={posts} />}
        />
        <Route path="/messages" element={<Messages user={user} />} />
      </Routes>
    </>
  );
};

export default App;
