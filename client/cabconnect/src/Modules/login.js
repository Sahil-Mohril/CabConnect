import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo2 from "./logo2.png";
import "./loginstyle.css";

export default function Login() {
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                emailId: userid,
                password: password,
            }),
        });

        if (response.ok) {
            const user = await response.json();
            console.log("✅ Login successful:", user);
            navigate("/home"); // redirect to home page
        } else {
            setError("Invalid email or password");
        }
    }

    return (
        <div className="credentials">
            <div className="logo">
                <img src={logo2} alt="Company Logo" />
            </div>
            <form className="login" onSubmit={handleSubmit}>
                <div className="uid">
                    <label htmlFor="username">Email</label><br />
                    <input
                        type="text"
                        id="userid"
                        name="userid"
                        value={userid}
                        onChange={(e) => setUserid(e.target.value)}
                    />
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label><br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="button">
                    <button type="submit" className="login">Login</button>
                </div>
                {error && <p className="error">{error}</p>}
                <div className="signup">
                    <p>Create Account</p>
                </div>
            </form>
        </div>
    );
}
