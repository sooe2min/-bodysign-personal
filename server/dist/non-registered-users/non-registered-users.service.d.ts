import { Trainer } from 'src/trainers/entities/trainer.entity';
import { TrainersService } from 'src/trainers/trainers.service';
import { UserCategory } from 'src/user-categories/entities/user-category.entity';
import { UserCategoriesService } from 'src/user-categories/user-categories.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateNonRegisteredUserInput } from './dto/create-non-registered-user.input';
import { UpdateNonRegisteredUserInput } from './dto/update-non-registered-user.input';
import { NonRegisteredUser } from './entities/non-registered-user.entity';
export declare class NonRegisteredUsersService {
    private nonRegisteredUsersRepository;
    private trainersService;
    private userCategoriesService;
    constructor(nonRegisteredUsersRepository: Repository<NonRegisteredUser>, trainersService: TrainersService, userCategoriesService: UserCategoriesService);
    create(createNonRegisteredUserInput: CreateNonRegisteredUserInput): Promise<NonRegisteredUser>;
    findAll(): Promise<NonRegisteredUser[]>;
    findOneById(id: number): Promise<NonRegisteredUser>;
    findAllByTrainerId(trainerId: number): Promise<NonRegisteredUser[]>;
    findAllByUserCategoryId(userCategoryId: number): Promise<NonRegisteredUser[]>;
    getTrainer(trainerId: number): Promise<Trainer>;
    getUserCategory(userCategoryId: number): Promise<UserCategory>;
    update(updateNonRegisteredUserInput: UpdateNonRegisteredUserInput): Promise<NonRegisteredUser>;
    remove(id: number): Promise<NonRegisteredUser>;
    canMutate(currentUser: User | Trainer, id: number): Promise<boolean>;
}
