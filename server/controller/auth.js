import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE  email=? OR username=?";

    db.query(q, [req.body.email, req.body.name], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("user already exists.");

        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";

        const values = [req.body.username, req.body.email, hashPassword];

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(201).json("user has been created.");
        });
    });
};

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username=?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(400).json("user not found");

        const isPasswordCorrect = bcrypt.compare(
            req.body.password,
            data[0].password
        );

        if (!isPasswordCorrect)
            return res.status(400).json("Wrong username or password");

        const token = jwt.sign({ id: data[0].id }, process.env.JWT_SEC);
        const { password, ...other } = data[0];

        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(other);
    });
};
export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    })
        .status(200)
        .json("user has been logout");
};
