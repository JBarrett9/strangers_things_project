import { Link } from "react-router-dom";

const PostsNav = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <nav className="posts-nav">
      <form onSubmit={(e) => handleSubmit(e)}>
        <span>
          <label>Search Posts: </label>
          <input onChange={(e) => props.setSearch(e.target.value)}></input>
        </span>
      </form>
      <span>
        {props.user.data ? (
          props.userOnly ? (
            <a onClick={() => props.setFilter(false)}>View All</a>
          ) : (
            <a onClick={() => props.setFilter(true)}>My Posts</a>
          )
        ) : (
          <></>
        )}
        <Link to="/new_post">Add a Post</Link>
      </span>
    </nav>
  );
};

export default PostsNav;
