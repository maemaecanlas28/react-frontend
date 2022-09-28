import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react"
import { AuthContext } from "../Context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [error, setError] = useState("")

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(e) {
    e.preventDefault();
    auth.signin(username, password)
      .then((data) => {
        if (data.error) {
          setError(data.error)
        }
        else {
          navigate(from, { replace: true });
        }
      })
  }

  function handleSignup() {
    navigate("/signup")
  }

  return (
    <div className="login-form">
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
          type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password' />
        </Form.Field>
        <Button type='submit'> Submit </Button>
        <div>
          <Button style={{ marginTop: "10px" }} onClick={handleSignup}>Sign-up</Button>
        </div>
      </Form>
    </div>
  )
}

export default Login