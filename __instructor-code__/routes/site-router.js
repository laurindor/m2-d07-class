const express = require('express');
const siteRouter = express.Router()

siteRouter.use((req, res, next)=>{
  console.log(req.session.currentUser)
  if(req.session.currentUser){
    next()
  }else{
    res.redirect('/auth/login')
  }
})

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

module.exports = siteRouter;