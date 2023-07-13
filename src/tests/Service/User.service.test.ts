import { expect } from 'chai';
import { starServer } from '../../app';
import UserService from '../../services/User.service';
import { UserInput } from '../../input/UserInput';
import { UserOutPut } from '../../ouput/UserOutPut';
describe('Testing User Service', () => {
    let app: any;
    let userService: UserService;
    before(() => {
        app = starServer(3001)
        userService = new UserService();
    });

    it('should create a new user', async () => {
        const userData: UserInput = {
            email: 'gin.pham@gmail.com',
            firstName: 'Pham',
            lastName: 'An',
            password: "123123123",
            userName : "ginpham1",
            isActive : true
        };
        const isCreated = await userService.create(userData);
        expect(isCreated).to.be.true;
    });

    it('should not create a new user', async () => {
        const userData: UserInput = {
            email: 'gin.pham@gmail.com',
            firstName: 'Pham',
            lastName: '',
            password: "",
            userName : "",
        };
        const isCreated = await userService.create(userData);
        expect(isCreated).to.be.false;
    });

    it('should get users by username', async () => {
        const username = "ginpham1";
        const user : UserOutPut | null = await userService.getByUserName(username);
        expect(user).instanceOf(Object);
        expect(user?.userName).to.equal(username);
    });

    it('should not get users by username', async () => {
        const username = "ginpham10000";
        const user : UserOutPut | null = await userService.getByUserName(username);
        expect(user).is.null;
    });


    it('should get one user by id', async () => {
        const userData: UserInput = {
            email: 'gin2.pham@gmail.com',
            firstName: 'Pham',
            lastName: 'gin',
            password: "123123123",
            userName : "ginpham131252314",
            isActive : true
        };
        const id = await userService.createAndGetId(userData);
        if(id)
        {
            const user = await userService.getOne(id.toString());
            expect(user).instanceOf(Object);
            expect(user?.userName).to.equal(userData.userName);
        }
        else {
            expect(false);
        }
    });

    it('should update a user', async () => {
        const userData: UserInput = {
            email: 'gin.pham@gmail.com',
            firstName: 'Pham',
            lastName: 'gin',
            password: "123123123",
            userName : "ginpham1231114",
            isActive : true
        };
        const id = await userService.createAndGetId(userData);
        if(id)
        {
            const userUpdateData = {
                email: 'gin.pham@gmail.com',
                firstName: 'aaaaaa',
                lastName: 'gaaaaain',
                userName : "ginpham1231114",
                isActive : false
            };
            const result = await userService.update(id.toString(),userUpdateData);
            expect(result).is.true;
        }
        else {
            expect(false);
        }

    });

    it('should delete one user', async () => {
        const userData: UserInput = {
            email: 'gin.pham@gmail.com',
            firstName: 'Pham',
            lastName: 'gin',
            password: "123123123",
            userName : "ginpham1233114",
            isActive : true
        };
        const id = await userService.createAndGetId(userData);
        if(id)
        {
            const result = await userService.delete(id.toString());
            expect(result).is.true
        }
        else {
            expect(false);
        }
       
    });

    after((done) => {
        app.close(done);
    });
});