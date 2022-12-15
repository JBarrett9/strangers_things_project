const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2206-vpi-rm-web-pt";

const createPost = async (token, post, navigate) => {
  fetch(BASE_URL + "/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title: post.title,
        location: post.location,
        description: post.description,
        price: post.price,
        willDeliver: post.willDeliver,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      navigate(`/posts`);
    })
    .catch(console.error);
};

const deletePost = async (postId, token, navigate) => {
  fetch(BASE_URL + `/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then(() => {
      navigate("/posts");
    })
    .catch(console.error);
};

const updatePost = async (post, postId, token, navigate) => {
  fetch(BASE_URL + `/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title: post.title,
        description: post.description,
        price: post.price,
        location: post.location,
        willDeliver: post.willDeliver,
      },
    }),
  })
    .then((response) => response.json())
    .then(() => {
      navigate(`/posts`);
    })
    .catch(console.error);
};

const fetchPosts = async () => {
  try {
    const response = await fetch(BASE_URL + "/posts");
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const sendMessage = async (postId, token, message) => {
  const response = await fetch(BASE_URL + `/posts/${postId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message: {
        content: message,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
};

export {
  fetchPosts,
  deletePost,
  updatePost,
  BASE_URL,
  sendMessage,
  createPost,
};
