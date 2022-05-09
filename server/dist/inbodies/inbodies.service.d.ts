import { Trainer } from 'src/trainers/entities/trainer.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateInbodyInput } from './dto/create-inbody.input';
import { UpdateInbodyInput } from './dto/update-inbody.input';
import { Inbody } from './entities/inbody.entity';
export declare class InbodiesService {
    private inbodiesRepository;
    private usersService;
    constructor(inbodiesRepository: Repository<Inbody>, usersService: UsersService);
    create(createInbodyInput: CreateInbodyInput): Promise<Inbody>;
    findAll(): Promise<Inbody[]>;
    findOneById(id: number): Promise<Inbody>;
    findAllByUserId(userId: number): Promise<Inbody[]>;
    getUser(userId: number): Promise<User>;
    update(updateInbodyInput: UpdateInbodyInput): Promise<Inbody>;
    remove(id: number): Promise<Inbody>;
    canMutate(currentUser: User | Trainer, id: number): Promise<boolean>;
}
