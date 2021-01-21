const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/user"); // User model

//change to post
router.get("/register", (req, res) => {
  // const { name, email, password } = req.body;
  const { name, email, password } = {
    name: 'admin',
    email: 'test@gmail.com',
    password: 'testtest'
  };

  // Check required fields
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  //Check password length
  if (password.length < 8) {
    return res.status(400).json({ msg: "Password should be atleast 8 characters long" });
  }



    User.findOne({ name: name }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    //New User created
    const newUser = new User({
      name:name,
      email:email,
      password:password
    });

    //Password hashing
    console.log(newUser);
    bcrypt.genSalt(12, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        // Save user
        newUser.save()
          .then(
            res.json({
              msg: "Successfully Registered"
            })
          )
          .catch((err) => console.log(err));
      })
    );
  });
})


router.post('/login', (req, res)=>{
  console.log("request body:",req.body);
  console.log("cookie:", req.headers.cookie);
  const {name, password} = req.body
  console.log(name, password);
  User.findOne({name:name})
  .then(user =>{
    if (!user) {
      console.log('no such user');
      return res.status(400).json({msg:"Invalid credentials"})
    }

    //need to add speakeasy token afterward
    bcrypt.compare(password, user.password)
    .then(match=>{
      if (!match) {
        console.log('wrong password');
        return res.status(400).json({msg:"Wrong password"})
      }

      const sessUser = {
        id: user.id,
        name:user.name,
        email: user.email
      }

      req.session.user = sessUser; // how does this autosave to store?
      console.log('cookies:',req.session.cookie._expires);

      res.json({ msg: " Logged In Successfully", sessUser, session: req.sessionID, expire:req.session.cookie._expires});
    })
    .catch(err=>console.log(err))

     //
    // bcrypt.compare(password, user.password).then((isMatch) => {
    //   if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    //
    //   const sessUser = { id: user.id, name: user.name, email: user.email };
    //   req.session.user = sessUser; // Auto saves session data in mongo store
    //
    //   res.json({ msg: " Logged In Successfully", sessUser }); // sends cookie with sessionID automatically in response
    // })

  })
  .catch(err=>console.log(err))
})

router.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    //delete session data from store, using sessionID in cookie
    if (err) throw err;
    res.clearCookie("session-id");
    console.log("Logged out successfully");
    res.send("Logged out successfully");
  });
});

router.get("/authchecker", (req, res) => {
  console.log('checking auth...',req.session);
  // console.log(req.session);
  const sessUser = req.session.user;
  if (sessUser) {
    // res.render('/login')
    return res.json({ msg: " Authenticated Successfully", sessUser });
    // return req.cookies
  } else {
    console.log('Unauthorized');
    return res.status(401).json({ msg: "Unauthorized" });
  }
})

module.exports = router;
