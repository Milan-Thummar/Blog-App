import express from "express";
import AuthRouter from "./routes/auth.js";
import UserRouter from "./routes/users.js";
import PostRouter from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/auth/", AuthRouter);
app.use("/api/users/", UserRouter);
app.use("/api/posts/", PostRouter);

app.listen(8800, () => {
    console.log("server running on port 8800");
});
