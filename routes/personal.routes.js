const router = require("express").Router();
const {isLoggedIn, isLoggedOut} = require("../middleware/route-guard");
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");

router.get("/user-profile", isLoggedIn, (req, res) => {
  const id = req.session.currentUserId;

  User.findById(id)
  .then((user)=>{
    res.render("users/user-profile", {user});
  })
});

router.post("/uploadImg", fileUploader.single("imgUrl"), (req, res)=>{
    const id = req.session.currentUserId;

    const imgUrl = req.file.path;
  
    User.findByIdAndUpdate(id, {imgUrl}, {new: true})
    .then((user)=>{
      res.redirect("/user-profile")
    });

});

module.exports = router;