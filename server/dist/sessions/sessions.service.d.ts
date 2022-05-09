import { SessionHistoriesService } from 'src/session-histories/session-histories.service';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { TrainersService } from 'src/trainers/trainers.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';
import { Session } from './entities/session.entity';
export declare class SessionsService {
    private sessionsRepository;
    private usersService;
    private trainersService;
    private sessionHistoriesService;
    constructor(sessionsRepository: Repository<Session>, usersService: UsersService, trainersService: TrainersService, sessionHistoriesService: SessionHistoriesService);
    create(createSessionInput: CreateSessionInput): Promise<Session>;
    findAll(): Promise<Session[]>;
    findOneById(id: number): Promise<Session>;
    findAllByTrainerId(trainerId: number): Promise<Session[]>;
    findAllByUserId(userId: number): Promise<Session[]>;
    getUser(userId: number): Promise<User>;
    getTrainer(trainerId: number): Promise<Trainer>;
    update(updateSessionInput: UpdateSessionInput): Promise<Session>;
    remove(id: number): Promise<Session>;
    canMutate(currentUser: User | Trainer, id: number): Promise<boolean>;
    find: any;
}
