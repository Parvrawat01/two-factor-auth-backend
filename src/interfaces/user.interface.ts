import { FilterQuery, UpdateQuery, UpdateWriteOpResult } from 'mongoose';
import { IUserSchema } from '../types/user.type';
import { RequestHandler } from 'express';
import { TServiceSuccess } from '../types/service.type';
import z from 'zod';
import { loginUserValidator, registerUserValidator } from '../validators/user.validator';

// ----------------------------------------------
// Request Data Types
// ----------------------------------------------
export interface IUserRequestData {
  register: {
    body: z.infer<typeof registerUserValidator>;
  }
  login: {
    body: z.infer<typeof loginUserValidator>
  }
}
// ----------------------------------------------
// Controller Interface
// ----------------------------------------------
export interface IUserController {
  register: RequestHandler
  login: RequestHandler
}

// ----------------------------------------------
// Service Interface
// ----------------------------------------------
export interface IUserService {
  register: (payload: IUserRequestData['register']['body']) => Promise<TServiceSuccess<{ 
    userId: string 
  }
  >
  >
  login: (payload: IUserRequestData['login']['body']) => Promise<TServiceSuccess<{ 
    userId: string
    accesstoken: string 
  }>
  >
}

// ----------------------------------------------
// Repository Interface
// ----------------------------------------------
export interface IUserRepository {
  findOne: (filter: FilterQuery<IUserSchema>,select?: string) => Promise<IUserSchema | null>
  create: (payload: IUserSchema) => Promise<IUserSchema>

  updateOne: (filter: FilterQuery<IUserSchema>,update: UpdateQuery<IUserSchema>) => Promise<UpdateWriteOpResult>

}
