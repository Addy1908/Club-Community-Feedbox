const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtKey = require("../key");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const requireLogin = require("../middleware/requireLogin");
const { closeDelimiter } = require("ejs");
const nodemailer = require('nodemailer');

router.get("/get", async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/register", (req, res) => {
  const {
    name,
    email,
    password,
    collegeName,
    branch,
    skills,
    coins,
    role,
    position,
    collegeYear,
    bio,
    uniqueId,
    img,
    events
  } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user already exists with that email" });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          email,
          password: hashedPassword,
          // password,
          name,
          collegeName,
          branch,
          skills,
          coins,
          role,
          position,
          uniqueId,
          collegeYear,
          bio,
          img,
          events,

        });

        user
          .save()
          .then((user) => {
            // transporter.sendMail({
            //     to:user.email,
            //     from:"no-reply@insta.com",
            //     subject:"signup success",
            //     html:"<h1>welcome to instagram</h1>"
            // })
            // res.json({message:"saved successfully"})
            res.send(user);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add all the details" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ err: "invalid email or password" });
    } else if(savedUser.role == 'user') {
      return res.status(500).json({ err: "You are not a part of club right now." });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({message:"successfully signed in"})
          const token = jwt.sign({ _id: savedUser._id }, jwtKey);
          // const decodedToken = jwt.decode(token);
          res.json({ token });
        } else {
          return res.status(422).json({ error: "invalid password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});


router.get('/user', requireLogin, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email }).populate("email").select("-password");
    if(user){
      res.status(200).json(user);
    }else{
      res.status(404).json("This user doesn't exists...")
    }
  } catch (error) {
    res.status(404).send('User not found');
  }
});


router.get('/user/:id', requireLogin, async (req, res) => {
  let result = await User.findOne({ _id: req.params.id });
  if (result) {
    res.send(result)
  }
  else {
    res.send("not found")
  }
})

router.put('/updatePic/:id', requireLogin, async (req, res) => {
  let result = await User.updateOne(
    { _id: req.params.id },
    { $set: { img: req.body.url } }
  )
  res.send(result)
})


router.put('/updateSkill/:id', requireLogin, async (req, res) => {
  let result = await User.updateOne(
    { _id: req.params.id },
    { $push: { skills: req.body.skill } }
  )
  res.send(result)
})


// router.put('/updateDetail/:id', async(req,res)=>{

// //  console.log(req.body.email)
// //   console.log(req.body.bio)
//   let result = await User.updateMany(
//     {_id:req.params.id},

// update details of a user
router.put('/updateDetail/:id', async (req, res) => {
  // console.log(req.body,req.params.id);
  try {
    let result = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/sendmail/:id', async (req, res) => {
  try {
    let result = await User.findOne({ _id: req.params.id })
    console.log(result);
    const transporter = nodemailer.createTransport({
      service:"gmail",
      port:465,
      secure:false,
      auth: {
          user: 'anushkashah02.feedbox@gmail.com',
          pass: 'dvtjbrrqhgjypuya' // this requires apps password not original password
      }
  });

  let info = await transporter.sendMail({
      from: '<anushkashah02.feedbox@gmail.com>', // sender address
      to: `${result.email}`, // list of receivers
      subject: "Hello Isha", // Subject line
      text: "Hello Isha", // plain text body
      html: "<b>Hello Isha</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
})

// delete a user
router.delete('/user/:id', async (req, res) => {
  const data = await User.findByIdAndDelete(req.params.id).then((user) => {
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  }).catch((error) => {
    res.status(500).send(error);
  })
})

// router.put('/updateSkills/:eventId', requireLogin, async (req, res) => {
//   let result = await Event.updateOne(
//     { _id: req.params.eventId },
//     {
//       $push: { skills: req.body }
//     }
//   )
//   res.send(result)
// })



router.get('/getAllUser',(req,res)=>{
  // var mySort = { date: -1 };
  User.find()
  // .sort(mySort)
  // .populate('postedBy').select("-password")
  .then(user=>{
      res.json(user)
  })
  .catch(err=>{
      console.log(err)
  })
})


// updatte event attendance and coins of a user
router.put('/update/coins/events/', async (req, res) => {
  // console.log(req.body);
  try {
    req.body.attendees.map(async (data) => {
      const response = await User.updateOne({ _id: data.id }, {
        $set: { coins: data.coins },
        $push: { events: req.body.currentEvent }
      })
    })
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json(error)
  }
})




module.exports = router;
