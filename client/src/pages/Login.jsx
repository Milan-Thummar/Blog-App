import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const { login } = useContext(AuthContext);

    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/");
        } catch (error) {
            setErr(error.response.data);
        }
    };
    return (
        <div className="auth">
            <h1>Login</h1>
            <form>
                <input
                    required
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={handleChange}
                />
                <input
                    required
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={handleChange}
                />
                <button onClick={handleLogin}>Login</button>
                {err && <p>{err}</p>}
                <span>
                    Don't you have an account?{" "}
                    <Link to={"/register"} className="link">
                        Register
                    </Link>
                </span>
            </form>
        </div>
    );
};

export default Login;
