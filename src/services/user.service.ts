import { generateMinutesSeconds } from '../config/helpers/date-time.helper';
import { singJwt } from '../config/helpers/Jwt.helper';
import { serviceSuccess } from '../config/helpers/service.helper';
import ApplicationException from '../helpers/errors.helper';
import { IUserRepository,IUserRequestData, IUserService } from '../interfaces/user.interface';
import { TServiceSuccess } from '../types/services.types';
import { loginUserValidator } from '../Validators/user.Validators';

export default class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  register = async (
    payload: IUserRequestData['register']['body']
  ) => {
    //Find the already register
    const user = await this.userRepository.findOne(
      email: payload.email
  })
  if(User) {
    throw new ApplicationException(400, 'Invalid Credentials')
  }

  //Hash password
  const hashedPassword = await hashValue(payload.password)
  // register user
  const newUser = await this.userRepository.create({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    twoFactorAuth: {
    activated: false,
    secret: null,
    recoveryCodes: []
    }
  })

  return serviceSuccess('User Registered', {
    userId: String(newUser._id)
    })

      login = async(payload:IUserRequestData['login']['body']) => {
        //Find the user
        const user = await this.userRepository.findOne(
          {email:payload.email},
        '+password +twoFactorAuth.secret +twoFactorAuth.recoveryCodes'
        )
        if(!user) {
          throw new ApplicationException (400,'Invalid Credentials')
        }
        //Compare Password
        const enteredPassword = payload.password
        const hashedPassword = user.password

        const isValidPassword = await coompareValue(enteredPassword,hashedPassword)
        if(!isValidPassword) {
          throw new ApplicationException(400,'Invalid Credentials')
        }

        //Generate Access Token
        const tokenPayload = TjwtPayload = {
          userId: String(user._id),
          stage: 'password'
        }
        const accessToken = singJwt(tokenPayload,envConfig.ACCESS_TOKEN_SECRET, generateMinutesSeconds(5))
        return serviceSuccess('Logged In',{
      userId: String(user._id),
      accessToken
    })
  }
    }