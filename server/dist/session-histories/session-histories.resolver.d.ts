import { SessionHistoriesService } from './session-histories.service';
import { SessionHistory } from './entities/session-history.entity';
import { CreateSessionHistoryInput } from './dto/create-session-history.input';
import { UpdateSessionHistoryInput } from './dto/update-session-history.input';
import { User } from 'src/users/entities/user.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
export declare class SessionHistoriesResolver {
    private readonly sessionHistoriesService;
    constructor(sessionHistoriesService: SessionHistoriesService);
    findAll(): Promise<SessionHistory[]>;
    findOneById(id: number): Promise<SessionHistory>;
    createSessionHistory(createSessionHistoryInput: CreateSessionHistoryInput): Promise<SessionHistory>;
    updateSessionHistory(updateSessionHistoryInput: UpdateSessionHistoryInput, currentUser: User | Trainer): Promise<SessionHistory>;
    removeSessionHistory(id: number, currentUser: User | Trainer): Promise<SessionHistory>;
    user(sessionHistory: SessionHistory): Promise<User>;
    trainer(sessionHistory: SessionHistory): Promise<Trainer>;
}
