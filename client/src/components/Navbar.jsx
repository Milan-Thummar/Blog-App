import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navber = () => {
    const { currentUser, logout } = useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to={"/"} className="link">
                        <h1>Blog</h1>
                    </Link>
                </div>
                <div className="links">
                    <Link className="link" to={"/?cat=art"}>
                        <h6>ART</h6>
                    </Link>
                    <Link className="link" to={"/?cat=science"}>
                        <h6>SCIENCE</h6>
                    </Link>
                    <Link className="link" to={"/?cat=technology"}>
                        <h6>TECHNOLOGY</h6>
                    </Link>
                    <Link className="link" to={"/?cat=cinema"}>
                        <h6>CINEMA</h6>
                    </Link>
                    <Link className="link" to={"/?cat=design"}>
                        <h6>DESIGN</h6>
                    </Link>
                    <Link className="link" to={"/?cat=food"}>
                        <h6>FOOD</h6>
                    </Link>
                    <span>{currentUser?.username}</span>
                    {currentUser ? (
                        <span onClick={logout}>
                            <Link to={"/"} className="link">
                                Logout
                            </Link>
                        </span>
                    ) : (
                        <Link className="link" to={"/login"}>
                            Login
                        </Link>
                    )}
                    <span className="write">
                        <Link to={"/write"} className="link">
                            Write
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Navber;
