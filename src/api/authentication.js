import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./api-functions";

const getUser = async (token, setUser) => {
  try {
    const response = await fetch(BASE_URL + "/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUser(data);
  } catch (err) {
    console.log(err);
  }
};

const registerUser = async (usrName, pass, setToken, setError, navigate) => {
  try {
    const response = await fetch(BASE_URL + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: usrName,
          password: pass,
        },
      }),
    });
    const data = await response.json();
    if (data.success) {
      setError("");
      navigate("/login");
    } else {
      setError(data.error.message);
    }
  } catch (err) {
    console.log(err);
  }
};

const userLogin = async (usrName, pass, setToken, setError, navigate) => {
  try {
    const response = await fetch(BASE_URL + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: usrName,
          password: pass,
        },
      }),
    });
    const data = await response.json();
    if (data.success) {
      const token = data.data.token;
      setToken(token);
      localStorage.setItem("jwt", token);
      navigate("/posts");
    } else {
      setError(data.error.message);
    }
  } catch (err) {
    console.log(err);
  }
};

export { getUser, registerUser, userLogin };
