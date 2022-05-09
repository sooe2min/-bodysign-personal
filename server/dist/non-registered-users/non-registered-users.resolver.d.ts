import { NonRegisteredUsersService } from './non-registered-users.service';
import { NonRegisteredUser } from './entities/non-registered-user.entity';
import { CreateNonRegisteredUserInput } from './dto/create-non-registered-user.input';
import { UpdateNonRegisteredUserInput } from './dto/update-non-registered-user.input';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { UserCategory } from 'src/user-categories/entities/user-category.entity';
import { User } from 'src/users/entities/user.entity';
export declare class NonRegisteredUsersResolver {
    private readonly nonRegisteredUsersService;
    constructor(nonRegisteredUsersService: NonRegisteredUsersService);
    findAll(): Promise<NonRegisteredUser[]>;
    findOneById(id: number): Promise<NonRegisteredUser>;
    createNonRegisteredUser(createNonRegisteredUserInput: CreateNonRegisteredUserInput): Promise<NonRegisteredUser>;
    updateNonRegisteredUser(updateNonRegisteredUserInput: UpdateNonRegisteredUserInput, currentUser: User | Trainer): Promise<NonRegisteredUser>;
    removeNonRegisteredUser(id: number, currentUser: User | Trainer): Promise<NonRegisteredUser>;
    trainer(nonRegisteredUser: NonRegisteredUser): Promise<Trainer>;
    userCategory(nonRegisteredUser: NonRegisteredUser): Promise<UserCategory>;
}
