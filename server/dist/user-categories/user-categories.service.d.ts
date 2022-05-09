import { NonRegisteredUser } from 'src/non-registered-users/entities/non-registered-user.entity';
import { NonRegisteredUsersService } from 'src/non-registered-users/non-registered-users.service';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { TrainersService } from 'src/trainers/trainers.service';
import GenderTypes from 'src/types/gender.types';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateUserCategoryInput } from './dto/create-user-category.input';
import { UpdateUserCategoryInput } from './dto/update-user-category.input';
import { UserCategory } from './entities/user-category.entity';
interface TLoungInfoResponse {
    userCategoryId: number;
    userCategoryName: string;
    userId: number;
    userName: string;
    gender: GenderTypes;
    usedCount: number;
    totalCount: number;
    hasUnreadMessages: boolean;
}
export declare class UserCategoriesService {
    private userCategoriesRepository;
    private trainersService;
    private usersService;
    private nonRegisteredUsersService;
    constructor(userCategoriesRepository: Repository<UserCategory>, trainersService: TrainersService, usersService: UsersService, nonRegisteredUsersService: NonRegisteredUsersService);
    create(createUserCategoryInput: CreateUserCategoryInput): Promise<UserCategory>;
    findAll(): Promise<UserCategory[]>;
    findOneById(id: number): Promise<UserCategory>;
    findAllByTrainerId(trainerId: number): Promise<UserCategory[]>;
    getTrainer(trainerId: number): Promise<Trainer>;
    getUsers(id: number): Promise<User[]>;
    getNonRegisteredUsers(id: number): Promise<NonRegisteredUser[]>;
    getLoungeInfo(trainerId: number): Promise<TLoungInfoResponse[]>;
    update(updateUserCategoryInput: UpdateUserCategoryInput): Promise<UserCategory>;
    remove(id: number): Promise<UserCategory>;
    canMutate(currentUser: User | Trainer, id: number): Promise<boolean>;
    createDefault(trainerId: number): Promise<boolean>;
}
export {};
