import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import Edit from "../Images/edit.png";
import Delete from "../Images/delete.png";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Single = () => {
    const [post, setPost] = useState({});

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();
    const postId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8800/api/posts/${postId}`
                );
                setPost(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [postId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${postId}`);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };
    return (
        <div className="single">
            <div className="content">
                <img src={`../upload/${post.img}`} alt="" />
                <div className="user">
                    {post.userImg && <img src={post.userImg} alt="" />}
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {currentUser.username === post.username && (
                        <div className="edit">
                            <Link to={`/write?edit=2`} state={post}>
                                <img src={Edit} alt="" />
                            </Link>
                            <img onClick={handleDelete} src={Delete} alt="" />
                        </div>
                    )}
                </div>
                <h1>{post.title}</h1>
                <span>{getText(post.desc)}</span>
            </div>
            <Menu cat={post.cat} />
        </div>
    );
};

export default Single;
