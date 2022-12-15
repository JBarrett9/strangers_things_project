import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../../api/authentication";
import "./Login.css";

const Login = (props) => {
  const [usrName, setUsrName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    userLogin(usrName, pass, props.setToken, setError, navigate);
  };

  return (
    <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
      <div className="inputs">
        {error && <div>{error}</div>}
        <span>
          <label>Username:</label>
          <input onChange={(e) => setUsrName(e.target.value)}></input>
        </span>
        <span>
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPass(e.target.value)}
          ></input>
        </span>
      </div>
      <div className="submit-group">
        <button>Login</button>
        <p>
          Need an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
