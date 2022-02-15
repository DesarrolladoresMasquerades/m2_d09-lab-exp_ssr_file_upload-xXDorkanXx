const router = require("express").Router();
const User = require("../models/User.model");

/* GET home page */
router.get("/", (req, res, next) => {
  const id = req.session.currentUserId;

  User.findById(id)
  .then((user)=>{
    res.render("index", {user});
  })
});

module.exports = router;
