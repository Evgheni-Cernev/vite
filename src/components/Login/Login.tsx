import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigation = useNavigate();
  const onLogin = () => {
    window.localStorage.setItem("token", "jkdsnfskjdfnk");
    navigation("/");
  };

  return (
    <div className="login-container">
      <TextField
        required
        fullWidth
        id="outlined-required"
        label="Required"
        placeholder="email@gmail.com"
      />
      <Button variant="contained" onClick={onLogin}>
        Login
      </Button>
    </div>
  );
};

export default Login;
