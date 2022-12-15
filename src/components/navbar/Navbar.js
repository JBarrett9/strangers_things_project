import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  const [display, setDisplay] = useState(false);
  const logout = () => {
    props.setToken("");
    localStorage.removeItem("jwt");
  };

  return (
    <nav>
      <span className="logo">Stranger's Things</span>
      <span>
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <span>
          {props.token ? (
            <>
              <Link to="/messages">Messages</Link>
              <a onClick={logout}>Logout</a>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </span>
      </span>
    </nav>
  );
};

export default Navbar;
