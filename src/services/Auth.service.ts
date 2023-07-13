import { Request } from "express";
import db from '../db/models';
import { Op } from "sequelize"
import { TodoInput } from "../input/TodoInput";
import { UserInput } from "../input/UserInput";
import bcrypt from "bcrypt"
import { UserLoginInput } from "../input/UserLoginInput";
import jwt from "jsonwebtoken"
require('dotenv').config();
class AuthService {

    register = async (userInput: UserInput) => {
        try {
            // Generate a hashed password using bcrypt
            const hashedPassword = await bcrypt.hash(userInput.password, 10);
            userInput.password = hashedPassword;
            userInput.isActive = true;
            const DB: any = db;
            const user = await DB.User.create(userInput);
            return user;
        } catch (error) {
            return false;
        }
    }

    login = async (userLoginInput: UserLoginInput)  => {
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
                return false;
            }

            const storedHashedPassword = user.password;
            const passwordMatch = await bcrypt.compare(userLoginInput.password, storedHashedPassword);
            
            if (!passwordMatch) {
                return false;
            }
            const secretKey: any = process.env.SECRET_KEY;
            const token = jwt.sign(userLoginInput.userName, secretKey);

            return {
                user: {
                    id : user.id,
                    userName: user.userName,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                token: token

            }
        }
        catch (error) {
            return false;
        }
    }

    isExitsUser = async (userName: string) => {
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