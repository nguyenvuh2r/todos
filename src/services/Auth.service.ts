
import db from '../db/models';
import { UserInput } from "../input/UserInput";
import bcrypt from "bcrypt"
import { UserLoginInput } from "../input/UserLoginInput";
import jwt from "jsonwebtoken"
import { UserLoginOutput } from "../ouput/UserLoginOutput";
import { UserOutPut } from "../ouput/UserOutPut";
require('dotenv').config();
class AuthService {

    register = async (userInput: UserInput) : Promise<UserOutPut|null> => {
        try {
            // Generate a hashed password using bcrypt
            const hashedPassword = await bcrypt.hash(userInput.password, 10);
            userInput.password = hashedPassword;
            userInput.isActive = true;
            const DB: any = db;
            const user = await DB.User.create(userInput);
            return {
                email : user.email,
                firstName : user.firstName,
                id : user.id,
                lastName : user.lastName,
                userName : user.userName
            };
        } catch (error) {
            return null;
        }
    }

    login = async (userLoginInput: UserLoginInput) : Promise<UserLoginOutput | null>  => {
        try {
            
            const DB: any = db;
            const user = await DB.User.findOne({
                where: {
                    userName: userLoginInput.userName,
                    isActive: true
                },
                attributes: ['id', 'firstName', 'lastName', 'email', 'password', 'userName'],
            });
            if (!user) {
                return null;
            }

            const storedHashedPassword = user.password;
            const passwordMatch = await bcrypt.compare(userLoginInput.password, storedHashedPassword);
            
            if (!passwordMatch) {
                return null;
            }
            const secretKey: any = process.env.SECRET_KEY;
            const token = jwt.sign(userLoginInput.userName, secretKey);
            const respone : UserLoginOutput = {
                user : {
                    id : user.id,
                    userName: user.userName,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                token : token,
            }
            return respone;

        }
        catch (error) {
            return null;
        }
    }

    isExitsUser = async (userName: string) : Promise<boolean> => {
        const DB: any = db;
        const user = await DB.User.findOne({
            where: {
                userName: userName,
                isActive: true
            },
            attributes: ['id', 'firstName', 'lastName', 'email', 'userName'],
        });

        if(user)
        {
            return true;
        }
        return false;
    }
}

export default AuthService;