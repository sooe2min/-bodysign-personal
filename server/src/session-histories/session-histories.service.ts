import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from 'src/trainers/entities/trainer.entity';
import { TrainersService } from 'src/trainers/trainers.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateSessionHistoryInput } from './dto/create-session-history.input';
import { UpdateSessionHistoryInput } from './dto/update-session-history.input';
import { SessionHistory } from './entities/session-history.entity';

@Injectable()
export class SessionHistoriesService {
  constructor(
    @InjectRepository(SessionHistory)
    private sessionHistoriesRepository: Repository<SessionHistory>,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    @Inject(forwardRef(() => TrainersService))
    private trainersService: TrainersService,
  ) {}

  async create(
    createSessionHistoryInput: CreateSessionHistoryInput,
  ): Promise<SessionHistory> {
    const user = await this.usersService.findOneById(
      createSessionHistoryInput.userId,
    );
    const createParams = {
      ...createSessionHistoryInput,
      trainerId: user.trainerId,
    };
    const newSessionHistory =
      this.sessionHistoriesRepository.create(createParams);
    return this.sessionHistoriesRepository.save(newSessionHistory);
  }

  findAll(): Promise<SessionHistory[]> {
    return this.sessionHistoriesRepository.find();
  }

  findOneById(id: number): Promise<SessionHistory> {
    return this.sessionHistoriesRepository.findOneOrFail(id);
  }

  findAllByUserId(userId: number): Promise<SessionHistory[]> {
    return this.sessionHistoriesRepository.find({ userId });
  }

  findAllByTrainerId(trainerId: number): Promise<SessionHistory[]> {
    return this.sessionHistoriesRepository.find({ trainerId });
  }

  async findOneToAddUsedCountByUserIdAndTrainerId(
    userId: number,
    trainerId: number,
  ): Promise<SessionHistory> {
    return await this.sessionHistoriesRepository
      .createQueryBuilder('sessionHistory')
      .where(
        'sessionHistory.trainerId = :trainerId AND sessionHistory.userId = :userId',
        { userId, trainerId },
      )
      .where('sessionHistory.totalCount - sessionHistory.usedCount > 0')
      .orderBy('sessionHistory.createdAt', 'ASC')
      .take(1)
      .getOne();
  }

  //  usedCount != totalCount인 히스토리중 가장 먼저 생성된 것을 찾는다
  //  - 이 세션 히스토리의 usedCount > 0 일 경우 이 히스토리에서 usedCount를 -1 한다
  //  - 이 세션 히스토리의 usedCount = 0 일 경우, 가장 최신의 usedCount = totalCount 세션 히스토리를 찾아 여기에서 -1을 한다
  async findOneToSubtractUsedCountByUserIdAndTrainerId(
    userId: number,
    trainerId: number,
  ): Promise<SessionHistory> {
    const sessionHistory = await this.sessionHistoriesRepository
      .createQueryBuilder('sessionHistory')
      .where(
        'sessionHistory.trainerId = :trainerId AND sessionHistory.userId = :userId',
        { userId, trainerId },
      )
      .where('sessionHistory.usedCount != sessionHistory.totalCount')
      .orderBy('sessionHistory.createdAt', 'ASC')
      .take(1)
      .getOne();

    if (sessionHistory && sessionHistory.usedCount > 0) {
      return sessionHistory;
    }

    return await this.sessionHistoriesRepository
      .createQueryBuilder('sessionHistory')
      .where(
        'sessionHistory.trainerId = :trainerId AND sessionHistory.userId = :userId',
        { userId, trainerId },
      )
      .where('sessionHistory.usedCount = sessionHistory.totalCount')
      .orderBy('sessionHistory.createdAt', 'DESC')
      .take(1)
      .getOne();
  }

  getUser(userId: number): Promise<User> {
    return this.usersService.findOneById(userId);
  }

  getTrainer(trainerId: number): Promise<Trainer> {
    return this.trainersService.findOneById(trainerId);
  }

  async update(
    updateSessionHistoryInput: UpdateSessionHistoryInput,
  ): Promise<SessionHistory> {
    const sessionHistory = await this.sessionHistoriesRepository.findOneOrFail(
      updateSessionHistoryInput.id,
    );
    return this.sessionHistoriesRepository.save({
      ...sessionHistory,
      ...updateSessionHistoryInput,
    });
  }

  async remove(id: number): Promise<SessionHistory> {
    const sessionHistory = await this.sessionHistoriesRepository.findOneOrFail(
      id,
    );
    return this.sessionHistoriesRepository.remove(sessionHistory);
  }

  /**
   *
   * Helpers
   *
   */

  async canMutate(currentUser: User | Trainer, id: number): Promise<boolean> {
    if (currentUser instanceof User) return false;

    const sessionHistory = await this.sessionHistoriesRepository.findOneOrFail(
      id,
    );

    if (sessionHistory.trainerId !== currentUser.id) {
      return false;
    }

    return true;
  }
}
