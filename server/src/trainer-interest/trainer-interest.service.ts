import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainerInterest } from './entities/trainerInterest.entity';

@Injectable()
export class TrainerInterestService {
  constructor(
    @InjectRepository(TrainerInterest)
    private trainerInterestsRepository: Repository<TrainerInterest>,
  ) {}
  bulkCreate(
    trainerId: number,
    interests: string[],
  ): Promise<TrainerInterest[]> {
    const newTrainerInterest = interests.map((interest) =>
      this.trainerInterestsRepository.create({ trainerId, interest }),
    );

    return this.trainerInterestsRepository.save(newTrainerInterest);
  }

  findAllByTrainerId(trainerId: number): Promise<TrainerInterest[]> {
    return this.trainerInterestsRepository.find({ where: { trainerId } });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.trainerInterestsRepository.delete(id);
    return result.affected == 1;
  }

  async bulkRemove(trainerId: number): Promise<boolean> {
    // TODO: ids로 찾은 것들이 숫자가 안맞으면 false반환하고 삭제 중단
    const interests = await this.trainerInterestsRepository.find({
      where: { trainerId },
    });
    if (interests.length === 0) {
      return true;
    }
    const result = await this.trainerInterestsRepository.delete(
      interests.map((interest) => interest.id),
    );
    return result.affected === interests.length;
  }
}
