import { TrainersService } from './trainers.service';
import { Trainer } from './entities/trainer.entity';
import { CreateTrainerInput } from './dto/create-trainer.input';
import { UpdateTrainerInput } from './dto/update-trainer.input';
import { UpdatePasswordTrainerInput } from './dto/updatePassword-trainer.input';
import { User } from 'src/users/entities/user.entity';
import { CreateSocialTrainerInput } from './dto/create-socialTrainer.input';
export declare class TrainersResolver {
    private readonly trainersService;
    constructor(trainersService: TrainersService);
    findAll(): Promise<Trainer[]>;
    findOneById(id: number): Promise<Trainer>;
    findOneUserByPhoneNumber(phoneNumber: string): Promise<User>;
    createTrainer(createTrainerInput: CreateTrainerInput): Promise<Omit<Trainer, 'password' | 'dbPasswordSalt'>>;
    createSocialTrainer(createSocialTrainerInput: CreateSocialTrainerInput): Promise<Trainer>;
    updateTrainer(updateTrainerInput: UpdateTrainerInput, currentUser: User | Trainer): Promise<Trainer>;
    removeTrainer(id: number): Promise<Trainer>;
    updatePasswordTrainer(updatePasswordTrainerInput: UpdatePasswordTrainerInput, currentUser: User | Trainer): Promise<Omit<Trainer, 'password' | 'dbPasswordSalt'>>;
    users(trainer: Trainer): Promise<User[]>;
    sessions(trainer: Trainer): Promise<import("../sessions/entities/session.entity").Session[]>;
    exerciseCategories(trainer: Trainer): Promise<import("../exercise-categories/entities/exercise-category.entity").ExerciseCategory[]>;
    nonRegisteredUsers(trainer: Trainer): Promise<import("../non-registered-users/entities/non-registered-user.entity").NonRegisteredUser[]>;
    userCategories(trainer: Trainer): Promise<import("../user-categories/entities/user-category.entity").UserCategory[]>;
    sessionHistories(trainer: Trainer): Promise<import("../session-histories/entities/session-history.entity").SessionHistory[]>;
    trainerInterests(trainer: Trainer): Promise<import("../trainer-interest/entities/trainerInterest.entity").TrainerInterest[]>;
}
