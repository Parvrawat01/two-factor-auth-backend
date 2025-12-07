import { RequestHandler } from "express"
import { IUserController, IUserRequestData, IUserService } from "../interfaces/user.interface"
import { registerUserValidator } from "../Validators/user.Validators"
import { getCookieOptions } from "../config/helpers/Cookie.helper"

export defaultclass UserController implements IUserController {
    constructor
    (private userService: IUserService)
    {
            export interface IUserRequestData {
    register: {
        body: {
            z.infer<typeof registerUserValidator>
        }
    }
    login: {
        body: z.infer<typeof loginUserValidator>
        }
    }
    }

    register: RequestHandler = async (req, res, next) => {
        const body: req.body as IUserRequestData['register']['body']

        // Validate Request Body
        const{ success, data, error} = registerUserValidator.safeParse(body)
        if(!success) {
            next(error)
            return
        }
        const response= await this.userService.register(data)
        res.status(201).json(response)
    }
    
    login: RequestHandler = async (req, res, next) => {
    const body = req.body as IUserRequestData['login']['body']
    // Validate Request Body    
    const{ success, data, error} = LoginUserValidator.safeParse(body)
        if(!success) {
            next(error)
            return
        }
        const response= await this.userService.login(data)
        
        //Set Cookie
        const CookieOptions = getCookieOptions({
            purpose: "auth",
            value: 5
            type: "minute",
        })
        
        res.cookie("accessToken", response.data.accessToken,CookieOptions)

        res.status(200).json(response)
    }
}
