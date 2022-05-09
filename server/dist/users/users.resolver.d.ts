import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UpdatePasswordUserInput } from './dto/updatePassword-user.input';
import { CreateSocialUserInput } from './dto/create-socialUser.input';
import { Trainer } from 'src/trainers/entities/trainer.entity';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOneById(id: number): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    createUser(createUserInput: CreateUserInput): Promise<Omit<User, 'password' | 'dbPasswordSalt'>>;
    createSocialUser(createSocialUserInput: CreateSocialUserInput): Promise<User>;
    updateUser(currentUser: User | Trainer, updateUserInput: UpdateUserInput): Promise<User>;
    removeUser(id: number): Promise<User>;
    updatePasswordUser(updatePasswordUserInput: UpdatePasswordUserInput, currentUser: User | Trainer): Promise<Omit<User, 'password' | 'dbPasswordSalt'>>;
    sessions(user: User): Promise<import("../sessions/entities/session.entity").Session[]>;
    inbodies(user: User): Promise<import("../inbodies/entities/inbody.entity").Inbody[]>;
    sessionHistories(user: User): Promise<import("../session-histories/entities/session-history.entity").SessionHistory[]>;
}
