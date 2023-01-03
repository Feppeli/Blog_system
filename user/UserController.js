const express = require("express");
const User = require("./User");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.get("/admin/users", (req, res) => {
  User.findAll().then((users) => {
    res.render("admin/users/index", {
      users: users,
    });
  });
});

router.get("/admin/users/create", (req, res) => {
  res.render("admin/users/create");
});

router.post("/users/create", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  // verificação de duplicidade
  User.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (user == undefined) {
      //hash da password
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);

      User.create({
        email: email,
        password: hash,
      })
        .then(() => {
          res.redirect("/");
        })
        .catch(() => {
          res.redirect("/");
        });
    } else {
      res.redirect("/admin/users/create");
    }
  });
});


router.get('/login', (req, res) => {
  res.render('admin/users/login')
})

router.post('/authenticate', (req, res) => {

  var email = req.body.email
  var password = req.body.password

  User.findOne({
    wheres: {
      email: email
    }
  }).then(user => {
    if(user != undefined){
      var correct = bcrypt.compareSync(password, user.password)
      
      if(correct){
        req.session.user = {
          id: user.id,
          email: user.email
        }
        res.json(req.session.user)
      }else{
        res.redirect('/login')
      }
    }else{
      res.redirect('/login')
    }
  })
})

module.exports = router;
