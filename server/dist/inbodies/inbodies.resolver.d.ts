import { InbodiesService } from './inbodies.service';
import { Inbody } from './entities/inbody.entity';
import { CreateInbodyInput } from './dto/create-inbody.input';
import { UpdateInbodyInput } from './dto/update-inbody.input';
import { User } from 'src/users/entities/user.entity';
import { Trainer } from 'src/trainers/entities/trainer.entity';
export declare class InbodiesResolver {
    private readonly inbodiesService;
    constructor(inbodiesService: InbodiesService);
    findAll(): Promise<Inbody[]>;
    findOneById(id: number): Promise<Inbody>;
    createInbody(createInbodyInput: CreateInbodyInput): Promise<Inbody>;
    updateInbody(updateInbodyInput: UpdateInbodyInput, currentUser: User | Trainer): Promise<Inbody>;
    removeInbody(id: number, currentUser: User | Trainer): Promise<Inbody>;
    user(inbody: Inbody): Promise<User>;
}
