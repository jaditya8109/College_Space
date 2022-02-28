const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const multer = require("multer");
const path  = require("path");

dotenv.config();
 
// mongodb connection
mongoose.connect(process.env.MONGO_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));   

app.use("/images", express.static(path.join(__dirname, "public/images")));

// middlewares
// body parser and parse in post req
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
    try{
        return res.status(200).json("File uploaded successfully")
    }catch(err){
        console.log(err)
    }
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

app.listen(8800, ()=>{
    console.log("Server running as it should ")
})
 