const userController=require('../controller/userController')
const route=require('express').Router()

route.post(`/details`,userController.form)

module.exports=route;