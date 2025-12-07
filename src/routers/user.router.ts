import { Router } from "express"
import UserRepository from "../repositories/user.repository"
import UserService from "../services/user.service"
import IUserController from "../Controller/user.controller"
//Repository
const userRepository = new UserRepository()
//Service
const userService = new UserService(userRepository)
//Controller
const userController = new UserController(userService)

userRouter.route('/register').post(userController.register)
userRouter.route('/login').post(userController.login)

export default userRouter