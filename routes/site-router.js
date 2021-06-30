const express = require("express");
const siteRouter = express.Router();

siteRouter.use((rew, res, next)=>{
   console.log(req.session.currentUser)  //line 32 in auth-router
    if (req.session.currentUser){ //checks if you are logged in (your session exists in the database )
        next()
    } else {
        res.redirect('/auth/login')
    } 
})

//a partid de aqui todo está protegido
siteRouter.get('/protected', (req, res, next) => {
    res.render('site/protected-webpage');
  })

siteRouter.get('/personal', (req, res, next) => {
  res.render('site/personal-webpage');
})

siteRouter.get('/profile', (req, res, next) => {
  res.render('site/profile-webpage');
})

siteRouter.get('/', (req, res, next) => {
  res.render('site/index');
})



module.exports = siteRouter