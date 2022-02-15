const router = require("express").Router();
const {isLoggedIn, isLoggedOut} = require("../middleware/route-guard");
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");

/*
.route("/uploadImg")
.get((req, res)=>{
  res.render("users/edit-image");
})
*/
router.post("/uploadImg", fileUploader.single("imgUrl"), (req, res)=>{
    const id = req.session.currentUserId;

    const imgUrl = req.file.path;
  
    User.findByIdAndUpdate(id, {imgUrl}, {new: true})
    .then((user)=>{
      res.render("users/user-profile", {user})
    });

});

module.exports = router;