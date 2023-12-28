import database from "../services/database";
import User from "../models/user.model";

interface IUserRepository {
    save(user: User): Promise<User>;
    retrieveAll(searchParams: {email: string}): Promise<User[]>;
    retrieveById(userId: string): Promise<User | undefined>;
    update(user: User): Promise<number>;
    delete(userId: string): Promise<number>;
    deleteAll(): Promise<number>;
}

class UserRepository implements IUserRepository {
    save(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    retrieveAll(searchParams: { email: string; }): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    retrieveById(userId: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    update(user: User): Promise<number> {
        throw new Error("Method not implemented.");
    }
    delete(userId: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    deleteAll(): Promise<number> {
        throw new Error("Method not implemented.");
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserRepository();
