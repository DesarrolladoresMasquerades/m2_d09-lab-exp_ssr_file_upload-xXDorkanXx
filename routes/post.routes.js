const router = require("express").Router();
const {isLoggedIn, isLoggedOut} = require("../middleware/route-guard");
const fileUploader = require("../config/cloudinary.config");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

router.route("/create-new-post", isLoggedIn)
.get((req, res)=>{
    res.render("posts/post-form");
})
.post(fileUploader.single("picPath"), (req, res)=>{
    const { content, picName } = req.body;
    const picPath = req.file.path;
    const creatorId = req.session.currentUserId;

    Post.create({
        content,
        creatorId,
        picPath,
        picName
    })
    .then(()=>{
        res.redirect("/");
    })
})

router.get("/posts-list", (req, res)=>{
    Post.find()
    .then((posts)=>{
        res.render("posts/posts-list", {posts})
    })
})

router.get("/post/:id/details", (req, res)=>{
    const id = req.params.id;

    User.findById(id)
    .then((user)=>{
        Post.findOne({creatorId: id})
        .then((post)=>{
            console.log(post);
            //const objPost = {post}
            const date = post.createdAt.toISOString().slice(0,10);
            res.render("posts/post-details", {user, date})
        })
    })
})

module.exports = router;