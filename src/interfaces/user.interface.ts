import {filterQuery, UpdateQuery, UpdateWriteOpResult} from 'mongoose'
import {IUserRepository, IUserSchema} from '../Types/User.Type'

export interface IUserRepository {
    findOne: (filter:filterQuery<IUserSchema>,select?: string) =>
    Promise<IUserSchema | null>
    create: (payload:IUserSchema) => Promise<IUserSchema>
    updateOne: (filter:filterQuery<IUserSchema>,update:UpdateQuery<IUserSchema>) =>
    Promise<UpdateWriteOpResult>
}