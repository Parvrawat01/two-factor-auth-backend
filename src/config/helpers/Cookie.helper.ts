import { CookieOptions } from "express"
import { generateDaysMilliSeconds, generateMinutesMilliSeconds } from "./date-time.helper"
import envConfig from "../env.config"

type TCookieParam = {
    purpose: "auth"
    value: number
    type: "minute" | "day",
} | {purpose: "logout"}

export const getCookieOptions = (param: TCookieParam) =>
    const CookieOptions: CookieOptions ={
        path: "/v1",
        httpOnly: true
    }

    if(param.purpose === "auth"){
        let maxAge = 0

        switch(param.type){
            case "minute": {
                maxAge = generateMinutesMilliSeconds(param.value)
                break
            case "day":{
                maxAge = generateDaysMilliSeconds(param.value)
                break
        }
    }

    CookieOptions.maxAge = maxAge
}

if(envConfig.NODE_ENV === "production"){
    CookieOptions.secure = true
    CookieOptions.sameSite = "strict"
}

return CookieOptions

}