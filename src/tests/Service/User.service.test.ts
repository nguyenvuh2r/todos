import { expect } from 'chai';
import { starServer } from '../../app';
import UserService from '../../services/User.service';
import { UserInputDTO } from '../../DTO/UserInputDTO';
describe('Testing User Service', () => {
    let app: any;
    let userService: UserService;
    before(() => {
        app = starServer(3001)
        userService = new UserService();
    });

    it('should create a new user', async () => {

        const userData: UserInputDTO = {
            email: 'gin.pham@gmail.com',
            firstName: 'Pham',
            lastName: 'An'
        };

        const createdUser = await userService.create(userData);
        expect(createdUser).to.be.an('object');
        expect(createdUser.email).to.equal(userData.email);
        expect(createdUser.firstName).to.equal(userData.firstName);
        expect(createdUser.lastName).to.equal(userData.lastName);

    });

    it('should get one user', async () => {
        // create new
        const userData: UserInputDTO = {
            email: 'gin.pham@gmail.com',
            firstName: 'Pham',
            lastName: 'An'
        };

        const createdUser = await userService.create(userData);
        let userId: string = createdUser.id;
        // get user created
        const user = await userService.getOne(userId);

        expect(user).to.be.an('object');
        expect(user.email).to.equal(createdUser.email);
        expect(user.firstName).to.equal(createdUser.firstName);
        expect(user.lastName).to.equal(createdUser.lastName);

    });

    it('should update a user', async () => {
        // create new
        const userDataCreate: UserInputDTO = {
            email: 'gin.pham@gmail.com',
            firstName: 'Pham',
            lastName: 'An'
        };

        const createdUser = await userService.create(userDataCreate);
        let userId: string = createdUser.id;

        const userDataUpdate: UserInputDTO = {
            email: 'gin.pham@gmail.com',
            firstName: 'Pham',
            lastName: 'An'
        };

        await userService.update(userId,userDataUpdate);
        const user = await userService.getOne(userId);
        expect(user).to.be.an('object');
        expect(user.email).to.equal(userDataUpdate.email);
        expect(user.firstName).to.equal(userDataUpdate.firstName);
        expect(user.lastName).to.equal(userDataUpdate.lastName);

    });

    it('should delete one user', async () => {
        // create new
        const userData: UserInputDTO = {
            email: 'gin.pham@gmail.com',
            firstName: 'Pham',
            lastName: 'An'
        };
        const createdUser = await userService.create(userData);
        let userId: string = createdUser.id;
        // get user created
        await userService.delete(userId);
        const user = await userService.getOne(userId);
        expect(user).to.be.null;
    });

    after((done) => {
        app.close(done);
    });
});