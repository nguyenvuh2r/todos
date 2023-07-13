import { expect } from "chai";
import { starServer } from "../../app";
import { UserInput } from "../../input/UserInput";
import AuthService from "../../services/Auth.service";
import { UserOutPut } from "../../ouput/UserOutPut";
import { UserLoginInput } from "../../input/UserLoginInput";
import { UserLoginOutput } from "../../ouput/UserLoginOutput";

describe('Testing Auth Service', () => {
    let app: any;
    let authService: AuthService;
    before(() => {
        app = starServer(3001)
        authService = new AuthService();
    });

    it('should register new user', async () => {
        // create new
        const userData: UserInput = {
            email: 'gin.pham@gmail.com',
            firstName: 'Pham',
            lastName: 'An',
            password: "123123123",
            userName : "ginpham1",
            isActive : true
        };
        let isExitsUser = await authService.isExitsUser(userData.userName);
        if(!isExitsUser)
        {
            let respone : UserOutPut | null = await authService.register(userData);
            if(respone)
            {
                expect(respone).instanceOf(Object);
            }
            else {
                expect(respone).is.null;
            }
        }
    });

    it('should check is exits user', async () => { 
        let isExitsUser = await authService.isExitsUser("ginpham1");
        expect(isExitsUser).is.true;
    })

    it('should not login', async () => { 
        const loginParams : UserLoginInput = {
            userName : "ginpham1",
            password : "123123123444444"
        }
        let result : UserLoginOutput | null = await authService.login(loginParams);
        expect(result).is.null
    })

    it('should login', async () => { 
        const loginParams : UserLoginInput = {
            userName : "ginpham1",
            password : "123123123"
        }
        let result : UserLoginOutput | null = await authService.login(loginParams);
        expect(result).instanceOf(Object);
        expect(result?.user.userName).to.equal("ginpham1");
        expect(result?.token).to.not.be.empty;
        expect(typeof result?.token).to.be.a('string')
    })



    it('should check not exits user', async () => { 
        let isExitsUser = await authService.isExitsUser("ginpham00001");
        expect(isExitsUser).is.false;
    })
    
    after((done) => {
        app.close(done);
    });
});