
import { ERROR_CODE, SUCCSESS_CODE, UNAUTHORIZED } from "../const/status";
import { UserInput } from "../input/UserInput";
import { UserLoginInput } from "../input/UserLoginInput";
import { UserLoginOutput } from "../ouput/UserLoginOutput";
import AuthService from "../services/Auth.service";
import { Request, Response } from "express";
import { Respone as ResponeOutPut } from "../ouput/CommonOutput";
import { UserOutPut } from "../ouput/UserOutPut";
class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }
    register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const userInput : UserInput  = req.body as UserInput;
            const isExitsUser = await this.authService.isExitsUser(userInput.userName);
            if (isExitsUser) {
                const respone : ResponeOutPut<null> = {
                    data : null,
                    message : 'Đã tồn tại user',
                    statusCode : 500
                }
                return res.status(ERROR_CODE).send(respone);
            }
            const user : UserOutPut | null = await this.authService.register(userInput);
            if (!user) {
                const respone : ResponeOutPut<null> = {
                    data : null,
                    message : '"Có lỗi xảy ra khi tạo!',
                    statusCode : 500
                }
                return res.status(ERROR_CODE).send(respone);
            }
            const respone : ResponeOutPut<UserOutPut> = {
                data : user,
                message : "Đăng ký thành công",
                statusCode : SUCCSESS_CODE
            }
            return res.status(SUCCSESS_CODE).send(respone)
        } catch (error) {
            return res.status(ERROR_CODE).send(error)
        }
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const userLoginInput: UserLoginInput = req.body;
            const user: UserLoginOutput | null = await this.authService.login(userLoginInput);
            if (!user) {
                return res.status(UNAUTHORIZED).send({
                    data: user,
                    message: "Username or Password Wrong !"
                })
            }
            const respone: ResponeOutPut<UserLoginOutput> = {
                data: {
                    user: user.user,
                    token: user.token
                },
                message: "Login success",
                statusCode: SUCCSESS_CODE
            }
            return res.status(SUCCSESS_CODE).send(respone)
        } catch (error) {
            return res.sendStatus(ERROR_CODE).send(error)
        }
    }

}

export default new AuthController;