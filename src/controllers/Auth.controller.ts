
import { ERROR_CODE, UNAUTHORIZED } from "../const/status";
import { UserInput } from "../input/UserInput";
import { UserLoginInput } from "../input/UserLoginInput";
import AuthService from "../services/Auth.service";
import { Request, Response } from "express";
class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  register = async (req: Request, res: Response): Promise<Response> => { 
    try {
        const {
            email ,
            firstName,
            lastName,
            password,
            userName,
        }  = req.body as UserInput;
        const isExitsUser = await this.authService.isExitsUser(userName);
        if(isExitsUser)
        {
            return res.status(ERROR_CODE).send({
                message : "Đã tồn tại user!",
                status : ERROR_CODE
            });
        }
        const user = await this.authService.register({
            email ,
            firstName,
            lastName,
            password,
            userName,
        } );
        if(!user)
        {
            return res.status(ERROR_CODE).send({
                message : "Có lỗi xảy ra khi tạo!",
                status : ERROR_CODE
            });
        }
        return res.send({
            data: {
                user : {
                    "id": user.id,
                    "email": user.email,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "userName": user.userName,
                }
            },
            message: "Register Success"
        })
      } catch (error) {
        return res.send(error)
      }
  }

  login =  async (req: Request, res: Response): Promise<Response> => {  
    try {
        const userLoginInput : UserLoginInput = req.body;
        const user = await this.authService.login(userLoginInput);
        if(!user)
        {
            return res.status(UNAUTHORIZED).send({
                data: user,
                message: "Username or Password Wrong !"
            }) 
        }
        return res.send({
            data: user,
            message: "Login Success"
        })
      } catch (error) {
        return res.send(error)
      }
  }
  
}

export default new AuthController;