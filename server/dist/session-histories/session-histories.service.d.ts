import { Trainer } from 'src/trainers/entities/trainer.entity';
import { TrainersService } from 'src/trainers/trainers.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateSessionHistoryInput } from './dto/create-session-history.input';
import { UpdateSessionHistoryInput } from './dto/update-session-history.input';
import { SessionHistory } from './entities/session-history.entity';
export declare class SessionHistoriesService {
    private sessionHistoriesRepository;
    private usersService;
    private trainersService;
    constructor(sessionHistoriesRepository: Repository<SessionHistory>, usersService: UsersService, trainersService: TrainersService);
    create(createSessionHistoryInput: CreateSessionHistoryInput): Promise<SessionHistory>;
    findAll(): Promise<SessionHistory[]>;
    findOneById(id: number): Promise<SessionHistory>;
    findAllByUserId(userId: number): Promise<SessionHistory[]>;
    findAllByTrainerId(trainerId: number): Promise<SessionHistory[]>;
    findOneToAddUsedCountByUserIdAndTrainerId(userId: number, trainerId: number): Promise<SessionHistory>;
    findOneToSubtractUsedCountByUserIdAndTrainerId(userId: number, trainerId: number): Promise<SessionHistory>;
    getUser(userId: number): Promise<User>;
    getTrainer(trainerId: number): Promise<Trainer>;
    update(updateSessionHistoryInput: UpdateSessionHistoryInput): Promise<SessionHistory>;
    remove(id: number): Promise<SessionHistory>;
    canMutate(currentUser: User | Trainer, id: number): Promise<boolean>;
}
