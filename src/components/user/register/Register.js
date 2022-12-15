import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/authentication";
import "./Register.css";

const Register = (props) => {
  const [usrName, setUsrName] = useState();
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pass === pass2) {
      await registerUser(usrName, pass, props.setToken, setError, navigate);
    }
  };

  return (
    <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
      <div className="inputs">
        {error && <div>{error}</div>}
        <span>
          <label>Username:</label>
          <input onChange={(e) => setUsrName(e.target.value)} required></input>
        </span>
        <span>
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPass(e.target.value)}
            required
          ></input>
        </span>
        <span>
          <label>Re-Enter Password:</label>
          <input
            type="password"
            onChange={(e) => setPass2(e.target.value)}
            required
          ></input>
        </span>
        {!(pass === pass2) && <p className="pass-err">Passwords don't match</p>}
      </div>
      <div className="submit-group">
        <button>Register</button>
        <p>
          Have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
