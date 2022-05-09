import { UserCategoriesService } from './user-categories.service';
import { UserCategory } from './entities/user-category.entity';
import { CreateUserCategoryInput } from './dto/create-user-category.input';
import { UpdateUserCategoryInput } from './dto/update-user-category.input';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { NonRegisteredUser } from 'src/non-registered-users/entities/non-registered-user.entity';
export declare class UserCategoriesResolver {
    private readonly userCategoriesService;
    constructor(userCategoriesService: UserCategoriesService);
    findAll(): Promise<UserCategory[]>;
    findOneById(id: number): Promise<UserCategory>;
    createUserCategory(createUserCategoryInput: CreateUserCategoryInput): Promise<UserCategory>;
    updateUserCategory(updateUserCategoryInput: UpdateUserCategoryInput, currentUser: User | Trainer): Promise<UserCategory>;
    removeUserCategory(id: number, currentUser: User | Trainer): Promise<UserCategory>;
    trainer(userCategory: UserCategory): Promise<Trainer>;
    users(userCategory: UserCategory): Promise<User[]>;
    nonRegisteredUsers(userCategory: UserCategory): Promise<NonRegisteredUser[]>;
}
