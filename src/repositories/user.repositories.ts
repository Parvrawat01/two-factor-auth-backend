import { fiterQuery,UpdateQuery } from "mongoose"
import {IUserRepository} from "../Types/User.Type"
import { IUserSchema } from "../Types/User.Type"
import UserModel from "../Models/user.Models"

export default class UserRepository implements IUserRepository {
    findOne = async (filter: fiterQuery<IUserSchema>,select:string ='') => {
        return UserModel.findOne(filter).select(select)
        
        create=(payload:IUserSchema)=>{
            return UserModel.create(payload)
        }   
        updateOne = async (filter: fiterQuery<IUserSchema>,update:Update'
            return userModel.updateOne(filter,update) Query<IUserSchema>) => {
        }
    }
    