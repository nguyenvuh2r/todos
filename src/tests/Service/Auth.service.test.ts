import { expect } from "chai";
import { starServer } from "../../app";
import { UserInput } from "../../input/UserInput";
import AuthService from "../../services/Auth.service";

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

        let respone = await authService.register(userData);
        

    });
    
    after((done) => {
        app.close(done);
    });
});