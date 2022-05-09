import { Repository } from 'typeorm';
import { TrainerInterest } from './entities/trainerInterest.entity';
export declare class TrainerInterestService {
    private trainerInterestsRepository;
    constructor(trainerInterestsRepository: Repository<TrainerInterest>);
    bulkCreate(trainerId: number, interests: string[]): Promise<TrainerInterest[]>;
    findAllByTrainerId(trainerId: number): Promise<TrainerInterest[]>;
    remove(id: number): Promise<boolean>;
    bulkRemove(trainerId: number): Promise<boolean>;
}
