import React from "react";
import "./style.css";
export default function LoginPage() {
    return <>
        <div className="logo">
            <h1>CabConnect</h1>
        </div>
        <div className="choice">
            <div className="container">
                <div className="text">User</div>
            </div>
            <div className="container">
                <div className="text">Admin</div>
            </div>
        </div>
    </>
}